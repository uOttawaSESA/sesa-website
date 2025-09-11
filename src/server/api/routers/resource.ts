import { TRPCError } from "@trpc/server";
import { asc, desc, sql } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type MappedResource, resources } from "@/server/db/schema";

const TIER_MAP = ["S", "A", "B", "C", "D", "E", "F"];

function unreachable(_x: never, message: string): never {
    throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message,
    });
}

export const resourceRouter = createTRPCRouter({
    /**
     * Get all of the resources in the remote DB.
     * In general, it will be preferred to paginate data instead of using this.
     */
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

    /**
     * Get a particular page of the resources.
     * Takes the page and page size as arguments, as well as any sorts and filters to apply.
     */
    getPage: publicProcedure
        .input(
            z.object({
                page: z.uint32(),
                pageSize: z.uint32(),
                sort: z.enum([
                    "created_asc",
                    "created_desc",
                    "updated_asc",
                    "updated_desc",
                    "tier_asc",
                    "tier_desc",
                    "alphabetical_asc",
                    "alphabetical_desc",
                ]),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { page, pageSize, sort } = input;
            const offset = (page - 1) * input.pageSize;
            /** The order query to use based on input parameters. */
            const order = (() => {
                switch (sort) {
                    case "created_asc":
                        return asc(resources.createdAt);
                    case "created_desc":
                        return desc(resources.createdAt);
                    case "updated_asc":
                        return asc(resources.updatedAt);
                    case "updated_desc":
                        return desc(resources.updatedAt);
                    // Note for tier queries: since S tier is 0, A is 1, etc.,
                    // the meaning of ascending/descending is flipped.
                    case "tier_asc":
                        return desc(resources.tier);
                    case "tier_desc":
                        return asc(resources.tier);
                    case "alphabetical_asc":
                        return asc(resources.title);
                    case "alphabetical_desc":
                        return desc(resources.title);
                    default:
                        // This line should give a type error if there are unhandled sorts
                        unreachable(sort, `Unknown sort ${sort}.`);
                }
            })();

            const rows = await ctx.db
                .select()
                .from(resources)
                .orderBy(order)
                .offset(offset)
                .limit(pageSize);

            return rows.map(resource => ({
                ...resource,
                tier: TIER_MAP[resource.tier] ?? "F",
            })) satisfies MappedResource[];
        }),

    /**
     * Get the total number of resources in the DB.
     */
    getCount: publicProcedure.query(async ({ ctx }) => {
        const [{ count }] = await ctx.db.select({ count: sql<number>`count(*)` }).from(resources);
        return count;
    }),

    /**
     * Get a list of all the unique courses in the resource list.
     */
    getUniqueCourses: publicProcedure.query(async ({ ctx }) => {
        const rows = await ctx.db.selectDistinct({ course: resources.course }).from(resources);
        return rows.map(row => row.course);
    }),
});
