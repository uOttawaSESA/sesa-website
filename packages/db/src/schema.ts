import { sql } from "drizzle-orm";
import {
    index,
    pgEnum,
    pgTable,
    smallint,
    text,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";

export const events = pgTable(
    "events",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        startTime: timestamp("start_time", { withTimezone: true, mode: "date" }).notNull(),
        endTime: timestamp("end_time", { withTimezone: true, mode: "date" }).notNull(),
        type: text("type").notNull(),
        location: text("location").notNull(),
        imageUrl: text("image_url").notNull(),
        detailsUrl: text("details_url").notNull(),
        registrationUrl: text("registration_url"),
    },
    t => [
        index("events_start_time_idx").on(t.startTime),
        index("events_end_time_idx").on(t.endTime),
        index("events_type_idx").on(t.type),
        index("events_created_at_idx").on(t.createdAt),
        index("events_updated_at_idx").on(t.updatedAt),
    ],
);

export const eventsI18n = pgTable(
    "events_i18n",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        eventId: uuid("event_id")
            .notNull()
            .references(() => events.id, { onDelete: "cascade" }),
        locale: text("locale").notNull(),
        title: text("title").notNull(),
        description: text("description").notNull(),
        imageAlt: text("image_alt").notNull(),
    },
    t => [
        unique("events_i18n_locale_event_id_unique").on(t.locale, t.eventId),
        index("events_i18n_event_id_idx").on(t.eventId),
        index("events_i18n_locale_idx").on(t.locale),
    ],
);

export const resources = pgTable(
    "resources",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        title: text("title").notNull(),
        source: text("source").notNull(),
        tier: smallint("tier").notNull(),
        locale: text("locale").array().notNull(),
        accessibility: text("accessibility").array().notNull(),
        category: text("category").notNull(),
        course: text("course"), // nullable
        pricing: text("pricing").notNull(),
        format: text("format").notNull(),
    },
    t => [
        // Basic filtering
        index("resources_category_idx").on(t.category),
        index("resources_format_idx").on(t.format),
        index("resources_course_idx").on(t.course),

        // Array containment searching
        index("resources_locale_gin_idx").using("gin", t.locale),
        index("resources_accessibility_gin_idx").using("gin", t.accessibility),

        // Sorting with ID as tiebreaker
        index("resources_tier_id_idx").on(t.tier, t.id),
        index("resources_created_at_id_idx").on(t.createdAt, t.id),
        index("resources_updated_at_id_idx").on(t.updatedAt, t.id),
        index("resources_title_id_idx").on(t.title, t.id),

        // Full-text search
        index("resources_title_trgm_idx").using("gin", sql`${t.title} gin_trgm_ops`),
        index("resources_course_trgm_idx").using("gin", sql`${t.course} gin_trgm_ops`),
    ],
);

// *** Members *** //

export const teamKeyEnum = pgEnum("team_key_enum", [
    "codirector",
    "academic",
    "communications",
    "development",
    "partnerships",
    "logistics",
    "advisor",
]);

export const roleKeyEnum = pgEnum("role_key_enum", ["lead", "member"]);

export const members = pgTable(
    "members",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        name: text("name").notNull(),

        teamKey: teamKeyEnum("team_key").notNull(),
        roleKey: roleKeyEnum("role_key").notNull(),

        // Supabase profile img path
        imageUrl: text("image_url").notNull(),

        email: text("email").unique(),
        linkedinUrl: text("linkedin_url"),
        githubUrl: text("github_url"),
        portfolioUrl: text("portfolio_url"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),

        // For retired members, we can show something like: "Member from 2025-08 to 2026-02"
        retiredAt: timestamp("retired_at", {
            withTimezone: true,
            mode: "date",
        }),
    },
    //if necessary
    t => [
        index("members_team_idx").on(t.teamKey),
        index("members_role_idx").on(t.roleKey),

        index("members_created_at_id_idx").on(t.createdAt, t.id),
        index("members_name_id_idx").on(t.name, t.id),
    ],
);
