import type { Guild, TextChannel } from "discord.js";

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

//FIXME: //TODO: Temporary replacement for the type memberData
export interface MemberData {
    discordId: string;
    teamKey: TeamKey;
    roleKey: "lead" | "member";
}

export type TeamKey =
    | "codirectors"
    | "partnerships"
    | "logistics"
    | "communications"
    | "development"
    | "academics"
    | "advisors";

//TODO: Temporary until replacement of official shared type
export type Event = {
    title: string;
    description: string;
    location: string;
    registrationUrl: string;
    startTime: Date;
    endTime: Date;
    image: string;
    type: string;
};

//TODO: Temporary until replacement of official shared type
export type Log = {
    action: string;
    user: string;
    timestamp: string;
};
