import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type {
    changeRequests,
    events,
    eventsI18n,
    members,
    permissionEnum,
    resources,
    roleKeyEnum,
    teamKeyEnum,
} from "./schema.js";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type LocalizedEvent = Event & { title: string; description: string; imageAlt: string };

export type EventI18n = InferSelectModel<typeof eventsI18n>;
export type NewEventI18n = InferInsertModel<typeof eventsI18n>;

export type Resource = InferSelectModel<typeof resources>;
export type NewResource = InferInsertModel<typeof resources>;
export type MappedResource = Omit<Resource, "tier"> & { tier: string };

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

export type TeamKey = (typeof teamKeyEnum.enumValues)[number];
export type RoleKey = (typeof roleKeyEnum.enumValues)[number];
export type Permission = (typeof permissionEnum.enumValues)[number];

export type ChangeRequests = InferSelectModel<typeof changeRequests>;
export type NewChangeRequests = InferInsertModel<typeof changeRequests>;
