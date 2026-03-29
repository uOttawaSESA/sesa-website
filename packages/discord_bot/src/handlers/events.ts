import {
    type Guild,
    GuildScheduledEventEntityType,
    GuildScheduledEventPrivacyLevel,
    type TextChannel,
} from "discord.js";
import type { ServerInfo } from "../type";
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
export async function newEvent(eventData: any, serverInfo: ServerInfo) {
    await sendAnnouncement(eventData, serverInfo.publicEventChannel);
    await createEvent(eventData, serverInfo.publicDiscord);

    await internalAnnouncement(eventData, serverInfo.internalEventChannel);
}

async function sendAnnouncement(eventData: any, channel: TextChannel) {
    const message = await channel.send({
        content: getAnnouncementMessage(eventData),
    });
    await message.react("🔥")
}

async function createEvent(eventData: any, guild: Guild) {
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
 * Function which will get the correct event Announcement message
 * @param eventData 
 * @returns 
 */
function getAnnouncementMessage(eventData: any): string {
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
 * Send an announcement in the internal server to let members know and see who will be attending the event.
 * @param eventData
 * @param channel Internal Announcement Channel
 */
async function internalAnnouncement(eventData: any, channel: TextChannel) {
    const internalAnnouncement = `
@everyone

We're hosting a new event! 

When: ${formatDate(eventData)}

For more info check the announcement: https://discord.com/channels/1011095131144863794/1011095132168257598

Please React ✅ if you will be attending.
    `;
    const message = await channel.send({
        content: internalAnnouncement,
    });

    await message.react("✅");
}