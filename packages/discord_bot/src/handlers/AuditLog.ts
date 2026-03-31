import type { TextChannel } from "discord.js";

//TODO: Verify what kind of log we can get
export async function newLog(log: any, auditChannel: TextChannel) {
    const message =
        `**${log.action}** by ${log.user} at ${new Date(log.timestamp).toLocaleString()}` +
        `\nDetails:\n

  \`\`\`
${JSON.stringify(log, null, 2)}
\`\`\`
      `;

    await auditChannel.send({ content: message });
}
