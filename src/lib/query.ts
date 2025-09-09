import { QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    collection,
    type DocumentSnapshot,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    type Query,
    query,
    startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Event, FirestoreEvent } from "@/schemas/events";
import { FirestoreResource, type Resource } from "@/schemas/resources";

export const queryClient = new QueryClient();

/** The number of resources to request at a time when using {@link useInfiniteResources}. */
const RESOURCE_PAGE_SIZE = 18;

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
 * @param cursor The document to start after for paginated search.
 * If undefined, the entire collection is dumped.
 * If null, then the first page of results is provided.
 */
export async function fetchResources(cursor?: DocumentSnapshot | null) {
    const coll = collection(db, "Resources");
    let q: Query;

    if (cursor) {
        // Cursor provided; start after the cursor
        q = query(
            coll,
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(RESOURCE_PAGE_SIZE),
        );
    } else if (cursor === null) {
        // Cursor explicitly null; start at the beginning
        q = query(coll, orderBy("createdAt", "desc"), limit(RESOURCE_PAGE_SIZE));
    } else {
        // No cursor; return everything
        q = query(coll, orderBy("createdAt", "desc"));
    }

    // Fetch from Firestore
    const snapshot = await getDocs(q);
    const docs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
    // Include only valid resources
    const validated = docs.map(doc => FirestoreResource.parse(doc));

    return {
        docs: validated,
        prevCursor: cursor || null,
        nextCursor: snapshot.docs.at(-1) || null,
    };
}

/**
 * Get resources data from Firestore. Remote data is validated with Zod before returning.
 * This function gets all of the resource data at once; you likely want to use {@link useInfiniteResources}.
 */
export const useResources = () =>
    useQuery({
        queryKey: ["resources"],
        queryFn: async () => (await fetchResources()).docs,
    });

/**
 * Gets resources from Firestore with an infinite query.
 * Remote data is validated with Zod before returning.
 */
export const useInfiniteResources = () =>
    useInfiniteQuery({
        queryKey: ["infiniteResources"],
        queryFn: ({ pageParam }) => fetchResources(pageParam),
        initialPageParam: null as DocumentSnapshot | null,
        getNextPageParam: lastPage => lastPage.nextCursor,
        getPreviousPageParam: lastPage => lastPage.prevCursor,
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
