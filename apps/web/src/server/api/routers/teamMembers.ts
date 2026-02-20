import { members, membersI18n } from "@repo/db/schema";
import { and, eq } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const memberRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx, input }) => {
            const rows = await ctx.db
                .select({
                    id: members.id,
                    name: members.name,
                    role: members.role,
                    teamKey: members.team,
                    teamLabel: membersI18n.label,
                    imagePath: members.imagePath,
                    email: members.email,
                    linkedinUrl: members.linkedinUrl,
                    githubUrl: members.githubUrl,
                    portfolioUrl: members.portfolioUrl,
                    isAdvisor: members.isAdvisor,
                    isRetired: members.isRetired,
                    createdAt: members.createdAt,
                    retiredAt: members.retiredAt,
                })
                .from(members)
                .innerJoin(
                    members,
                    and(eq(members.team, members.role), eq(members.locale, input.locale)),
                );

            return rows;
        }),
});
