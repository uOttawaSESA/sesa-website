import express from "express";
import { newLog } from "./handlers/AuditLog";
import { newEvent } from "./handlers/events";
import { syncMemberRoles } from "./handlers/roleSync/syncMemberRoles";
import type { ServerInfo } from "./types";

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
        try {
            const eventData = req.body;
            await newEvent(eventData, serverInfo);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to announce event", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.post("/sync-member", async (req, res) => {
        try {
            const memberData = req.body;
            await syncMemberRoles(memberData, serverInfo.internalDiscord);
            await syncMemberRoles(memberData, serverInfo.publicDiscord);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to sync member roles", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.post("/audit", async (req, res) => {
        try {
            const log = req.body;
            await newLog(log, serverInfo.internalAuditChannel);
            res.json({ ok: true });
        } catch (error) {
            console.error("Failed to create audit log", error);
            return res.status(500).json({ ok: false, error: "Internal Server Error" });
        }
    });

    app.listen(3001, () => console.log("Internal bot server on :3001"));
}
