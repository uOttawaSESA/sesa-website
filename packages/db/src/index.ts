import "dotenv/config";
import { envServer } from "@repo/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

/**
 * Cache the database connection in development.
 * This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
    connection: postgres.Sql | undefined;
};

const connection = globalForDb.connection ?? postgres(envServer.POSTGRES_URL, { prepare: false });
if (process.env.NODE_ENV !== "production") globalForDb.connection = connection;

export const db = drizzle(connection, { schema, casing: "snake_case" });
export type Database = typeof db;
