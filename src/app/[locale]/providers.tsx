"use client";
import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { createQueryClient } from "@/lib/query";
import type { ReactNode } from "react";

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

export const trpcApi = createTRPCReact();

function _getBaseUrl() {
    if (typeof window !== "undefined") return window.location.origin;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export interface Props {
    children: ReactNode;
}

/** Provider for TanStack Query. */
export function QueryProvider({ children }: Props) {
    const queryClient = getQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
