import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
    auditLog,
    changeRequestEntityTypeEnum,
    changeRequestOperationEnum,
    changeRequestStatusEnum,
    changeRequests,
    events,
    eventsI18n,
    memberPermissions,
    members,
    resources,
} from "./schema.js";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
/** Event columns only the admin side uses; the public site never selects them. */
type AdminEventColumns =
    | "announceAt"
    | "announcedAt"
    | "deletedAt"
    | "publicAnnouncementMessageId"
    | "internalAttendanceMessageId"
    | "publicScheduledEventId"
    | "internalScheduledEventId";
export type LocalizedEvent = Omit<Event, AdminEventColumns> & {
    title: string;
    description: string;
    imageAlt: string;
};

export type EventI18n = InferSelectModel<typeof eventsI18n>;
export type NewEventI18n = InferInsertModel<typeof eventsI18n>;

export type Resource = InferSelectModel<typeof resources>;
export type NewResource = InferInsertModel<typeof resources>;
export type MappedResource = Omit<Resource, "tier"> & { tier: string };

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

export type MemberPermission = InferSelectModel<typeof memberPermissions>;
export type NewMemberPermission = InferInsertModel<typeof memberPermissions>;

export type ChangeRequest = InferSelectModel<typeof changeRequests>;
export type NewChangeRequest = InferInsertModel<typeof changeRequests>;
export type ChangeRequestEntityType = (typeof changeRequestEntityTypeEnum.enumValues)[number];
export type ChangeRequestOperation = (typeof changeRequestOperationEnum.enumValues)[number];
export type ChangeRequestStatus = (typeof changeRequestStatusEnum.enumValues)[number];

export type AuditLogEntry = InferSelectModel<typeof auditLog>;
export type NewAuditLogEntry = InferInsertModel<typeof auditLog>;
