import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import SuperJSON from "superjson";

/**
 * Function to create a query client with the same config from different parts of the app.
 */
export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                // Kept shorter than the public site since admin users expect to see changes relatively quickly
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
