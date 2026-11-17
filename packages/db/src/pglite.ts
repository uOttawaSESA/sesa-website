/**
 * In-process Postgres (PGlite) with the schema migrated, for tests and the local database. Needs
 * no install. Never imported by the apps.
 */

import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { pg_trgm } from "@electric-sql/pglite/contrib/pg_trgm";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "./schema.js";
import type { Database } from "./types.js";

/** `packages/db/drizzle`, resolved from both `src/` and `dist/`. */
const migrationsFolder = fileURLToPath(new URL("../drizzle", import.meta.url));

export type PgliteHandle = {
    db: Database;
    client: PGlite;
    close: () => Promise<void>;
};

/**
 * Open a PGlite database and apply every migration in `packages/db/drizzle`.
 *
 * @param dataDir Directory to persist to. Omit for an in-memory database.
 */
export const openPglite = async (dataDir?: string): Promise<PgliteHandle> => {
    const client = await PGlite.create({ dataDir, extensions: { pg_trgm } });
    // Supabase has pg_trgm installed already, so no migration creates it.
    await client.exec("CREATE EXTENSION IF NOT EXISTS pg_trgm;");
    const db = drizzle(client, { schema, casing: "snake_case" });
    await migrate(db, { migrationsFolder });
    return { db, client, close: () => client.close() };
};
