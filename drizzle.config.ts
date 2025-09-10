import type { Config } from "drizzle-kit";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("Expected DATABASE_URL env variable.");

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: { url: DATABASE_URL },
} satisfies Config;
