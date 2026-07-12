import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import type { Database } from "@repo/db";
import * as schema from "@repo/db/schema";
import { drizzle } from "drizzle-orm/pglite";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createCaller } from "@/server/api/root";

const client = new PGlite();
// Same schema + casing options as the real client in packages/db/src/index.ts.
const testDb = drizzle(client, { schema, casing: "snake_case" });
// The context type expects the postgres-js Database; the PGlite query builder
// is API-compatible for everything these routers use.
const caller = createCaller({ db: testDb as unknown as Database, headers: new Headers() });

beforeAll(async () => {
    // gen_random_uuid() is a Postgres 13+ core function; no extension is needed.
    await client.exec(`
        CREATE TABLE resources (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
            created_at timestamptz DEFAULT now() NOT NULL,
            updated_at timestamptz DEFAULT now() NOT NULL,
            title text NOT NULL,
            source text NOT NULL,
            tier smallint NOT NULL,
            locale text[] NOT NULL,
            accessibility text[] NOT NULL,
            category text NOT NULL,
            course text,
            pricing text NOT NULL,
            format text NOT NULL
        );
    `);
});

beforeEach(async () => {
    await client.exec("DELETE FROM resources;");
});

type SeedInput = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    title?: string;
    source?: string;
    tier?: number;
    locale?: string[];
    accessibility?: string[];
    category?: string;
    course?: string | null;
    pricing?: string;
    format?: string;
};

function seedRow(overrides: SeedInput = {}) {
    const now = new Date();
    return {
        id: overrides.id ?? randomUUID(),
        createdAt: overrides.createdAt ?? now,
        updatedAt: overrides.updatedAt ?? now,
        title: overrides.title ?? "Untitled",
        source: overrides.source ?? "https://example.com",
        tier: overrides.tier ?? 3,
        locale: overrides.locale ?? ["en"],
        accessibility: overrides.accessibility ?? ["free"],
        category: overrides.category ?? "notes",
        course: overrides.course ?? null,
        pricing: overrides.pricing ?? "free",
        format: overrides.format ?? "pdf",
    };
}

async function seed(rows: SeedInput[]) {
    await testDb.insert(schema.resources).values(rows.map(seedRow));
}

const emptyFilters = {
    course: null,
    category: null,
    format: null,
    locale: null,
    tier: null,
    accessibility: null,
} as const;

describe("resourceRouter.getCursorPage", () => {
    it("traverses all rows exactly once with tied sort values (created_desc)", async () => {
        // 10 distinct timestamps, 3 rows per timestamp = 30 rows with lots of ties.
        const rows: SeedInput[] = [];
        for (let t = 0; t < 10; t++) {
            const createdAt = new Date(2024, 0, 1 + t);
            for (let r = 0; r < 3; r++) {
                rows.push({ createdAt, updatedAt: createdAt });
            }
        }
        await seed(rows);

        const seenIds = new Set<string>();
        const pageSizes: number[] = [];
        let cursor: { id: string; value: unknown } | null | undefined = null;
        let iterations = 0;

        do {
            const page = await caller.resource.getCursorPage({
                cursor,
                search: null,
                filters: emptyFilters,
                sort: "created_desc",
            });

            pageSizes.push(page.data.length);
            for (const row of page.data) {
                expect(seenIds.has(row.id)).toBe(false);
                seenIds.add(row.id);
            }

            cursor = page.nextCursor;
            iterations++;
            // Guard against infinite loop in case of a real bug.
            expect(iterations).toBeLessThan(10);
        } while (cursor != null);

        expect(pageSizes).toEqual([12, 12, 6]);
        expect(seenIds.size).toBe(30);
    });

    it("maps tier sort with the intentionally flipped ordering", async () => {
        await seed([
            { title: "S tier resource", tier: 0 },
            { title: "F tier resource", tier: 6 },
        ]);

        const ascPage = await caller.resource.getCursorPage({
            cursor: null,
            search: null,
            filters: emptyFilters,
            sort: "tier_asc",
        });
        // tier_asc is documented as flipped: F (numeric 6) comes first.
        expect(ascPage.data[0]?.title).toBe("F tier resource");
        expect(ascPage.data[0]?.tier).toBe("F");
        expect(ascPage.data[1]?.tier).toBe("S");

        const descPage = await caller.resource.getCursorPage({
            cursor: null,
            search: null,
            filters: emptyFilters,
            sort: "tier_desc",
        });
        // tier_desc is documented as flipped: S (numeric 0) comes first.
        expect(descPage.data[0]?.title).toBe("S tier resource");
        expect(descPage.data[0]?.tier).toBe("S");
        expect(descPage.data[1]?.tier).toBe("F");
    });

    it("filters by locale using array containment", async () => {
        await seed([
            { title: "En and Fr", locale: ["en", "fr"] },
            { title: "Fr only", locale: ["fr"] },
        ]);

        const page = await caller.resource.getCursorPage({
            cursor: null,
            search: null,
            filters: { ...emptyFilters, locale: "en" },
            sort: "alphabetical_asc",
        });

        const titles = page.data.map(r => r.title);
        expect(titles).toContain("En and Fr");
        expect(titles).not.toContain("Fr only");
    });

    it("filters by accessibility requiring all requested values to be present", async () => {
        await seed([
            { title: "Free and online", accessibility: ["free", "online"] },
            { title: "Free only", accessibility: ["free"] },
        ]);

        const singleFilter = await caller.resource.getCursorPage({
            cursor: null,
            search: null,
            filters: { ...emptyFilters, accessibility: ["free"] },
            sort: "alphabetical_asc",
        });
        const singleTitles = singleFilter.data.map(r => r.title);
        expect(singleTitles).toContain("Free and online");
        expect(singleTitles).toContain("Free only");

        const bothFilter = await caller.resource.getCursorPage({
            cursor: null,
            search: null,
            filters: { ...emptyFilters, accessibility: ["free", "online"] },
            sort: "alphabetical_asc",
        });
        const bothTitles = bothFilter.data.map(r => r.title);
        expect(bothTitles).toContain("Free and online");
        expect(bothTitles).not.toContain("Free only");
    });

    it("matches search against title or course, case-insensitively", async () => {
        await seed([
            { title: "SEG2105 notes", course: null },
            { title: "Unrelated notes", course: "seg2105" },
            { title: "Nothing relevant", course: "csi2110" },
        ]);

        const page = await caller.resource.getCursorPage({
            cursor: null,
            search: "seg",
            filters: emptyFilters,
            sort: "alphabetical_asc",
        });

        const titles = page.data.map(r => r.title);
        expect(titles).toContain("SEG2105 notes");
        expect(titles).toContain("Unrelated notes");
        expect(titles).not.toContain("Nothing relevant");
    });
});

describe("resourceRouter.getOffsetPage", () => {
    it("returns disjoint pages", async () => {
        const rows: SeedInput[] = [];
        for (let i = 0; i < 25; i++) {
            rows.push({ title: `Resource ${String(i).padStart(2, "0")}` });
        }
        await seed(rows);

        const page1 = await caller.resource.getOffsetPage({
            page: 1,
            pageSize: 10,
            search: null,
            filters: emptyFilters,
            sort: "alphabetical_asc",
        });
        const page2 = await caller.resource.getOffsetPage({
            page: 2,
            pageSize: 10,
            search: null,
            filters: emptyFilters,
            sort: "alphabetical_asc",
        });
        const page3 = await caller.resource.getOffsetPage({
            page: 3,
            pageSize: 10,
            search: null,
            filters: emptyFilters,
            sort: "alphabetical_asc",
        });

        expect(page1).toHaveLength(10);
        expect(page2).toHaveLength(10);
        expect(page3).toHaveLength(5);

        const ids1 = new Set(page1.map(r => r.id));
        const ids2 = new Set(page2.map(r => r.id));
        const ids3 = new Set(page3.map(r => r.id));

        for (const id of ids2) expect(ids1.has(id)).toBe(false);
        for (const id of ids3) {
            expect(ids1.has(id)).toBe(false);
            expect(ids2.has(id)).toBe(false);
        }
    });
});

describe("resourceRouter.get", () => {
    it("returns the row with a mapped letter tier", async () => {
        const id = randomUUID();
        await seed([{ id, title: "Target resource", tier: 0 }]);

        const result = await caller.resource.get({ id });
        expect(result?.title).toBe("Target resource");
        expect(result?.tier).toBe("S");
    });

    it("returns undefined for an id that does not exist", async () => {
        await seed([{ title: "Some other resource" }]);
        const result = await caller.resource.get({ id: randomUUID() });
        expect(result).toBeUndefined();
    });
});
