import type { Guild, TextChannel } from "discord.js";

export interface ServerInfo {
    internalDiscord: Guild;
    publicDiscord: Guild;
    publicEventChannel: TextChannel;
    internalEventChannel: TextChannel;
    internalAuditChannel: TextChannel;
}

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

export type TeamRoleConfig = {
    internalId: string;
    nicknameLabel: string;
    publicId: string;
};
