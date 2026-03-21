import { isNull, sql } from "drizzle-orm";
import {
    boolean,
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

// Order defines which is showed first in the about page
export const teamKeyEnum = pgEnum("team_key_enum", [
    "codirectors",
    "partnerships",
    "logistics",
    "communications",
    "development",
    "academics",
    "advisors",
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
        discordId: text("discord_id").unique(),

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

        retiredAt: timestamp("retired_at", {
            withTimezone: true,
            mode: "date",
        }),
    },
    table => [
        index("active_members_sort_idx")
            .on(table.teamKey, table.roleKey, table.createdAt)
            .where(isNull(table.retiredAt)),
    ],
);

// *** Auth Schemas *** //

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
});
