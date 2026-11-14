import "server-only";

import { type AdminRouter, createCaller } from "@repo/api/admin";
import { createAdminContext } from "@repo/api/admin/trpc";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createAdminContext` helper and provides the required context for the admin API
 * when handling a tRPC call from a React Server Component.
 *
 * Unlike the public site, the real request headers are forwarded so the session can be read.
 */
const createContext = cache(async () => {
    const heads = new Headers(await headers());
    heads.set("x-trpc-source", "rsc");

    return createAdminContext({
        headers: heads,
    });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AdminRouter>(
    caller,
    getQueryClient,
);
