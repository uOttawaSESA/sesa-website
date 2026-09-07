import { contactRouter } from "@repo/api/routers/contact";
import { eventRouter } from "@repo/api/routers/event";
import { memberRouter } from "@repo/api/routers/members";
import { resourceRouter } from "@repo/api/routers/resource";
import { createCallerFactory, createTRPCRouter } from "@repo/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    contact: contactRouter,
    event: eventRouter,
    member: memberRouter,
    resource: resourceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
