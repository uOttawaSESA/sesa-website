import { memberPermissions, rolePermissions } from "@repo/db/schema";
import { and, eq } from "drizzle-orm";
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

        //TODO: Might be better to move this to another query and cache the user's permissions
        const permissions = await ctx.db
            .select({ permission: rolePermissions.permission })
            .from(rolePermissions)
            .where(
                and(
                    eq(rolePermissions.teamKey, member.teamKey),
                    eq(rolePermissions.roleKey, member.roleKey),
                ),
            )
            .union(
                ctx.db
                    .select({ permission: memberPermissions.permission })
                    .from(memberPermissions)
                    .where(eq(memberPermissions.memberId, member.id)),
            );

        return {
            member,
            permissions: permissions.map(p => p.permission),
        };
    }),
});
