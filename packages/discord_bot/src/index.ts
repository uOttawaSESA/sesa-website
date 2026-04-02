import "dotenv/config";
import { Client, GatewayIntentBits, type TextChannel } from "discord.js";
import {
    INTERNAL_AUDIT_CHANNEL_ID,
    INTERNAL_ERROR_CHANNEL_ID,
    INTERNAL_EVENT_CHANNEL_ID,
    INTERNAL_GUILD_ID,
    PUBLIC_EVENT_CHANNEL_ID,
    PUBLIC_GUILD_ID,
} from "./config";
import { newEvent } from "./handlers/events";
import { startServer } from "./server";
import type { ServerInfo } from "./type";

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
            type: "Networking Event",
            description:
                "Ever wondered what it’s like to work at Microsoft, Google, Meta, Apple, Amazon, Dropbox, Datadog, DoorDash, Shopify, and more?\n\n  👀 We’re bringing together speakers from these leading companies for an exclusive Career Panel covering roles in Software Development, Project Management, and UI/UX Design.\n\n  🎤 Special guest: Aidan Ouckama (CS content creator) will be sharing insights on navigating the tech world and growing your career.\n \n 💡 This is your chance to ask questions, hear real experiences, and learn what it takes to succeed in top-tier tech roles.",
            location: "STM 117",
            registrationUrl: "https://linktr.ee/uottawa.sesa",
            startTime: new Date(Date.now() + 60 * 60 * 1000),
            endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            image: "https://www.sesa-aegl.ca/_next/image?url=https%3A%2F%2Fdkfgekwffkyxixrsgaml.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fevents_images%2F2025-10-07%2Fcareer-panel.png&w=750&q=75",
        },
        serverInfo,
    );

    // const role = "lead"; // lead // member
    // const team: TeamKey = "development"; //codirectors //partnerships //communications // development
    // console.log(serverInfo.internalDiscord);
    // syncMemberRoles(
    //     { discordId: "190594925086244864", teamKey: team, roleKey: role },
    //     serverInfo.internalDiscord,
    // );
    // syncMemberRoles(
    //     { discordId: "190594925086244864", teamKey: team, roleKey: role },
    //     serverInfo.publicDiscord,
    // );
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
            id: PUBLIC_EVENT_CHANNEL_ID,
            expectedGuildId: PUBLIC_GUILD_ID,
            label: "PublicEventChannelId",
        },
        {
            key: "internalEventChannel",
            id: INTERNAL_EVENT_CHANNEL_ID,
            expectedGuildId: INTERNAL_GUILD_ID,
            label: "InternalEventChannelId",
        },
        {
            key: "internalAuditChannel",
            id: INTERNAL_AUDIT_CHANNEL_ID,
            expectedGuildId: INTERNAL_GUILD_ID,
            label: "InternalAuditChannelId",
        },
        {
            key: "internalErrorChannel",
            id: INTERNAL_ERROR_CHANNEL_ID,
            expectedGuildId: INTERNAL_GUILD_ID,
            label: "InternalErrorChannelId",
        },
    ];

    // Fetch guilds
    const [internalGuild, publicGuild] = await Promise.all([
        client.guilds.fetch(INTERNAL_GUILD_ID ?? ""),
        client.guilds.fetch(PUBLIC_GUILD_ID ?? ""),
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
