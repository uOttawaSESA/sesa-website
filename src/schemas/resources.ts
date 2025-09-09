import * as z from "zod";
import { isTimestamp } from "./common";
import type { Timestamp } from "firebase/firestore";

export const FirestoreResource = z.object({
    id: z.string("Expected a Firestore ID"),
    title: z.string("Expected title"),
    category: z.string("Expected category"),
    course: z.string().optional(),
    tier: z.string("Expected tier"),
    format: z.string("Expected format"),
    language: z.string("Expected language"),
    source: z.string("Expected source"),
    list: z
        .array(
            z.object({
                name: z.string(),
                description: z.string(),
                url: z.url(),
            }),
        )
        .optional(),
    pricing: z.string("Expected pricing"),
    accessibilityFeature: z.string().optional(),
    lastUpdated: z
        .unknown()
        .refine(isTimestamp, { message: "Expected a Firestore Timestamp" })
        .transform(val => (val as Timestamp).toDate())
        .optional(),
});

export type Resource = z.infer<typeof FirestoreResource>;
