import {
    type Guild,
    GuildScheduledEventEntityType,
    GuildScheduledEventPrivacyLevel,
    type TextChannel,
} from "discord.js";
import type { Event, ServerInfo } from "../type";
import { formatDate } from "../utils/dateFormater";

/**
 * New Event Handler:
 * - Make announcement in the public Discord Server
 * - Create an Discord event in the public Discord Server
 * - Make announcement in internal server to verify attendance
 * @param eventData Event Data Fetched from the database
 * @param serverInfo All validated Discord information (Ids of servers, channels,)
 * @returns
 */
export async function newEvent(eventData: Event, serverInfo: ServerInfo) {
    await sendAnnouncement(eventData, serverInfo.publicEventChannel);
    await createEvent(eventData, serverInfo.publicDiscord);
    //TODO: Check if we want to create a scheduled event in the internal server as well

    await internalAnnouncement(eventData, serverInfo.internalEventChannel);
}

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
 * @param eventData
 * @param guild
 * @returns
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
 * @param eventData
 * @returns
 */
function getAnnouncementMessage(eventData: Event): string {
    const content = `
@everyone

## 📣 ${eventData.title}

${eventData.description}

📅 **When**: ${formatDate(eventData)}

📍 **Where**: ${eventData.location}

📝 **Register**: ${eventData.registrationUrl}
`;

    return content;
}

/**
 * Send a custom announcement in the internal server to verify attendance
 * @param eventData
 * @param channel Internal Announcement Channel
 */
async function internalAnnouncement(eventData: Event, channel: TextChannel) {
    const internalAnnouncement = `
@everyone

We're hosting a new event! 

When: ${formatDate(eventData)}

For more info check the announcement: https://discord.com/channels/1011095131144863794/1011095132168257598

Please React ✅ if you will be attending.
    `;
    const message = await channel.send({
        content: internalAnnouncement,
        flags: ["SuppressEmbeds"],
    });

    await message.react("✅");
}
