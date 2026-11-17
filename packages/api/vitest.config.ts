import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const src = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
    resolve: {
        // Same mapping as `paths` in tsconfig.json: this package imports itself by name.
        alias: [
            { find: /^@repo\/api$/, replacement: `${src}/index.ts` },
            { find: /^@repo\/api\/(.*)$/, replacement: `${src}/$1` },
        ],
    },
    test: {
        include: ["src/**/*.test.ts"],
        env: {
            // `@repo/db` builds a postgres-js client at import time; it just needs a valid URL.
            POSTGRES_URL: "postgresql://unused@localhost:1/unused",
            // Tests pass their actor explicitly; a developer's impersonation must not leak in.
            ADMIN_IMPERSONATE_MEMBER_ID: "",
        },
        testTimeout: 20_000,
        hookTimeout: 60_000,
    },
});
