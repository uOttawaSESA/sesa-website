import { members } from "@repo/db/schema";
import { isNull } from "drizzle-orm";
import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const memberRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ locale: z.enum(["en", "fr"]) }))
        .query(async ({ ctx }) => {
            const rows = await ctx.db
                .select({
                    id: members.id,
                    name: members.name,

                    roleKey: members.roleKey,
                    teamKey: members.teamKey,

                    imageUrl: members.imageUrl,
                    email: members.email,
                    linkedinUrl: members.linkedinUrl,
                    githubUrl: members.githubUrl,
                    portfolioUrl: members.portfolioUrl,
                    createdAt: members.createdAt,
                    updatedAt: members.updatedAt,
                    retiredAt: members.retiredAt,
                })
                .from(members)
                .where(isNull(members.retiredAt));
            return rows;
        }),
});
