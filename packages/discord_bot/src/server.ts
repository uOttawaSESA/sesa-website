import express from "express";
import { newLog } from "./handlers/AuditLog";
import { newEvent } from "./handlers/events";
import { syncMemberRoles } from "./handlers/roleSync/syncMemberRoles";
import { EventSchema, LogSchema, MemberSchema, type ServerInfo } from "./types";

export function startServer(serverInfo: ServerInfo) {
    const app = express();
    app.use(express.json());

    app.use((req, res, next) => {
        const apiKey = req.headers["x-api-key"];
        if (apiKey !== process.env.BOT_API_KEY) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    });

    app.post("/announce-event", async (req, res) => {
        const eventParser = EventSchema.safeParse(req.body);
        if (!eventParser.success) {
            console.error("Invalid event data", eventParser.error);
            return res.status(400).json({ ok: false, error: "Invalid event data" });
        }

        try {
            await newEvent(eventParser.data, serverInfo);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to announce event", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.post("/sync-member", async (req, res) => {
        const memberParser = MemberSchema.safeParse(req.body);
        if (!memberParser.success) {
            console.error("Invalid member data", memberParser.error);
            return res.status(400).json({ ok: false, error: "Invalid member data" });
        }

        try {
            const memberData = memberParser.data;
            await syncMemberRoles(memberData, serverInfo.internalDiscord);
            await syncMemberRoles(memberData, serverInfo.publicDiscord);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to sync member roles", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.post("/audit", async (req, res) => {
        const logParser = LogSchema.safeParse(req.body);
        if (!logParser.success) {
            console.error("Invalid log data", logParser.error);
            return res.status(400).json({ ok: false, error: "Invalid log data" });
        }

        try {
            const log = logParser.data;
            await newLog(log, serverInfo.internalAuditChannel);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to create audit log", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.listen(3001, () => console.log("Internal bot server on :3001"));
}
