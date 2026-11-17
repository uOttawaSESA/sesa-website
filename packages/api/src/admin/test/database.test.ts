/** Checks that the test database behaves like the real one where admin code depends on it. */

import { createTestDb, SEED_MEMBERS } from "@repo/api/admin/test/helpers";
import { members, resources } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";

const t = await createTestDb();
afterAll(() => t.close());

describe("test database", () => {
    it("seeds one active member per team and role", async () => {
        const rows = await t.db
            .select({ teamKey: members.teamKey, roleKey: members.roleKey })
            .from(members)
            .where(sql`${members.retiredAt} IS NULL`);
        expect(rows).toHaveLength(14);
    });

    it("supports pg_trgm, used by the resource search indexes", async () => {
        const [best] = await t.db
            .select({ title: resources.title })
            .from(resources)
            .orderBy(sql`similarity(${resources.title}, ${"algorithms"}) DESC`)
            .limit(1);
        expect(best?.title).toBe("Introduction to Algorithms");
    });

    it("bumps updatedAt on update", async () => {
        const [inserted] = await t.db
            .insert(members)
            .values({ name: "Temp", teamKey: "logistics", roleKey: "member", imageUrl: "" })
            .returning();
        if (!inserted) throw new Error("insert returned nothing");

        // now() is the transaction start time, so a later statement gets a later value.
        await new Promise(resolve => setTimeout(resolve, 5));
        const [updated] = await t.db
            .update(members)
            .set({ name: "Temp 2" })
            .where(eq(members.id, inserted.id))
            .returning();

        expect(updated?.updatedAt.getTime()).toBeGreaterThan(inserted.updatedAt.getTime());
    });

    it("gives seeded members fake Discord ids", () => {
        expect(SEED_MEMBERS.codirectorsLead.discordId).toMatch(/^\d{17,20}$/);
    });
});
