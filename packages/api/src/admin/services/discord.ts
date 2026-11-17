/**
 * Discord side effects of admin mutations. The admin context uses `fakeDiscordGateway`.
 *
 * Feature routers should only depend on this interface, never on a concrete client.
 */

import type { RoleKey, TeamKey } from "@repo/api/admin/actor";
import type { EventType, Locale } from "@repo/api/schemas/options";

/** The two SESA servers. Roles are synced in both; events produce objects in both. */
export type DiscordServer = "internal" | "public";

export type ServerOutcome =
    | { status: "ok" }
    /** Nothing to do in this server, e.g. the member has not joined it. Not a failure. */
    | { status: "skipped"; reason: string }
    | { status: "failed"; error: string };

/** Methods report per server and do not throw on partial failure. */
export type PerServerResult = Record<DiscordServer, ServerOutcome>;

export type DiscordMember = { discordId: string; teamKey: TeamKey; roleKey: RoleKey };

/** Everything needed to announce or edit an event. Both locales go into one announcement. */
export type DiscordEvent = {
    id: string;
    type: EventType;
    startTime: Date;
    endTime: Date;
    location: string;
    imageUrl: string;
    detailsUrl: string;
    registrationUrl: string | null;
    i18n: Record<Locale, { title: string; description: string; imageAlt: string }>;
};

/** The four Discord objects an announced event owns. `null` where creating it failed. */
export type EventDiscordIds = {
    publicAnnouncementMessageId: string | null;
    internalAttendanceMessageId: string | null;
    publicScheduledEventId: string | null;
    internalScheduledEventId: string | null;
};

/** A readable summary of one audit row, for the co-directors channel. */
export type DiscordAuditEntry = {
    at: Date;
    actorName: string;
    /** Set when the change was approved from someone else's change request. */
    requesterName: string | null;
    action: string;
    entityType: string;
    entityId: string | null;
    entityLabel: string | null;
    changedFields: string[];
};

export interface DiscordGateway {
    /** Set team and lead roles and the nickname suffix. Also used to re-sync a late joiner. */
    syncMember(member: DiscordMember): Promise<PerServerResult>;
    /** Strip team and lead roles and the nickname suffix from a retired member. */
    removeMember(discordId: string): Promise<PerServerResult>;
    announceEvent(event: DiscordEvent): Promise<{ ids: EventDiscordIds; result: PerServerResult }>;
    /** Edit existing objects in place, without a new ping. */
    updateEvent(ids: EventDiscordIds, event: DiscordEvent): Promise<PerServerResult>;
    deleteEvent(ids: EventDiscordIds): Promise<PerServerResult>;
    /** Throws on failure, so the caller can record the row as undelivered and retry. */
    postAudit(entry: DiscordAuditEntry): Promise<void>;
}

const ok: PerServerResult = { internal: { status: "ok" }, public: { status: "ok" } };

const log = (method: string, payload: unknown) =>
    console.info(`[fake discord] ${method}`, JSON.stringify(payload));

/** Logs every call and reports success. */
export const fakeDiscordGateway: DiscordGateway = {
    async syncMember(member) {
        log("syncMember", member);
        return ok;
    },
    async removeMember(discordId) {
        log("removeMember", { discordId });
        return ok;
    },
    async announceEvent(event) {
        log("announceEvent", { id: event.id });
        return {
            ids: {
                publicAnnouncementMessageId: `fake-public-message-${event.id}`,
                internalAttendanceMessageId: `fake-internal-message-${event.id}`,
                publicScheduledEventId: `fake-public-scheduled-${event.id}`,
                internalScheduledEventId: `fake-internal-scheduled-${event.id}`,
            },
            result: ok,
        };
    },
    async updateEvent(ids, event) {
        log("updateEvent", { id: event.id, ids });
        return ok;
    },
    async deleteEvent(ids) {
        log("deleteEvent", ids);
        return ok;
    },
    async postAudit(entry) {
        log("postAudit", entry);
    },
};
