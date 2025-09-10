import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { resources, resourcesI18n } from "@/server/db/schema";

export const resourceRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select({
                    // Columns from the resource table
                    id: resources.id,
                    createdAt: resources.createdAt,
                    updatedAt: resources.updatedAt,
                    tier: resources.tier,
                    locale: resources.locale,
                    category: resources.category,
                    course: resources.course,
                    pricing: resources.pricing,
                    format: resources.format,
                    // Columns from the i18n table
                    title: resourcesI18n.title,
                })
                .from(resources)
                .leftJoin(
                    resourcesI18n,
                    and(
                        eq(resources.id, resourcesI18n.resourceId),
                        eq(resourcesI18n.locale, input.locale),
                    ),
                )
                .orderBy(resources.createdAt);

            return rows;
        }),
});
