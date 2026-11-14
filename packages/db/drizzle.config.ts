import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { envDb } from "@repo/env/db";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/schema.ts",
    out: "./drizzle",
    casing: "snake_case",
    dbCredentials: {
        url: envDb.POSTGRES_URL,
    },
});
