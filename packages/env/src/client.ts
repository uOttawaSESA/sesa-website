import { createEnv } from "@t3-oss/env-core";
import { vercel } from "@t3-oss/env-core/presets-zod";
import { z } from "zod";

export const envClient = createEnv({
    client: {
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
        NEXT_PUBLIC_PORT: z.string().default("3000"),
    },
    clientPrefix: "NEXT_PUBLIC_",
    runtimeEnvStrict: {
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    },
    extends: [vercel()],
});
