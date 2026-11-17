/**
 * Better Auth tables (`user`, `session`, `account`, `verification`).
 *
 * Based on the output of `@better-auth/cli generate` for a Drizzle/pg adapter with the Discord
 * provider, the same tables create-t3-turbo uses, with two local changes:
 * - timestamps are `timestamptz`, like the rest of the schema;
 * - `account` has a unique index on (`provider_id`, `account_id`), which is how a session maps to a
 *   member: the Discord account's `account_id` is the Discord user id, matched against
 *   `members.discord_id`. So there is no `discord_id` on `user`.
 *
 * If the CLI is rerun against this file, reapply both changes. Nothing in this file may reference
 * `members`: a login is not a member, it only resolves to one.
 */

import { relations, sql } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

const timestamptz = (name: string) => timestamp(name, { withTimezone: true, mode: "date" });

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamptz("created_at").defaultNow().notNull(),
    updatedAt: timestamptz("updated_at")
        .defaultNow()
        .$onUpdate(() => sql`now()`)
        .notNull(),
});

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamptz("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamptz("created_at").defaultNow().notNull(),
        updatedAt: timestamptz("updated_at")
            .defaultNow()
            .$onUpdate(() => sql`now()`)
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    t => [index("session_user_id_idx").on(t.userId)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        /** The provider's user id. For Discord, the Discord user id (snowflake). */
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamptz("access_token_expires_at"),
        refreshTokenExpiresAt: timestamptz("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamptz("created_at").defaultNow().notNull(),
        updatedAt: timestamptz("updated_at")
            .defaultNow()
            .$onUpdate(() => sql`now()`)
            .notNull(),
    },
    t => [
        index("account_user_id_idx").on(t.userId),
        uniqueIndex("account_provider_id_account_id_unique").on(t.providerId, t.accountId),
    ],
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamptz("expires_at").notNull(),
        createdAt: timestamptz("created_at").defaultNow().notNull(),
        updatedAt: timestamptz("updated_at")
            .defaultNow()
            .$onUpdate(() => sql`now()`)
            .notNull(),
    },
    t => [index("verification_identifier_idx").on(t.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, { fields: [account.userId], references: [user.id] }),
}));
