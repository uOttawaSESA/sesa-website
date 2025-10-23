import { resources } from "@repo/db/schema";
import type { MappedResource } from "@repo/db/types";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, gt, ilike, lt, or, type SQL, sql } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const TIER_MAP = ["S", "A", "B", "C", "D", "E", "F"] as const;

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
    course: z.string().nullish(),
    category: z.string().nullish(),
    format: z.string().nullish(),
    locale: z.enum(["en", "fr"]).nullish(),
    tier: z
        .int()
        .min(0)
        .max(TIER_MAP.length - 1)
        .nullish(),
    accessibility: z.array(z.string()).nullish(),
});

export type ResourceSorts = z.infer<typeof ResourceSorts>;
export type ResourceFilters = z.infer<typeof ResourceFilters>;

const RESOURCE_PAGE_SIZE = 12;

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
    if (filters.accessibility && filters.accessibility.length > 0) {
        queryFilters.push(
            sql`${resources.accessibility} @> ARRAY[${sql.join(
                filters.accessibility.map(v => sql`${v}`),
                sql`,`,
            )}]::text[]`,
        );
    }

    // Full-text search
    if (search != null) {
        const term = `%${search}%`;
        queryFilters.push(or(ilike(resources.title, term), ilike(resources.course, term)));
    }

    return queryFilters;
}

function buildSortedQuery(
    sort: ResourceSorts,
): [sort: SQL, cursorCompare: "gt" | "lt", cursorField: keyof MappedResource] {
    switch (sort) {
        case "created_asc":
            return [asc(resources.createdAt), "gt", "createdAt"];
        case "created_desc":
            return [desc(resources.createdAt), "lt", "createdAt"];
        case "updated_asc":
            return [asc(resources.updatedAt), "gt", "updatedAt"];
        case "updated_desc":
            return [desc(resources.updatedAt), "lt", "updatedAt"];
        // Note for tier queries: since S tier is 0, A is 1, etc.,
        // the meaning of ascending/descending is flipped.
        case "tier_asc":
            return [desc(resources.tier), "lt", "tier"];
        case "tier_desc":
            return [asc(resources.tier), "gt", "tier"];
        case "alphabetical_asc":
            return [asc(resources.title), "gt", "title"];
        case "alphabetical_desc":
            return [desc(resources.title), "lt", "title"];
        default:
            // This line should give a type error if there are unhandled sorts
            unreachable(sort, `Unknown sort ${sort}.`);
    }
}

export const resourceRouter = createTRPCRouter({
    /**
     * Get a single resource by ID.
     */
    get: publicProcedure.input(z.object({ id: z.uuidv4() })).query(async ({ ctx, input }) => {
        const row = await ctx.db.query.resources.findFirst({
            where: eq(resources.id, input.id),
        });

        if (row) return { ...row, tier: TIER_MAP[row.tier] ?? "F" } as MappedResource;
    }),

    /**
     * Get all of the resources in the remote DB.
     * In general, it will be preferred to paginate data instead of using this.
     * @see {@link resourceRouter.getCursorPage}
     * @see {@link resourceRouter.getOffsetPage}
     * @deprecated Use page-based procedures unless there is a specific reason not to.
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
     * Get a particular page of the resources using cursor-based pagination.
     * Takes the cursor and page size as arguments, as well as any sorts and filters to apply.
     */
    getCursorPage: publicProcedure
        .input(
            z.object({
                cursor: z.object({ id: z.uuidv4(), value: z.unknown() }).nullish(),
                search: z.string().nullable(),
                filters: ResourceFilters,
                sort: ResourceSorts,
            }),
        )
        .query(async ({ ctx, input }) => {
            const { cursor, search, filters, sort } = input;
            /** The order query to use based on input parameters. */
            const [order, direction, field] = buildSortedQuery(sort);
            const idOrder = direction === "gt" ? asc(resources.id) : desc(resources.id);

            const queryFilters = buildFilteredQuery(filters, search);

            if (cursor != null) {
                // Compare the main field
                // biome-ignore-start lint/suspicious/noExplicitAny: cursor.value is based on the target field
                const primaryCompare =
                    direction === "gt"
                        ? gt(resources[field], cursor.value as any)
                        : lt(resources[field], cursor.value as any);

                // If the main field equals the cursor value, compare IDs as the tiebreaker.
                // The id comparator must match the direction.
                const idCompare =
                    direction === "gt" ? gt(resources.id, cursor.id) : lt(resources.id, cursor.id);

                // Lexicographic cursor predicate: field > cursor.value OR (field = cursor.value AND id >|< cursor.id)
                const cursorPredicate = or(
                    primaryCompare,
                    and(eq(resources[field], cursor.value as any), idCompare),
                );
                // biome-ignore-end lint/suspicious/noExplicitAny: cursor.value is based on the target field

                queryFilters.push(cursorPredicate);
            }

            const rows = queryFilters.length
                ? // Apply filters as WHERE clauses, if there are any filters
                  await ctx.db
                      .select()
                      .from(resources)
                      .where(and(...queryFilters))
                      .orderBy(order, idOrder)
                      .limit(RESOURCE_PAGE_SIZE + 1)
                : // Otherwise, omit the WHERE
                  await ctx.db
                      .select()
                      .from(resources)
                      .orderBy(order, idOrder)
                      .limit(RESOURCE_PAGE_SIZE + 1);

            const hasMore = rows.length === RESOURCE_PAGE_SIZE + 1;
            // Remove the last element (we don't need it, just needed to know if there exists one)
            if (hasMore) rows.splice(rows.length - 1);

            // Determine the new cursor
            let nextCursor: typeof cursor = null;
            if (hasMore) {
                // biome-ignore lint/style/noNonNullAssertion: hasMore implies that the list is not empty
                const lastRow = rows.at(-1)!;
                nextCursor = { id: lastRow.id, value: lastRow[field] };
            }

            const mappedRows = rows.slice(0, RESOURCE_PAGE_SIZE).map(resource => ({
                ...resource,
                tier: TIER_MAP[resource.tier] ?? "F",
            })) satisfies MappedResource[];

            return { data: mappedRows, prevCursor: cursor, nextCursor: nextCursor };
        }),

    /**
     * Get a particular page of the resources using offset-based pagination.
     * Takes the page and page size as arguments, as well as any sorts and filters to apply.
     *
     * This procedure uses offsets rather than cursors to get pages.
     * This allows for jumping to arbitrary pages, but means that new data being added mid-pagination
     * can lead to weird results while paginating, such as resources appearing on multiple pages.
     * Since data is updated infrequently, this should be an acceptable tradeoff.
     */
    getOffsetPage: publicProcedure
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
            const [order, direction] = buildSortedQuery(sort);
            const idOrder = direction === "gt" ? asc(resources.id) : desc(resources.id);

            const queryFilters = buildFilteredQuery(filters, search);

            const rows = queryFilters.length
                ? // Apply filters as WHERE clauses, if there are any filters
                  await ctx.db
                      .select()
                      .from(resources)
                      .where(and(...queryFilters))
                      .orderBy(order, idOrder)
                      .offset(offset)
                      .limit(pageSize)
                : // Otherwise, omit the WHERE
                  await ctx.db
                      .select()
                      .from(resources)
                      .orderBy(order, idOrder)
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
