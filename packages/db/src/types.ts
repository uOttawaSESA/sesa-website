import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { events, eventsI18n, resources } from "./schema.js";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type LocalizedEvent = Event & { title: string; description: string; imageAlt: string };

export type EventI18n = InferSelectModel<typeof eventsI18n>;
export type NewEventI18n = InferInsertModel<typeof eventsI18n>;

export type Resource = InferSelectModel<typeof resources>;
export type NewResource = InferInsertModel<typeof resources>;
export type MappedResource = Omit<Resource, "tier"> & { tier: string };
