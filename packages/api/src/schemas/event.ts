import { dateTime, httpUrl, nonEmpty, text } from "@repo/api/schemas/common";
import { EVENT_TYPES } from "@repo/api/schemas/options";
import * as z from "zod";

const eventLocaleFields = z.object({
    title: text(),
    description: text(),
    imageAlt: text(),
});

const eventFields = z.object({
    startTime: dateTime(),
    endTime: dateTime(),
    type: z.enum(EVENT_TYPES),
    location: text(),
    /** A URL from the upload flow. */
    imageUrl: httpUrl(),
    detailsUrl: httpUrl(),
    registrationUrl: httpUrl().nullable(),
});

const endsAfterStart = (e: { startTime?: Date; endTime?: Date }) =>
    e.startTime == null || e.endTime == null || e.endTime > e.startTime;

/**
 * Both locales are required: the public query drops events missing the requested locale.
 * The go-live date is not part of this payload; it is set separately, under the `event.announce`
 * action.
 */
export const eventCreateInput = eventFields
    .extend({ i18n: z.object({ en: eventLocaleFields, fr: eventLocaleFields }) })
    .refine(endsAfterStart, { message: "End time must be after start time", path: ["endTime"] });
export type EventCreateInput = z.infer<typeof eventCreateInput>;

/**
 * Only the changed fields. If only one of the times is given, the check against the other one
 * happens when the update is applied.
 */
export const eventUpdateInput = eventFields
    .partial()
    .extend({
        i18n: z
            .object({
                en: eventLocaleFields.partial().refine(nonEmpty),
                fr: eventLocaleFields.partial().refine(nonEmpty),
            })
            .partial()
            .refine(nonEmpty)
            .optional(),
    })
    .refine(nonEmpty, "Nothing to update")
    .refine(endsAfterStart, { message: "End time must be after start time", path: ["endTime"] });
export type EventUpdateInput = z.infer<typeof eventUpdateInput>;

/** The only field `event.updateLocation` may change. */
export const eventLocationInput = z.object({ location: text() });
export type EventLocationInput = z.infer<typeof eventLocationInput>;
