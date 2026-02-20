import { members, roleTranslations } from "@repo/db/schema";
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

                    roleKey: members.roleKey,
                    roleLabel: roleTranslations.label,

                    teamKey: members.teamKey,

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
                .leftJoin(
                    roleTranslations,
                    and(
                        eq(roleTranslations.roleKey, members.roleKey),
                        eq(roleTranslations.locale, input.locale),
                    ),
                );
            return rows;
        }),
});
