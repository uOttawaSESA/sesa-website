import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type MappedResource, resources } from "@/server/db/schema";

const TIER_MAP = ["S", "A", "B", "C", "D", "E", "F"];

export const resourceRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx }) => {
            const rows = await ctx.db
                .select({
                    // Columns from the resource table
                    id: resources.id,
                    createdAt: resources.createdAt,
                    updatedAt: resources.updatedAt,
                    title: resources.title,
                    source: resources.source,
                    tier: resources.tier,
                    locale: resources.locale,
                    accessibility: resources.accessibility,
                    category: resources.category,
                    course: resources.course,
                    pricing: resources.pricing,
                    format: resources.format,
                })
                .from(resources);

            return rows.map(resource => ({
                ...resource,
                tier: TIER_MAP[resource.tier] ?? "F",
            })) satisfies MappedResource[];
        }),
});
