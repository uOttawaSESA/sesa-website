import { QueryClient, useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Event, FirestoreEvent } from "@/schemas/events";
import { FirestoreResource, type Resource } from "@/schemas/resources";

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
 * Query function used for {@link useEvent}.
 */
export const fetchEvent = async (id: string) => {
    const event = await getDoc(doc(db, "Events", id));
    if (!event.exists()) throw new TypeError(`Requested event ${id} does not exist.`);
    return FirestoreEvent.parse(event);
};

/**
 * Get a single event from Firestore.
 * Remote data is validated with Zod before returning.
 * Any validation errors are uncaught and will be propogated.
 */
export const useEvent = (id: string | null) =>
    useQuery({
        enabled: !!id,
        queryKey: ["events", { id }],
        // biome-ignore lint/style/noNonNullAssertion: The `enabled` key ensures that this will be non-null
        queryFn: () => fetchEvent(id!),
        // Check if we have already fetched this event before making a new request
        initialData: () =>
            queryClient.getQueryData<Event[]>(["events"])?.find(event => event.id === id),
        initialDataUpdatedAt: () => queryClient.getQueryState(["events"])?.dataUpdatedAt,
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

/**
 * Query function used for {@link useResource}.
 */
export const fetchResource = async (id: string) => {
    const resource = await getDoc(doc(db, "Resources", id));
    if (!resource.exists()) throw new TypeError(`Requested resource ${id} does not exist.`);
    return FirestoreResource.parse(resource);
};

/**
 * Get a single resource from Firestore.
 * Remote data is validated with Zod before returning.
 * Any validation errors are uncaught and will be propogated.
 */
export const useResource = (id: string | null) =>
    useQuery({
        enabled: !!id,
        queryKey: ["resources", { id }],
        // biome-ignore lint/style/noNonNullAssertion: The `enabled` key ensures that this will be non-null
        queryFn: () => fetchResource(id!),
        // Check if we have already fetched this resource before making a new request
        initialData: () =>
            queryClient
                .getQueryData<Resource[]>(["resources"])
                ?.find(resource => resource.id === id),
        initialDataUpdatedAt: () => queryClient.getQueryState(["resources"])?.dataUpdatedAt,
    });
