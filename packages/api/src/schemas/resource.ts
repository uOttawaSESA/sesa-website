import { httpUrl, nonEmpty, text } from "@repo/api/schemas/common";
import {
    LOCALES,
    RESOURCE_ACCESSIBILITY,
    RESOURCE_CATEGORIES,
    RESOURCE_FORMATS,
    RESOURCE_PRICING,
    RESOURCE_TIERS,
} from "@repo/api/schemas/options";
import * as z from "zod";

const resourceFields = z.object({
    title: text(),
    /** External link, or a URL from the upload flow. */
    source: httpUrl(),
    /** Stored as its index; see `tierToNumber`. */
    tier: z.enum(RESOURCE_TIERS),
    locale: z.array(z.enum(LOCALES)).min(1),
    accessibility: z.array(z.enum(RESOURCE_ACCESSIBILITY)),
    category: z.enum(RESOURCE_CATEGORIES),
    /** Open-ended course code. */
    course: text().nullable(),
    pricing: z.enum(RESOURCE_PRICING),
    format: z.enum(RESOURCE_FORMATS),
});

export const resourceCreateInput = resourceFields;
export type ResourceCreateInput = z.infer<typeof resourceCreateInput>;

/** Only the changed fields. */
export const resourceUpdateInput = resourceFields.partial().refine(nonEmpty, "Nothing to update");
export type ResourceUpdateInput = z.infer<typeof resourceUpdateInput>;
