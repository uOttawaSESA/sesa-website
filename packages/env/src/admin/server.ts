import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Server-only variables for the admin panel and the admin API.
 * Auth, Discord and storage secrets go here, never in the web or db schemas.
 */
export const envAdminServer = createEnv({
    server: {
        /**
         * Development only: act as this member on every request, bypassing login. Ignored when
         * `NODE_ENV` is `production`. Must be the id of an active (not retired) member.
         */
        ADMIN_IMPERSONATE_MEMBER_ID: z.uuid().optional(),
    },
    runtimeEnvStrict: {
        ADMIN_IMPERSONATE_MEMBER_ID: process.env.ADMIN_IMPERSONATE_MEMBER_ID,
    },
    emptyStringAsUndefined: true,
});
