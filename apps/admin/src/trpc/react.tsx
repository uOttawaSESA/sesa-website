"use client";

import type { AdminRouter } from "@repo/api/admin";
import { envAdminClient } from "@repo/env/admin/client";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchStreamLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import SuperJSON from "superjson";
import { createQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined;
const getQueryClient = () => {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return createQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    clientQueryClientSingleton ??= createQueryClient();

    return clientQueryClientSingleton;
};

export const api = createTRPCReact<AdminRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AdminRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AdminRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: op =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                httpBatchStreamLink({
                    transformer: SuperJSON,
                    url: `${getBaseUrl()}/api/trpc`,
                    headers: () => {
                        const headers = new Headers();
                        headers.set("x-trpc-source", "nextjs-react");
                        return headers;
                    },
                }),
            ],
        }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    );
}

function getBaseUrl() {
    if (typeof window !== "undefined") return window.location.origin;
    if (envAdminClient.VERCEL_URL) return `https://${envAdminClient.VERCEL_URL}`;
    return `http://localhost:${envAdminClient.NEXT_PUBLIC_PORT}`;
}
