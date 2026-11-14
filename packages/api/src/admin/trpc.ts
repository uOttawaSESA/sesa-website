/**
 * tRPC init for the admin API. Separate from the public init in `../trpc.ts` because the public site
 * must stay static while every admin request needs the session.
 *
 * Keeping two inits also makes it a type error to merge an admin router into the public `appRouter`.
 */

import { type DiscordGateway, fakeDiscordGateway } from "@repo/api/admin/services/discord";
import { fakeSiteRevalidator, type SiteRevalidator } from "@repo/api/admin/services/revalidator";
import { type FileStorage, fakeFileStorage } from "@repo/api/admin/services/storage";
import { errorFormatter, timeProcedure } from "@repo/api/shared";
import { type Database, db } from "@repo/db";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * Side-effect services, injected so feature routers never build their own clients and tests can
 * substitute them.
 */
export type AdminServices = {
    discord: DiscordGateway;
    revalidator: SiteRevalidator;
    storage: FileStorage;
};

/** Logging no-op implementation of every service, used by `createAdminContext`. */
export const fakeServices: AdminServices = {
    discord: fakeDiscordGateway,
    revalidator: fakeSiteRevalidator,
    storage: fakeFileStorage,
};

/**
 * Context for every admin procedure. Tests can build one directly and pass it to `createCaller`.
 */
export type AdminContext = AdminServices & {
    db: Database;
    headers: Headers;
};

/**
 * Build the context for a request.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createAdminContext = async (opts: { headers: Headers }): Promise<AdminContext> => {
    return {
        db,
        headers: opts.headers,
        ...fakeServices,
    };
};

const t = initTRPC.context<AdminContext>().create({
    transformer: superjson,
    errorFormatter,
});

/** @see https://trpc.io/docs/server/server-side-calls */
export const createCallerFactory = t.createCallerFactory;

/** @see https://trpc.io/docs/router */
export const createTRPCRouter = t.router;

/** @see timeProcedure */
const timingMiddleware = t.middleware(({ next, path }) =>
    timeProcedure({ path, isDev: t._config.isDev, next }),
);

/**
 * Unauthenticated base for admin procedures.
 * Feature routers should not use this directly.
 */
export const baseProcedure = t.procedure.use(timingMiddleware);
