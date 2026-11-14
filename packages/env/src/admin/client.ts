import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

/** Client-safe variables for the admin panel. */
export const envAdminClient = createEnv({
    client: {
        NEXT_PUBLIC_PORT: z.string().default("3001"),
    },
    clientPrefix: "NEXT_PUBLIC_",
    runtimeEnvStrict: {
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    },
    extends: [vercel()],
});
