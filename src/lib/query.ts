import { QueryClient, useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirestoreEvent } from "@/schemas/events";
import { FirestoreResource } from "@/schemas/resources";

export const queryClient = new QueryClient();

/**
 * Query function used for {@link useEvents}.
 */
export const fetchEvents = async () => {
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

/**
 * Get events data from Firestore.
 * Remote data is validated with Zod before returning.
 */
export const useEvents = () =>
    useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

/**
 * Query function used for {@link useResources}.
 */
export const fetchResources = async () => {
    // Fetch from Firestore
    const docs = (await getDocs(collection(db, "Resources"))).docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
    // Include only valid resources
    const validated = docs
        .map(doc => FirestoreResource.safeParse(doc))
        .filter(doc => doc.success)
        .map(doc => doc.data);
    return validated;
};

/**
 * Get resources data from Firestore.
 * Remote data is validated with Zod before returning.
 */
export const useResources = () =>
    useQuery({
        queryKey: ["resources"],
        queryFn: fetchResources,
    });
