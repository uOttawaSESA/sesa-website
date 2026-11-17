/**
 * tRPC init for the admin API. Separate from the public init in `../trpc.ts` because the public site
 * must stay static while every admin request needs the session.
 *
 * Keeping two inits also makes it a type error to merge an admin router into the public `appRouter`.
 */

import { type Actor, resolveActor } from "@repo/api/admin/actor";
import { type Action, assertCan } from "@repo/api/admin/permissions";
import { type DiscordGateway, fakeDiscordGateway } from "@repo/api/admin/services/discord";
import { fakeSiteRevalidator, type SiteRevalidator } from "@repo/api/admin/services/revalidator";
import { type FileStorage, fakeFileStorage } from "@repo/api/admin/services/storage";
import { errorFormatter, timeProcedure } from "@repo/api/shared";
import { type Database, db } from "@repo/db";
import { initTRPC, TRPCError } from "@trpc/server";
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
    /** `null` when nobody is signed in; `protectedProcedure` narrows it. */
    actor: Actor | null;
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
        actor: await resolveActor(db, opts.headers),
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

/**
 * Base for every admin procedure: rejects the request with `UNAUTHORIZED` unless a signed-in,
 * active member is making it, and narrows `ctx.actor` to non-null.
 *
 * Most procedures want `authorizedProcedure` instead. Use this directly only for procedures every
 * member may call, like reading their own profile.
 */
export const protectedProcedure = baseProcedure.use(({ ctx, next }) => {
    if (ctx.actor == null) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({ ctx: { actor: ctx.actor } });
});

/**
 * A procedure that requires `action`. Rejects with `UNAUTHORIZED` when signed out and `FORBIDDEN`
 * when `can(actor, action)` is false.
 *
 * The check has no subject. Procedures whose answer depends on the target (e.g. `member.approve`)
 * must also call `assertCan` with it once the target is loaded.
 */
export const authorizedProcedure = (action: Action) =>
    protectedProcedure.use(({ ctx, next }) => {
        assertCan(ctx.actor, action);
        return next();
    });
