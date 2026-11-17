/**
 * Local Postgres for development, with no install: PGlite served over the Postgres protocol.
 *
 *   pnpm --filter @repo/db db:local            # start; migrates, and seeds a new database
 *   pnpm --filter @repo/db db:local --reset    # wipe the data first
 *
 * Data persists in `packages/db/.local-db`. Pending migrations are applied on every start. Set
 * `LOCAL_DB_PORT` to change the port (default 5433, to stay clear of a real Postgres on 5432).
 *
 * The printed URL sets `fetch_types=false`: with type fetching on, postgres-js's unprepared
 * statements fail against PGlite ("unnamed prepared statement does not exist") the first time a
 * connection runs a query with enum parameters. Real Postgres does not need it.
 */

import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import { openPglite } from "../src/pglite.js";
import { SEED_MEMBERS, seed } from "../src/seed.js";

const dataDir = fileURLToPath(new URL("../.local-db", import.meta.url));
const port = Number(process.env.LOCAL_DB_PORT ?? 5433);
const host = "127.0.0.1";

if (process.argv.includes("--reset")) rmSync(dataDir, { recursive: true, force: true });
const isNew = !existsSync(dataDir);

const { db, client, close } = await openPglite(dataDir);
if (isNew) {
    await seed(db);
    console.info("Seeded a new local database.");
}

const server = new PGLiteSocketServer({ db: client, host, port, maxConnections: 20 });
await server.start();

console.info(`
Local database ready. In the repo root .env:

    POSTGRES_URL=postgresql://postgres:postgres@${host}:${port}/postgres?fetch_types=false

To act as the seeded co-director lead in the admin panel:

    ADMIN_IMPERSONATE_MEMBER_ID=${SEED_MEMBERS.codirectorsLead.id}

Ctrl+C to stop.`);

const shutdown = async () => {
    await server.stop();
    await close();
    process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
