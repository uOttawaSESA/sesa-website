import { memberPermissions } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    getSession: publicProcedure.query(({ ctx }) => {
        return ctx.session;
    }),

    getCurrentMember: protectedProcedure.query(async ({ ctx }) => {
        const member = await ctx.db.query.members.findFirst({
            where: (members, { eq }) => eq(members.discordId, ctx.session.user.discordId),
        });

        if (!member) {
            return null;
        }

        const permissions = await ctx.db
            .select({ permission: memberPermissions.action })
            .from(memberPermissions)
            .where(eq(memberPermissions.memberId, member.id));

        return {
            member,
            permissions: permissions.map(p => p.permission),
        };
    }),
});
