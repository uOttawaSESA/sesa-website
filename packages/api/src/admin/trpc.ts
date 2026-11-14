/**
 * tRPC init for the admin API. Separate from the public init in `../trpc.ts` because the public site
 * must stay static while every admin request needs the session.
 *
 * Keeping two inits also makes it a type error to merge an admin router into the public `appRouter`.
 */

import { errorFormatter, timeProcedure } from "@repo/api/shared";
import { type Database, db } from "@repo/db";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * Context for every admin procedure.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createAdminContext = async (opts: {
    headers: Headers;
}): Promise<{ db: Database; headers: Headers }> => {
    return {
        db,
        ...opts,
    };
};

const t = initTRPC.context<typeof createAdminContext>().create({
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
