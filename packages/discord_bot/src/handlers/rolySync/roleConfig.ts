import "dotenv/config";
import type { Guild } from "discord.js";
import { INTERNAL_GUILD_ID } from "../../config";
import type { TeamKey, TeamRoleConfig } from "../../type";

export const INTERNAL_REQUIRED_ROLE_ID = "1479280284833677474";
export const PUBLIC_REQUIRED_ROLE_ID = "1480275276876484741";

export const INTERNAL_LEAD_ROLE_ID = "1479976773083987968";
export const PUBLIC_LEAD_ROLE_ID = "1480275276876484742";

export const TEAM_ROLE_MAP: Record<TeamKey, TeamRoleConfig> = {
    codirectors: {
        internalRoleId: "1479281803259809912",
        publicRoleId: "1480275276876484744",
        nicknameLabel: "Co-Director",
    },
    partnerships: {
        internalRoleId: "1479276844523192520",
        publicRoleId: "1480275276876484747",
        nicknameLabel: "Partnerships",
    },
    logistics: {
        internalRoleId: "1479276817939566696",
        publicRoleId: "1480275276876484748",
        nicknameLabel: "Logistics",
    },
    communications: {
        internalRoleId: "1479281776244297923",
        publicRoleId: "1480275276876484745",
        nicknameLabel: "Comms",
    },
    development: {
        internalRoleId: "1479276800453378210",
        publicRoleId: "1480275276876484749",
        nicknameLabel: "Dev",
    },
    academics: {
        internalRoleId: "1479281825565114430",
        publicRoleId: "1480275276876484743",
        nicknameLabel: "Academic",
    },
    advisors: {
        internalRoleId: "1479280177220550857",
        publicRoleId: "1480275276876484746",
        nicknameLabel: "Advisor",
    },
};

// Pre compute possible heavy task
export const INTERNAL_TEAM_ROLE_IDS = Object.values(TEAM_ROLE_MAP).map(role => role.internalRoleId);
export const PUBLIC_TEAM_ROLE_IDS = Object.values(TEAM_ROLE_MAP).map(role => role.publicRoleId);

export type GuildRoleConfig = {
    guild: Guild;
    requiredRoleId: string;
    leadRoleId: string;
    teamRoleIds: string[];
    getTeamRoleId: (teamKey: TeamKey) => string | undefined;
};

/**
 * Get the role configuration for a given guild. This function determines whether the guild is the internal guild or the public guild and returns the appropriate role IDs accordingly.
 * @param guild
 * @returns
 */
export function getGuildRoleConfig(guild: Guild): GuildRoleConfig {
    const isInternal = guild.id === INTERNAL_GUILD_ID;

    return {
        guild: guild,
        requiredRoleId: isInternal ? INTERNAL_REQUIRED_ROLE_ID : PUBLIC_REQUIRED_ROLE_ID,
        leadRoleId: isInternal ? INTERNAL_LEAD_ROLE_ID : PUBLIC_LEAD_ROLE_ID,
        teamRoleIds: isInternal ? INTERNAL_TEAM_ROLE_IDS : PUBLIC_TEAM_ROLE_IDS,
        getTeamRoleId: teamKey =>
            isInternal
                ? TEAM_ROLE_MAP[teamKey].internalRoleId
                : TEAM_ROLE_MAP[teamKey].publicRoleId,
    };
}
