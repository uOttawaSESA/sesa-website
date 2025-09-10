import { fetchEvents } from "@/lib/query";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => fetchEvents()),
});
