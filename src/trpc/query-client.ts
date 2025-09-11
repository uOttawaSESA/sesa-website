import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import SuperJSON from "superjson";

/**
 * Function to create a query client with the same config from different parts of the app.
 */
export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                // Our data changes very rarely; this doesn't need to be high
                staleTime: 30 * 60 * 1000,
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
