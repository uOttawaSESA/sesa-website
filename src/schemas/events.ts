import { collection, getDocs } from "firebase/firestore";
import * as z from "zod";
import { db } from "@/lib/firebase";
import { isTimestamp, Localized } from "./common";
import type { Timestamp } from "firebase/firestore";

export const FirestoreEvent = z.object({
    id: z.string("Expected a Firestore ID"),
    title: Localized,
    description: Localized,
    type: z.string("Expected an event type"),
    image: z.string("Expected image URL or base64-encoded data"),
    imageAlt: Localized,
    startTime: z
        .unknown()
        .refine(isTimestamp, { message: "Expected a Firestore Timestamp" })
        .transform(val => (val as Timestamp).toDate()),
    endTime: z
        .unknown()
        .refine(isTimestamp, { message: "Expected a Firestore Timestamp" })
        .transform(val => (val as Timestamp).toDate()),
    instagramLink: z.string().optional(),
    registrationLink: z.string().optional(),
    location: z.string().optional(),
});

/** Query function to retrieve event data. */
export const queryFn = async () => {
    // Fetch from Firestore
    const docs = (await getDocs(collection(db, "Events"))).docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
    // Include only valid events
    const validated = docs
        .map(doc => FirestoreEvent.safeParse(doc))
        .filter(doc => doc.success)
        .map(doc => doc.data);
    return validated;
};

export type Event = z.infer<typeof FirestoreEvent>;
