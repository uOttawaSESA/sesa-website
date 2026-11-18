import { memberPermissions, members } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
    getCurrentMember: protectedProcedure.query(async ({ ctx }) => {
        const member = await ctx.db.query.members.findFirst({
            where: eq(members.id, ctx.actor.memberId),
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
            permissions: permissions.map(permission => permission.permission),
        };
    }),
});
