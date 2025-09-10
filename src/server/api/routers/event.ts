import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { events, eventsI18n, type LocalizedEvent } from "@/server/db/schema";

export const eventRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select({
                    // Columns from the event table
                    id: events.id,
                    createdAt: events.createdAt,
                    updatedAt: events.updatedAt,
                    startTime: events.startTime,
                    endTime: events.endTime,
                    type: events.type,
                    location: events.location,
                    imageUrl: events.imageUrl,
                    detailsUrl: events.detailsUrl,
                    registrationUrl: events.registrationUrl,
                    // Columns from the i18n table
                    title: eventsI18n.title,
                    description: eventsI18n.description,
                    imageAlt: eventsI18n.imageAlt,
                })
                .from(events)
                .innerJoin(
                    eventsI18n,
                    and(eq(events.id, eventsI18n.eventId), eq(eventsI18n.locale, input.locale)),
                )
                .orderBy(events.startTime);

            return rows satisfies LocalizedEvent[];
        }),
});
