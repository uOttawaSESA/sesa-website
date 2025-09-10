import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import SuperJSON from "superjson";
import { db } from "@/lib/firebase";
import { FirestoreEvent } from "@/schemas/events";
import { FirestoreResource } from "@/schemas/resources";

/**
 * Function to create a query client with the same config from different parts of the app.
 */
export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 30 * 1000,
            },
            dehydrate: {
                serializeData: SuperJSON.serialize,
                shouldDehydrateQuery: query =>
                    defaultShouldDehydrateQuery(query) || query.state.status === "pending",
            },
            hydrate: {
                deserializeData: SuperJSON.deserialize,
            },
        },
    });

/**
 * Function used to fetch all of the remote events from Firestore.
 * You probably don't want to call this directly; use tRPC for requests from the frontend.
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
 * Function used to fetch all of the remote resources from Firestore.
 * You probably don't want to call this directly; use tRPC for requests from the frontend.
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
