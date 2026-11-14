/**
 * The member making an admin request. Every authenticated admin procedure has one in
 * `ctx.actor`.
 */

import type { Action } from "@repo/api/admin/permissions";
import type { roleKeyEnum, teamKeyEnum } from "@repo/db/schema";

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
