/**
 * Insert the fixture data from `src/seed.ts` into the database at `POSTGRES_URL`. Only for local
 * databases: refuses any host other than localhost. `db:local` already seeds a new database, so
 * this is for a Postgres you run yourself.
 */

import "dotenv/config";
import { envDb } from "@repo/env/db";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/schema.js";
import { seed } from "../src/seed.js";

const { hostname } = new URL(envDb.POSTGRES_URL);
if (!["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname)) {
    console.error(`Refusing to seed ${hostname}: db:seed only runs against a local database.`);
    process.exit(1);
}

const connection = postgres(envDb.POSTGRES_URL, { prepare: false, max: 1 });
try {
    await seed(drizzle(connection, { schema, casing: "snake_case" }));
    console.info("Seeded.");
} finally {
    await connection.end();
}
