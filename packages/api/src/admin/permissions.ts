/**
 * Permission checks for the admin API. Callers should depend only on the signatures here, not on
 * the rules inside `can()`.
 */

import type { Actor, TeamKey } from "@repo/api/admin/actor";

/** Every action the admin API checks. Grants in the database store these strings. */
export const ACTIONS = [
    "member.view",
    "member.create",
    "member.update",
    "member.retire",
    "member.updateSelf",
    "member.approve",

    "event.view",
    "event.create",
    "event.update",
    "event.updateLocation",
    "event.delete",
    "event.propose",
    "event.approve",
    /** Set the go-live date, announce now, and cancel an announcement. */
    "event.announce",

    "resource.view",
    "resource.create",
    "resource.update",
    "resource.delete",
    "resource.propose",
    "resource.approve",

    "permission.grant",
    "audit.view",
] as const;

export type Action = (typeof ACTIONS)[number];

/**
 * The record an action targets, for actions whose answer depends on it. For example,
 * `member.approve` depends on the target member's team, and `member.updateSelf` on whether the
 * target is the actor.
 */
export type PermissionSubject = { kind: "member"; id: string; teamKey: TeamKey };

/**
 * Whether `actor` may perform `action`.
 *
 * Without a subject the question is "may the actor perform this action on at least one record",
 * which is what `authorizedProcedure` and the UI use. Procedures whose answer depends on the
 * target must check again with the subject once it is loaded (see `assertCan`).
 *
 * Co-directors may do everything; anyone else only what they were explicitly granted. `subject` is
 * currently ignored.
 */
export const can = (actor: Actor, action: Action, _subject?: PermissionSubject): boolean => {
    if (actor.teamKey === "codirectors") return true;
    return actor.grants.includes(action);
};
