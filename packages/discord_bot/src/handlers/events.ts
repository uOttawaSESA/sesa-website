import {
    type Guild,
    GuildScheduledEventEntityType,
    GuildScheduledEventPrivacyLevel,
    type TextChannel,
} from "discord.js";
import type { Event, ServerInfo } from "../types";
import { formatDate } from "../utils/dateFormater";
import { newError } from "./errorHandler";

/**
 * New Event Handler:
 * - Make announcement in the public Discord Server
 * - Create an Discord event in the public Discord Server
 * - Make announcement in internal server to verify attendance
 * @param eventData Event Data Fetched from the database
 * @param serverInfo All validated Discord information (Ids of servers, channels,)
 */
export async function newEvent(eventData: Event, serverInfo: ServerInfo) {
    try {
        await sendAnnouncement(eventData, serverInfo.publicEventChannel);
    } catch (error) {
        await newError("send announcement", "", serverInfo.publicDiscord.name, error);
    }

    try {
        await createEvent(eventData, serverInfo.publicDiscord);
    } catch (error) {
        await newError("create public event", "", serverInfo.publicDiscord.name, error);
    }

    try {
        await createEvent(eventData, serverInfo.internalDiscord);
    } catch (error) {
        await newError("create internal event", "", serverInfo.internalDiscord.name, error);
    }

    try {
        await internalAnnouncement(eventData, serverInfo.internalEventChannel);
    } catch (error) {
        await newError("internal announcement", "", serverInfo.internalDiscord.name, error);
    }
}

/**
 * Send announcement in the public server with the event details and image and react with a 🔥 emoji.
 * @param eventData The event data
 * @param channel Channel to send the announcement
 */
async function sendAnnouncement(eventData: Event, channel: TextChannel) {
    const message = await channel.send({
        content: getAnnouncementMessage(eventData),
        files: [
            {
                attachment: eventData.image,
                name: "event-image.jpg",
            },
        ],
        flags: ["SuppressEmbeds"],
    });

    await message.react("🔥");
}

/**
 * Creates a new scheduled event in the specified guild based on the provided event data.
 */
async function createEvent(eventData: Event, guild: Guild) {
    const description = `
Please see https://discord.com/channels/1011095131144863794/1011095132168257598 for more details.

Registration: ${eventData.registrationUrl}

${getAnnouncementMessage(eventData)}
    `;

    return await guild.scheduledEvents.create({
        name: eventData.title,
        scheduledStartTime: eventData.startTime,
        scheduledEndTime: eventData.endTime,
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: GuildScheduledEventEntityType.External,
        entityMetadata: { location: eventData.location },
        description: description,
        image: eventData.image,
    });
}

/**
 * Function which will get the correct formatted event Announcement message
 */
function getAnnouncementMessage(eventData: Event): string {
    const content = `
@everyone

# 📣 ${eventData.type}: ${eventData.title}

## 📖 **Details**: 

${eventData.description}

### 📅 __When__: ${formatDate(eventData)}

### 📍 __Where__: ${eventData.location}

### 📝 __Register__: ${eventData.registrationUrl}
`;

    return content;
}

/**
 * Send a custom announcement in the internal server to verify attendance with a ✅ reaction.
 * @param eventData The event data
 * @param channel Channel to send the internal announcement
 */
async function internalAnnouncement(eventData: Event, channel: TextChannel) {
    const internalAnnouncement = `
@everyone

## We're hosting a new ${eventData.type}: ${eventData.title}!

### 📅 __When__: ${formatDate(eventData)}

### 📍 __Where__: ${eventData.location}

-# For more information, please check the announcement: https://discord.com/channels/1011095131144863794/1011095132168257598


Please React ✅ if you will be attending.
    `;
    const message = await channel.send({
        content: internalAnnouncement,
        flags: ["SuppressEmbeds"],
    });

    await message.react("✅");
}
