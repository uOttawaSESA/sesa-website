import { createEnv } from "@t3-oss/env-core";

/**
 * Server-only variables for the admin panel and the admin API.
 * Auth, Discord and storage secrets go here, never in the web or db schemas.
 */
export const envAdminServer = createEnv({
    server: {},
    runtimeEnvStrict: {},
});
