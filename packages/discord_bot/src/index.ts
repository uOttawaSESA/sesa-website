import "dotenv/config";
import { Client, GatewayIntentBits, type TextChannel } from "discord.js";
import {
    InternalAuditChannelId,
    InternalDiscordId,
    InternalErrorChannelId,
    InternalEventChannelId,
    PublicDiscordId,
    PublicEventChannelId,
} from "./config";
import { newEvent } from "./handlers/events";
import { syncMemberRoles } from "./handlers/rolySync/syncMemberRoles";
import { startServer } from "./server";
import type { ServerInfo, TeamKey } from "./type";

export const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
export let serverInfo = {} as ServerInfo;

client.once("clientReady", async () => {
    serverInfo = await createServerInfo();
    client.user?.setActivity("Empowering your tech journey!", { type: 0 });

    console.log(`Bot online as ${client.user?.tag}`);
    startServer(serverInfo);

    // Example usage of the handlers (can be removed later)
    newEvent(
        {
            title: "Career Panel",
            description:
                "Ever wondered what it’s like to work at Microsoft, Google, Meta, Apple, Amazon, Dropbox, Datadog, DoorDash, Shopify, and more? 👀 We’re bringing together speakers from these leading companies for an exclusive Career Panel covering roles in Software Development, Project Management, and UI/UX Design. 🎤 Special guest: Aidan Ouckama (CS content creator) will be sharing insights on navigating the tech world and growing your career. 💡 This is your chance to ask questions, hear real experiences, and learn what it takes to succeed in top-tier tech roles.",
            location: "STM 117",
            registrationUrl: "https://www.google.com",
            startTime: new Date(Date.now() + 60 * 60 * 1000),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
        serverInfo,
    );

    const role = "lead"; // lead // member
    const team: TeamKey = "development"; //codirectors //partnerships //communications // development
    syncMemberRoles(
        { discordId: "190594925086244864", teamKey: team, roleKey: role },
        serverInfo.internalDiscord,
    );
    syncMemberRoles(
        { discordId: "190594925086244864", teamKey: team, roleKey: role },
        serverInfo.publicDiscord,
    );
});

/**
 * Verifying if the channel is a valid text channel and belongs to the correct guild.
 * If any of the checks fail, an error will be thrown and the bot will not start.
 * This is to prevent any runtime errors when the bot is running.
 * @param channel
 * @param expectedGuildId
 * @param channelName
 * @returns
 */
function verifyTextChannel(
    channel: unknown,
    expectedGuildId: string,
    channelName: string,
): TextChannel {
    if (
        !channel ||
        typeof (channel as TextChannel).isTextBased !== "function" ||
        !(channel as TextChannel).isTextBased()
    ) {
        throw new Error(`${channelName} is not a valid text channel`);
    }
    if ((channel as TextChannel).guildId !== expectedGuildId) {
        throw new Error(`${channelName} does not belong to the expected guild`);
    }
    return channel as TextChannel;
}

/**
 * Verifying all of the setup before letting the bot run.
 * Verifying validity of all the ID's (e.g. if the id can't be found, bot wont start)
 * @returns
 */
async function createServerInfo(): Promise<ServerInfo> {
    const channelConfigs = [
        {
            key: "publicEventChannel",
            id: PublicEventChannelId,
            expectedGuildId: PublicDiscordId,
            label: "PublicEventChannelId",
        },
        {
            key: "internalEventChannel",
            id: InternalEventChannelId,
            expectedGuildId: InternalDiscordId,
            label: "InternalEventChannelId",
        },
        {
            key: "internalAuditChannel",
            id: InternalAuditChannelId,
            expectedGuildId: InternalDiscordId,
            label: "InternalAuditChannelId",
        },
        {
            key: "internalErrorChannel",
            id: InternalErrorChannelId,
            expectedGuildId: InternalDiscordId,
            label: "InternalErrorChannelId",
        },
    ];

    // Fetch guilds
    const [internalGuild, publicGuild] = await Promise.all([
        client.guilds.fetch(InternalDiscordId ?? ""),
        client.guilds.fetch(PublicDiscordId ?? ""),
    ]);
    if (!internalGuild) {
        throw new Error("Error: internalGuild not found (Invalid ID)");
    }
    if (!publicGuild) {
        throw new Error("Error: publicGuild not found (Invalid ID)");
    }

    const channelFetches = channelConfigs.map(config => client.channels.fetch(config.id ?? ""));
    const channelRaws = await Promise.all(channelFetches);

    const channels: Record<string, TextChannel> = {};
    channelConfigs.forEach((config, index) => {
        channels[config.key] = verifyTextChannel(
            channelRaws[index],
            config.expectedGuildId,
            config.label,
        );
    });

    // Build serverInfo object
    const serverInfo: ServerInfo = {
        publicEventChannel: channels.publicEventChannel,
        internalEventChannel: channels.internalEventChannel,
        internalDiscord: internalGuild,
        publicDiscord: publicGuild,
        internalAuditChannel: channels.internalAuditChannel,
        internalErrorChannel: channels.internalErrorChannel,
    };
    return serverInfo;
}

client.login(process.env.DISCORD_BOT_TOKEN);
