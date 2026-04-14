import { serverInfo } from "..";

/**
 * Sends an error message to the internal error channel when an error occurs during the role synchronization process.
 * @param action Action being performed when the error occurred
 */
export async function newError(
    action: string,
    discordId: string,
    guildName: string,
    error?: unknown,
) {
    const errorMsg = error instanceof Error ? error.stack || error.message : String(error);
    const user = discordId ? `<@${discordId}>` : "";
    await serverInfo.internalErrorChannel.send({
        content: `Failed ${action} ${user} in discord **${guildName}**. \nError: ${errorMsg} \n`,
    });
}
