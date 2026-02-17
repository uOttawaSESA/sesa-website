import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envServer = createEnv({
    server: {
        POSTGRES_URL: z.url(),
        RECAPTCHA_SECRET_KEY: z.string(),
        EMAIL_USER: z.email(),
        EMAIL_PASS: z.string(),
    },
    runtimeEnvStrict: {
        POSTGRES_URL: process.env.POSTGRES_URL,
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
    },
});
