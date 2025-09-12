import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, ilike, or, type SQL, sql } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type MappedResource, resources } from "@/server/db/schema";

const TIER_MAP = ["S", "A", "B", "C", "D", "E", "F"];

const ResourceSorts = z.enum([
    "created_asc",
    "created_desc",
    "updated_asc",
    "updated_desc",
    "tier_asc",
    "tier_desc",
    "alphabetical_asc",
    "alphabetical_desc",
]);

const ResourceFilters = z.object({
    course: z.string().optional(),
    category: z.string().optional(),
    format: z.string().optional(),
    locale: z.enum(["en", "fr"]).optional(),
    tier: z
        .int()
        .min(0)
        .max(TIER_MAP.length - 1)
        .optional(),
});

export type ResourceSorts = z.infer<typeof ResourceSorts>;
export type ResourceFilters = z.infer<typeof ResourceFilters>;

function unreachable(_x: never, message: string): never {
    throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message,
    });
}

function buildFilteredQuery(filters: ResourceFilters, search: string | null) {
    const queryFilters: Array<SQL | undefined> = [];
    // Simple equality
    if (filters.category != null) queryFilters.push(eq(resources.category, filters.category));
    if (filters.course != null) queryFilters.push(eq(resources.course, filters.course));
    if (filters.format != null) queryFilters.push(eq(resources.format, filters.format));
    if (filters.tier != null) queryFilters.push(eq(resources.tier, filters.tier));
    // Array containment
    if (filters.locale != null)
        queryFilters.push(sql`${resources.locale} @> ARRAY[${filters.locale}]::text[]`);
    // Full-text search
    if (search != null) {
        const term = `%${search}%`;
        queryFilters.push(or(ilike(resources.title, term), ilike(resources.course, term)));
    }

    return queryFilters;
}

export const resourceRouter = createTRPCRouter({
    /**
     * Get a single resource by ID.
     */
    get: publicProcedure.input(z.object({ id: z.uuidv4() })).query(async ({ ctx, input }) => {
        const row = await ctx.db.query.resources.findFirst({
            where: eq(resources.id, input.id),
        });

        if (row) return { ...row, tier: TIER_MAP[row.tier] ?? "F" };
    }),

    /**
     * Get all of the resources in the remote DB.
     * In general, it will be preferred to paginate data instead of using this.
     * @see {@link resourceRouter.getPage}
     * @deprecated Use `getPage` unless there is a specific reason not to.
     */
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx }) => {
            const rows = await ctx.db.select().from(resources);

            return rows.map(resource => ({
                ...resource,
                tier: TIER_MAP[resource.tier] ?? "F",
            })) satisfies MappedResource[];
        }),

    /**
     * Get a particular page of the resources.
     * Takes the page and page size as arguments, as well as any sorts and filters to apply.
     *
     * This procedure uses offsets rather than cursors to get pages.
     * This allows for jumping to arbitrary pages, but means that new data being added mid-pagination
     * can lead to weird results while paginating, such as resources appearing on multiple pages.
     * Since data is updated infrequently, this should be an acceptable tradeoff.
     */
    getPage: publicProcedure
        .input(
            z.object({
                page: z.uint32().min(1),
                pageSize: z.uint32().min(1),
                search: z.string().nullable(),
                filters: ResourceFilters,
                sort: ResourceSorts,
            }),
        )
        .query(async ({ ctx, input }) => {
            const { page, pageSize, search, filters, sort } = input;
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

            const queryFilters = buildFilteredQuery(filters, search);

            const rows = queryFilters.length
                ? // Apply filters as WHERE clauses, if there are any filters
                  await ctx.db
                      .select()
                      .from(resources)
                      .where(and(...queryFilters))
                      .orderBy(order)
                      .offset(offset)
                      .limit(pageSize)
                : // Otherwise, omit the WHERE
                  await ctx.db
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
     * Optionally, a filter can be provided to find the number of resources matching that filter.
     */
    getCount: publicProcedure
        .input(z.object({ search: z.string().nullable(), filters: ResourceFilters }).optional())
        .query(async ({ ctx, input }) => {
            const queryFilters = input ? buildFilteredQuery(input.filters, input.search) : [];

            const base = ctx.db.select({ count: sql<number>`count(*)` }).from(resources);
            const [{ count }] = queryFilters.length
                ? await base.where(and(...queryFilters))
                : await base;

            return count;
        }),

    /**
     * Get a list of all the unique courses in the resource list.
     */
    getUniqueCourses: publicProcedure.query(async ({ ctx }) => {
        const rows = await ctx.db.selectDistinct({ course: resources.course }).from(resources);
        return rows.map(row => row.course).filter(course => typeof course === "string");
    }),
});
