import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envClient = createEnv({
    client: {
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
    },
    clientPrefix: "NEXT_PUBLIC_",
    runtimeEnvStrict: {
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    },
});
