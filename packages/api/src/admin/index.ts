import { authRouter } from "@repo/api/admin/routers/auth";
import { baseProcedure, createCallerFactory, createTRPCRouter } from "@repo/api/admin/trpc";

/**
 * Root router for the admin API, mounted only by `apps/admin`.
 *
 * All routers added in `admin/routers` should be manually added here.
 */
export const adminRouter = createTRPCRouter({
    /** Smoke test for the admin API wiring. Also keeps the router non-empty, which tRPC's RSC helpers require. */
    health: baseProcedure.query(() => ({ ok: true })),
    auth: authRouter,
});

export type AdminRouter = typeof adminRouter;

/** Create a server-side caller for the admin API. */
export const createCaller = createCallerFactory(adminRouter);
