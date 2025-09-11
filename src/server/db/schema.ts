import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import { index, pgTable, smallint, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

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

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type LocalizedEvent = Event & { title: string; description: string; imageAlt: string };

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

export type EventI18n = InferSelectModel<typeof eventsI18n>;
export type NewEventI18n = InferInsertModel<typeof eventsI18n>;

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
        index("resources_locale_idx").on(t.locale),
        index("resources_locale_gin_idx").using("gin", t.locale),
        index("resources_category_idx").on(t.category),
        index("resources_course_idx").on(t.course),
        index("resources_pricing_idx").on(t.pricing),
        index("resources_format_idx").on(t.format),
        index("resources_tier_idx").on(t.tier),
        index("resources_created_at_idx").on(t.createdAt),
        index("resources_updated_at_idx").on(t.updatedAt),
        index("resources_title_trgm_idx").using("gin", sql`${t.title} gin_trgm_ops`),
    ],
);

export type Resource = InferSelectModel<typeof resources>;
export type NewResource = InferInsertModel<typeof resources>;
export type MappedResource = Omit<Resource, "tier"> & { tier: string };
