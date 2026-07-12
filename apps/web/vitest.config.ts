import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node",
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/*.test.ts"],
        // NODE_ENV=production disables tRPC's artificial 100-500ms dev delay
        // in timingMiddleware (see src/server/api/trpc.ts) and its per-call logging.
        env: { NODE_ENV: "production" },
    },
    resolve: {
        alias: { "@": new URL("./src", import.meta.url).pathname },
    },
});
