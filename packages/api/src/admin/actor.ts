/**
 * The member making an admin request. Every authenticated admin procedure has one in
 * `ctx.actor`.
 */

import type { Action } from "@repo/api/admin/permissions";
import type { auth } from "@repo/auth";
import type { Database } from "@repo/db";
import { members, type roleKeyEnum, type teamKeyEnum } from "@repo/db/schema";
import { envAdminServer } from "@repo/env/admin/server";
import { eq } from "drizzle-orm";

export type TeamKey = (typeof teamKeyEnum.enumValues)[number];
export type RoleKey = (typeof roleKeyEnum.enumValues)[number];

export type Actor = {
    memberId: string;
    name: string;
    teamKey: TeamKey;
    roleKey: RoleKey;
    /** Actions granted to this member individually, on top of their team and role defaults. */
    grants: readonly Action[];
};

/**
 * Load the actor for a member, or `null` if the member does not exist or is retired. Runs on every
 * request, so a retired member loses access immediately.
 */
export const loadActor = async (db: Database, memberId: string): Promise<Actor | null> => {
    const member = await db.query.members.findFirst({
        columns: { id: true, name: true, teamKey: true, roleKey: true, retiredAt: true },
        where: eq(members.id, memberId),
    });
    if (!member || member.retiredAt != null) return null;

    return {
        memberId: member.id,
        name: member.name,
        teamKey: member.teamKey,
        roleKey: member.roleKey,
        // Individual grants are not loaded; every actor has none.
        grants: [],
    };
};

/**
 * Resolve who is making a request, or `null` if nobody is signed in.
 *
 * In development, `ADMIN_IMPERSONATE_MEMBER_ID` can select a member. Otherwise, the
 * session's Better Auth user is matched to the Discord account and then to a member.
 */
export const resolveActor = async (
    db: Database,
    session: Awaited<ReturnType<typeof auth.api.getSession>>,
    _headers: Headers,
): Promise<Actor | null> => {
    const impersonate = envAdminServer.ADMIN_IMPERSONATE_MEMBER_ID;
    if (impersonate != null && process.env.NODE_ENV !== "production") {
        const actor = await loadActor(db, impersonate);
        if (!actor) {
            console.warn(
                `[admin] ADMIN_IMPERSONATE_MEMBER_ID=${impersonate} is not an active member; treating request as signed out`,
            );
        }
        return actor;
    }

    if (!session) return null;

    const discordAccount = await db.query.account.findFirst({
        columns: { accountId: true },
        where: (accounts, { and, eq }) =>
            and(eq(accounts.userId, session.user.id), eq(accounts.providerId, "discord")),
    });

    if (!discordAccount) return null;

    const member = await db.query.members.findFirst({
        columns: { id: true },
        where: eq(members.discordId, discordAccount.accountId),
    });

    return member ? loadActor(db, member.id) : null;
};
