import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/** Server-only variables for the public site and the public API routers. */
export const envWebServer = createEnv({
    server: {
        RECAPTCHA_SECRET_KEY: z.string(),
        EMAIL_USER: z.email(),
        EMAIL_PASS: z.string(),
    },
    runtimeEnvStrict: {
        RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
    },
});
