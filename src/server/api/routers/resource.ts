import { fetchResources } from "@/lib/query";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const resourceRouter = createTRPCRouter({
    getAll: publicProcedure.query(() => fetchResources()),
});
