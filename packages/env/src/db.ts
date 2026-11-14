import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/** Database connection, used by `@repo/db` and `drizzle-kit`. */
export const envDb = createEnv({
    server: {
        POSTGRES_URL: z.url(),
    },
    runtimeEnvStrict: {
        POSTGRES_URL: process.env.POSTGRES_URL,
    },
});
