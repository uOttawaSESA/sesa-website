import { db } from "@repo/db"; //
import { account, members, session, user, verification } from "@repo/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { eq } from "drizzle-orm";
import { hasAccess } from "./auth-config.js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    user: {
        additionalFields: {
            memberId: {
                type: "string",
                required: false,
            },
        },
    },
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            async mapProfileToUser(profile) {
                const memberRecord = await db
                    .select()
                    .from(members)
                    .where(eq(members.discordId, profile.id))
                    .limit(1);

                if (memberRecord.length === 0 || memberRecord[0] === undefined) {
                    throw new Error("unauthorized_user"); //non club user trying to sign in
                }

                if (hasAccess(memberRecord[0]) === false) {
                    throw new Error("forbidden_member"); //member is part of the club, but doenst have access
                }

                return {
                    email: profile.email,
                    name: profile.username,
                    image: profile.image_url,
                    memberId: memberRecord[0].id,
                };
            },
        },
    },

    plugins: [nextCookies()],
});
