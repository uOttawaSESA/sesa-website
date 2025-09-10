import type { Config } from "drizzle-kit";

const POSTGRES_URL = process.env.POSTGRES_URL;
if (!POSTGRES_URL) throw new Error("Expected POSTGRES_URL env variable.");

export default {
    schema: "./src/server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: { url: POSTGRES_URL },
} satisfies Config;
