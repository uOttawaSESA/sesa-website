import { isNull } from "drizzle-orm";
import {
    boolean,
    index,
    jsonb,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

// Order determines which item is shown first on the About page
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
        hasAccess: boolean("has_access").notNull().default(false),

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

export const permissionEnum = pgEnum("permission_enum", [
    // Member Management
    "VIEW_MEMBER",
    "CREATE_MEMBER",
    "EDIT_MEMBER",
    "DELETE_MEMBER",
    "APPROVE_MEMBER_CHANGE",
    // Event Management
    "VIEW_EVENT",
    "CREATE_EVENT",
    "EDIT_EVENT",
    "DELETE_EVENT",
    "DRAFT_EVENT",
    "PUBLISH_EVENT",
    "CANCEL_EVENT_ANNOUNCEMENT",
    "EDIT_EVENT_LOCATION",
    // Resource Management
    "VIEW_RESOURCE",
    "CREATE_RESOURCE",
    "EDIT_RESOURCE",
    "DELETE_RESOURCE",
    "DRAFT_RESOURCE",
    // Admin Management
    "GRANT_PERMISSIONS",
    "VIEW_AUDIT_LOG",
]);

export const rolePermissions = pgTable(
    "role_permissions",
    {
        teamKey: teamKeyEnum("team_key").notNull(),
        roleKey: roleKeyEnum("role_key").notNull(),
        permission: permissionEnum("permission").notNull(),
    },
    table => [
        primaryKey({
            columns: [table.teamKey, table.roleKey, table.permission],
        }),
    ],
);

export const memberPermissions = pgTable(
    "member_permissions",
    {
        memberId: uuid("member_id")
            .notNull()
            .references(() => members.id, { onDelete: "cascade" }),
        permission: permissionEnum("permission").notNull(),
    },
    table => [
        primaryKey({
            columns: [table.memberId, table.permission],
        }),
    ],
);

export const entityTypeEnum = pgEnum("entity_type_enum", ["member", "event", "resource"]);
export const actionEnum = pgEnum("action_enum", ["CREATE", "UPDATE", "DELETE"]);
export const statusEnum = pgEnum("status_enum", ["PENDING", "APPROVED", "REJECTED"]);
export const changeRequests = pgTable("change_requests", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    entityType: entityTypeEnum("entity_type").notNull(),
    entityId: uuid("entity_id"),
    action: actionEnum("action").notNull(),
    status: statusEnum("status").notNull().default("PENDING"),
    proposedData: jsonb("proposed_data").notNull(),
    createdBy: uuid("created_by")
        .notNull()
        .references(() => members.id),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

// *** Auth Schemas *** //

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull(),
    image: text("image"),
    discordId: text("discord_id").unique(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
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
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" }).defaultNow().notNull(),
});
