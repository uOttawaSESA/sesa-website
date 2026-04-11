import type { Guild, TextChannel } from "discord.js";
import * as z from "zod";

export interface ServerInfo {
    internalDiscord: Guild;
    publicDiscord: Guild;
    publicEventChannel: TextChannel;
    internalEventChannel: TextChannel;
    internalAuditChannel: TextChannel;
    internalErrorChannel: TextChannel;
}

export type TeamRoleConfig = {
    internalRoleId: string;
    nicknameLabel: string;
    publicRoleId: string;
};

export type TeamKey =
    | "codirectors"
    | "partnerships"
    | "logistics"
    | "communications"
    | "development"
    | "academics"
    | "advisors";

//TODO: FIXME: Temporary until replacement of official shared type
export const MemberSchema = z.object({
    discordId: z.string(),
    teamKey: z.enum([
        "codirectors",
        "partnerships",
        "logistics",
        "communications",
        "development",
        "academics",
        "advisors",
    ]),
    roleKey: z.enum(["lead", "member"]),
});
export type Member = z.infer<typeof MemberSchema>;

//TODO: FIXME: Temporary until replacement of official shared type
export const EventSchema = z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    registrationUrl: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    image: z.string(),
    type: z.string(),
});
export type Event = z.infer<typeof EventSchema>;

//TODO: FIXME: Temporary until replacement of official shared type
export const LogSchema = z.object({
    action: z.string(),
    user: z.string(),
    timestamp: z.string(),
});
export type Log = z.infer<typeof LogSchema>;
