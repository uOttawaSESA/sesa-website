import express from "express";
import { newLog } from "./handlers/AuditLog";
import { newEvent } from "./handlers/events";
import { syncMemberRoles } from "./handlers/rolySync/syncMemberRoles";
import type { ServerInfo } from "./type";

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
        const eventData = req.body;
        await newEvent(eventData, serverInfo);
        res.json({ ok: true });
    });

    app.post("/sync-member", async (req, res) => {
        const memberData = req.body;
        await syncMemberRoles(memberData, serverInfo.internalDiscord);
        await syncMemberRoles(memberData, serverInfo.publicDiscord);
        res.json({ ok: true });
    });

    app.post("/audit", async (req, res) => {
        const log = req.body;
        await newLog(log, serverInfo.internalAuditChannel);
        res.json({ ok: true });
    });

    app.listen(3001, () => console.log("Internal bot server on :3001"));
}
