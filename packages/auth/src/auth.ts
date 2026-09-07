import { db } from "@repo/db"; //
import { account, members, session, user, verification } from "@repo/db/schema";
import { APIError, betterAuth } from "better-auth";
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
            discordId: {
                type: "string",
                required: true,
                unique: true,
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
                    throw APIError.from("FORBIDDEN", {
                        code: "unauthorized_member",
                        message: "You are not authorized to access this application.",
                    });
                }

                if (hasAccess(memberRecord[0]) === false) {
                    throw APIError.from("FORBIDDEN", {
                        code: "forbidden_member",
                        message:
                            "You are not authorized to access this application, please contact the Directors if you believe this is a mistake.",
                    });
                }

                return {
                    discordId: profile.id,
                };
            },
        },
    },

    plugins: [nextCookies()],
});
