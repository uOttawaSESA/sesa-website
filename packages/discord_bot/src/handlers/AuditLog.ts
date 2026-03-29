import type { TextChannel } from "discord.js";

//TODO: Verify what kind of log we can get
export function newLog(log: any, internalServerInfo: TextChannel) {
  const channel = internalServerInfo;
  const message =
    `**${log.action}** by ${log.user} at ${new Date(log.timestamp).toLocaleString()}` +
    `\nDetails:\n

  \`\`\`
${JSON.stringify(log, null, 2)}
\`\`\`
      `;

  return channel.send({ content: message });
}
