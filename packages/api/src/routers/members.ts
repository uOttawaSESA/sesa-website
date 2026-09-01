import { createTRPCRouter, publicProcedure } from "@repo/api/trpc";
import { members } from "@repo/db/schema";
import { isNull } from "drizzle-orm";

export const memberRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
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
            })
            .from(members)
            .where(isNull(members.retiredAt))
            .orderBy(members.teamKey, members.roleKey, members.createdAt);
        return rows;
    }),
});
