/**
 * Fixture data for tests and the local database. Never run against the shared database: the
 * `db:seed` script refuses non-local URLs.
 *
 * Ids are fixed so tests and `ADMIN_IMPERSONATE_MEMBER_ID` can refer to them. Seeding is
 * idempotent: rows that already exist are left alone.
 *
 * Must stay free of driver imports, so it works with both postgres-js and PGlite.
 */

import { events, eventsI18n, members, resources, roleKeyEnum, teamKeyEnum } from "./schema.js";
import type { Database, NewEvent, NewEventI18n, NewMember, NewResource } from "./types.js";

type TeamKey = (typeof teamKeyEnum.enumValues)[number];
type RoleKey = (typeof roleKeyEnum.enumValues)[number];

/** A fixed UUID (version 4 layout) ending in `n`, so seeded ids are easy to spot. */
const fixedId = (prefix: number, n: number) =>
    `00000000-0000-4000-8${prefix.toString(16).padStart(3, "0")}-${n.toString(16).padStart(12, "0")}`;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** `codirectorsLead`, `developmentMember`, ... */
type MemberKey = `${TeamKey}${Capitalize<RoleKey>}`;

const memberRows: Record<MemberKey, NewMember & { id: string; discordId: string }> =
    Object.fromEntries(
        teamKeyEnum.enumValues.flatMap((teamKey, t) =>
            roleKeyEnum.enumValues.map((roleKey, r) => {
                const n = t * roleKeyEnum.enumValues.length + r + 1;
                return [
                    `${teamKey}${capitalize(roleKey)}`,
                    {
                        id: fixedId(1, n),
                        name: `${capitalize(teamKey)} ${capitalize(roleKey)}`,
                        teamKey,
                        roleKey,
                        imageUrl: "",
                        discordId: `1000000000000000${n.toString().padStart(2, "0")}`,
                        email: `${teamKey}.${roleKey}@example.com`,
                    },
                ];
            }),
        ),
    ) as Record<MemberKey, NewMember & { id: string; discordId: string }>;

/** One active member per team and role, plus a retired member. Each has a fake Discord id. */
export const SEED_MEMBERS = {
    ...memberRows,
    /** Retired development member: resolves to signed out. */
    retired: {
        id: fixedId(1, 0xff),
        name: "Retired Member",
        teamKey: "development",
        roleKey: "member",
        imageUrl: "",
        discordId: "100000000000000255",
        email: "retired@example.com",
        retiredAt: new Date("2025-05-01T00:00:00Z"),
    },
} satisfies Record<string, NewMember & { id: string }>;

const DAY = 24 * 60 * 60 * 1000;

/**
 * One event per derived state (live, scheduled, unscheduled, past, deleted). Dates are relative
 * to when the seed runs, so "upcoming" stays upcoming.
 */
const eventRows = (now: Date) => {
    const at = (days: number, hours = 0) =>
        new Date(now.getTime() + days * DAY + hours * 3_600_000);
    const base = {
        type: "workshop",
        location: "STEM 117",
        imageUrl: "",
        detailsUrl: "https://example.com/event",
        registrationUrl: null,
    } satisfies Partial<NewEvent>;

    return {
        /** Announced, starts in a week. */
        live: {
            ...base,
            id: fixedId(2, 1),
            startTime: at(7),
            endTime: at(7, 2),
            announceAt: at(-3),
            announcedAt: at(-3),
        },
        /** Goes live tomorrow. */
        scheduled: {
            ...base,
            id: fixedId(2, 2),
            type: "social",
            startTime: at(14),
            endTime: at(14, 3),
            announceAt: at(1),
        },
        /** No go-live date. */
        unscheduled: {
            ...base,
            id: fixedId(2, 3),
            type: "networking",
            startTime: at(30),
            endTime: at(30, 2),
            announceAt: null,
        },
        /** Was live, now ended. */
        past: {
            ...base,
            id: fixedId(2, 4),
            type: "academic",
            startTime: at(-10),
            endTime: at(-10, 2),
            announceAt: at(-20),
            announcedAt: at(-20),
        },
        /** Soft-deleted. */
        deleted: {
            ...base,
            id: fixedId(2, 5),
            startTime: at(5),
            endTime: at(5, 1),
            announceAt: at(-1),
            deletedAt: at(-1),
        },
    } satisfies Record<string, NewEvent & { id: string }>;
};

export const SEED_EVENT_IDS = Object.fromEntries(
    Object.entries(eventRows(new Date(0))).map(([key, row]) => [key, row.id]),
) as Record<keyof ReturnType<typeof eventRows>, string>;

export const SEED_RESOURCES = {
    textbook: {
        id: fixedId(3, 1),
        title: "Introduction to Algorithms",
        source: "https://example.com/clrs",
        tier: 0,
        locale: ["en"],
        accessibility: ["screen reader compatible"],
        category: "academic",
        course: "CSI 2110",
        pricing: "paid",
        format: "textbook",
    },
    video: {
        id: fixedId(3, 2),
        title: "Calcul différentiel en vidéo",
        source: "https://example.com/calcul",
        tier: 1,
        locale: ["fr"],
        accessibility: ["closed captions [cc]"],
        category: "academic",
        course: "MAT 1720",
        pricing: "free",
        format: "video",
    },
    website: {
        id: fixedId(3, 3),
        title: "Resume Guide",
        source: "https://example.com/resume",
        tier: 2,
        locale: ["en", "fr"],
        accessibility: [],
        category: "career",
        course: null,
        pricing: "freemium",
        format: "website",
    },
    /** Soft-deleted. */
    deleted: {
        id: fixedId(3, 4),
        title: "Removed Resource",
        source: "https://example.com/removed",
        tier: 6,
        locale: ["en"],
        accessibility: [],
        category: "technical",
        course: null,
        pricing: "free",
        format: "blog",
        deletedAt: new Date("2025-01-01T00:00:00Z"),
    },
} satisfies Record<string, NewResource & { id: string }>;

/** Insert the fixture data. Rows whose id already exists are skipped. */
export const seed = async (db: Database, now = new Date()): Promise<void> => {
    const eventValues = Object.values(eventRows(now));
    const i18nValues: NewEventI18n[] = eventValues.flatMap((event, i) =>
        (["en", "fr"] as const).map(locale => ({
            id: fixedId(4, i * 2 + (locale === "en" ? 1 : 2)),
            eventId: event.id,
            locale,
            title: `${locale === "en" ? "Event" : "Événement"} ${i + 1}`,
            description:
                locale === "en" ? "An English description." : "Une description en français.",
            imageAlt: locale === "en" ? "Event image" : "Image de l'événement",
        })),
    );

    await db.transaction(async tx => {
        await tx.insert(members).values(Object.values(SEED_MEMBERS)).onConflictDoNothing();
        await tx.insert(events).values(eventValues).onConflictDoNothing();
        await tx.insert(eventsI18n).values(i18nValues).onConflictDoNothing();
        await tx.insert(resources).values(Object.values(SEED_RESOURCES)).onConflictDoNothing();
    });
};
