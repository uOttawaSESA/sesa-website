import { isNull, sql } from "drizzle-orm";
import {
    check,
    index,
    jsonb,
    pgEnum,
    pgTable,
    primaryKey,
    smallint,
    text,
    timestamp,
    unique,
    uuid,
} from "drizzle-orm/pg-core";

export * from "./auth-schema.js";

const timestamptz = (name: string) => timestamp(name, { withTimezone: true, mode: "date" });

/** `updated_at` for every table: set on insert and bumped by every Drizzle update. */
const updatedAt = () =>
    timestamptz("updated_at")
        .defaultNow()
        .$onUpdate(() => sql`now()`)
        .notNull();

export const events = pgTable(
    "events",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: updatedAt(),
        startTime: timestamp("start_time", { withTimezone: true, mode: "date" }).notNull(),
        endTime: timestamp("end_time", { withTimezone: true, mode: "date" }).notNull(),
        type: text("type").notNull(),
        location: text("location").notNull(),
        imageUrl: text("image_url").notNull(),
        detailsUrl: text("details_url").notNull(),
        registrationUrl: text("registration_url"),

        /**
         * Go-live date. Before it passes the event is hidden everywhere, the public site included.
         * `null` means not scheduled, so also hidden.
         */
        announceAt: timestamptz("announce_at"),
        /** When the scheduler claimed the event and made the Discord announcement. */
        announcedAt: timestamptz("announced_at"),
        /** Soft delete. */
        deletedAt: timestamptz("deleted_at"),

        // Discord objects owned by the event, set once announced. `null` where creating one failed.
        publicAnnouncementMessageId: text("public_announcement_message_id"),
        internalAttendanceMessageId: text("internal_attendance_message_id"),
        publicScheduledEventId: text("public_scheduled_event_id"),
        internalScheduledEventId: text("internal_scheduled_event_id"),
    },
    t => [
        index("events_start_time_idx").on(t.startTime),
        index("events_end_time_idx").on(t.endTime),
        index("events_type_idx").on(t.type),
        index("events_created_at_idx").on(t.createdAt),
        index("events_updated_at_idx").on(t.updatedAt),
        // Scheduler: events due for announcement
        index("events_announce_due_idx")
            .on(t.announceAt)
            .where(sql`${t.announcedAt} IS NULL AND ${t.deletedAt} IS NULL`),
    ],
);

export const eventsI18n = pgTable(
    "events_i18n",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
            .defaultNow()
            .notNull(),
        updatedAt: updatedAt(),
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
        updatedAt: updatedAt(),
        title: text("title").notNull(),
        source: text("source").notNull(),
        tier: smallint("tier").notNull(),
        locale: text("locale").array().notNull(),
        accessibility: text("accessibility").array().notNull(),
        category: text("category").notNull(),
        course: text("course"), // nullable
        pricing: text("pricing").notNull(),
        format: text("format").notNull(),

        /** Soft delete. */
        deletedAt: timestamptz("deleted_at"),
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

        /**
         * Discord user id (snowflake). Links the member to their Discord login (`account.account_id`
         * where `provider_id = 'discord'`) and to their roles in both servers. A member without one
         * appears on the website but cannot log in and is skipped by Discord sync.
         */
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

        updatedAt: updatedAt(),

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

// *** Admin *** //

/**
 * Actions granted to a member individually, on top of their team and role defaults (which live in
 * code). `action` is text, not an enum, so adding an action needs no migration.
 */
export const memberPermissions = pgTable(
    "member_permissions",
    {
        memberId: uuid("member_id")
            .notNull()
            .references(() => members.id, { onDelete: "cascade" }),
        action: text("action").notNull(),
        /** `null` when granted outside the panel (seed, manual backfill). */
        grantedById: uuid("granted_by_id").references(() => members.id),
        grantedAt: timestamptz("granted_at").defaultNow().notNull(),
    },
    t => [primaryKey({ columns: [t.memberId, t.action] })],
);

export const changeRequestEntityTypeEnum = pgEnum("change_request_entity_type_enum", [
    "member",
    "event",
    "resource",
]);

export const changeRequestOperationEnum = pgEnum("change_request_operation_enum", [
    "create",
    "update",
]);

export const changeRequestStatusEnum = pgEnum("change_request_status_enum", [
    "pending",
    "approved",
    "rejected",
    "withdrawn",
]);

/**
 * A proposed create or update, applied when approved. `payload` holds exactly the shared input
 * schema for the entity; for updates, only the changed fields.
 */
export const changeRequests = pgTable(
    "change_requests",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        entityType: changeRequestEntityTypeEnum("entity_type").notNull(),
        operation: changeRequestOperationEnum("operation").notNull(),
        /** The target of an update. For a create, `null` until approved, then the new row's id. */
        entityId: uuid("entity_id"),
        payload: jsonb("payload").notNull(),
        status: changeRequestStatusEnum("status").default("pending").notNull(),

        requesterId: uuid("requester_id")
            .notNull()
            .references(() => members.id),
        /** Who approved or rejected it. `null` while pending and when withdrawn. */
        reviewerId: uuid("reviewer_id").references(() => members.id),
        reviewNote: text("review_note"),
        /** When it left `pending`, by approval, rejection or withdrawal. */
        resolvedAt: timestamptz("resolved_at"),

        createdAt: timestamptz("created_at").defaultNow().notNull(),
        updatedAt: updatedAt(),
    },
    t => [
        index("change_requests_pending_idx")
            .on(t.entityType, t.createdAt)
            .where(sql`${t.status} = 'pending'`),
        index("change_requests_entity_idx").on(t.entityType, t.entityId),
        index("change_requests_requester_id_idx").on(t.requesterId),
        check(
            "change_requests_update_has_entity",
            sql`${t.operation} <> 'update' OR ${t.entityId} IS NOT NULL`,
        ),
        check(
            "change_requests_resolved",
            sql`(${t.status} = 'pending') = (${t.resolvedAt} IS NULL)`,
        ),
        check(
            "change_requests_reviewed",
            sql`${t.status} NOT IN ('approved', 'rejected') OR ${t.reviewerId} IS NOT NULL`,
        ),
    ],
);

/**
 * One row per successful admin mutation, including change request transitions and permission
 * grants. Written in the same transaction as the change. Append-only apart from the Discord
 * delivery columns, which are updated when the row is posted to Discord.
 */
export const auditLog = pgTable(
    "audit_log",
    {
        id: uuid("id").defaultRandom().primaryKey().notNull(),
        createdAt: timestamptz("created_at").defaultNow().notNull(),

        /** `null` for system actions, e.g. the announcement scheduler. */
        actorId: uuid("actor_id").references(() => members.id),
        /** An action string such as `event.update` or `changeRequest.approve`. */
        action: text("action").notNull(),
        /** `member`, `event`, `resource`, `changeRequest`, `memberPermission`, ... */
        entityType: text("entity_type").notNull(),
        entityId: uuid("entity_id"),
        before: jsonb("before"),
        after: jsonb("after"),
        /** Set when the change came from (or acted on) a change request. */
        changeRequestId: uuid("change_request_id").references(() => changeRequests.id),

        // Delivery to the co-directors Discord channel
        discordDeliveredAt: timestamptz("discord_delivered_at"),
        discordAttempts: smallint("discord_attempts").default(0).notNull(),
        discordLastError: text("discord_last_error"),
    },
    t => [
        index("audit_log_created_at_id_idx").on(t.createdAt, t.id),
        index("audit_log_entity_idx").on(t.entityType, t.entityId),
        index("audit_log_actor_id_idx").on(t.actorId),
        index("audit_log_undelivered_idx").on(t.createdAt).where(isNull(t.discordDeliveredAt)),
    ],
);
