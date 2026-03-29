import type { Guild, GuildMember } from "discord.js";
import { serverInfo } from "../..";
import type { MemberData } from "../../type";
import { type GuildRoleConfig, getGuildRoleConfig, TEAM_ROLE_MAP } from "./roleConfig";

/**
 * - Add base member discord role
 * - Add Team discord role
 * - Change Username to display the team and role
 * @param memberData
 * @param guild
 * @returns
 */
export async function syncMemberRoles(memberData: MemberData, guild: Guild) {
    let member: GuildMember | undefined;
    try {
        member = await guild.members.fetch(memberData.discordId);
    } catch (error) {
        await serverInfo.internalErrorChannel.send({
            content: `Failed to fetch member <@${memberData.discordId}> in guild **${guild.name}**. \nError: ${error}`,
        });
        return;
    }

    if (!member) {
        await serverInfo.internalErrorChannel.send({
            content: `<@${memberData.discordId}> not found in guild **${guild.name}**.`,
        });
        return;
    }

    const config = getGuildRoleConfig(guild);

    await ensureBaseRole(member, config);
    await syncteamRole(memberData, member, config);
    await updateNickname(memberData, member);
}

/**
 * Ensure that the base role to see the channel is set in the internal discord server
 * - Add SESA Team role to members
 * @param member
 * @param serverInfo
 * @returns
 */
async function ensureBaseRole(member: GuildMember, config: GuildRoleConfig) {
    const sesaRole = member.roles.cache.find(role => role.id === config.requiredRoleId);
    if (sesaRole) {
        return;
    }
    const role = await config.guild.roles.fetch(config.requiredRoleId);
    if (role) {
        await member.roles.add(role);
    }
}

/**
 * Function which adds all required role matching with the roles given in the database.
 * - Add the database role on discord,
 * - Add Team Lead Role if the member is set as Lead
 * - Remove previous team roles
 * @param memberData
 * @param member
 * @returns
 */
async function syncteamRole(memberData: MemberData, member: GuildMember, config: GuildRoleConfig) {
    const currentRoleIds = new Set(member.roles.cache.map(role => role.id));
    const teamRoleId = config.getTeamRoleId(memberData.teamKey);

    // Add Team Role
    const desiredRoles = new Set<string>();
    if (teamRoleId) {
        desiredRoles.add(teamRoleId);
    }

    // Add Lead Role
    if (
        memberData.roleKey === "lead" &&
        memberData.teamKey !== "codirectors" &&
        memberData.teamKey !== "advisors"
    ) {
        desiredRoles.add(config.leadRoleId);
    }

    // Remove previous teams roles & Lead if not leader
    const rolesToAdd = [...desiredRoles].filter(role => !currentRoleIds.has(role));
    const rolesToRemove = member.roles.cache
        .filter(
            role =>
                (config.teamRoleIds.includes(role.id) || role.id === config.leadRoleId) &&
                !desiredRoles.has(role.id),
        )
        .map(role => role.id);

    if (rolesToAdd.length) {
        await member.roles.add(rolesToAdd);
    }
    if (rolesToRemove.length) {
        await member.roles.remove(rolesToRemove);
    }
}

/**
 * Add the role to the server nickname (e.g. 8x5y1a => 8x5y1a [Dev Team])
 * @param memberData
 * @param member
 * @returns
 */
async function updateNickname(memberData: MemberData, member: GuildMember) {
    const baseName = member.displayName.replace(/\s\[[^\]]+\]$/, ""); // removes "[Role Team]" suffix from nickname
    const roleUsername = TEAM_ROLE_MAP[memberData.teamKey].nicknameLabel;
    let level = "";
    if (memberData.teamKey !== "codirectors" && memberData.teamKey !== "advisors") {
        level = memberData.roleKey === "member" ? " Team" : " Lead";
    }
    await member.setNickname(`${baseName} [${roleUsername}${level}]`);
    return Promise.resolve();
}
