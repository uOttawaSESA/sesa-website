import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        db: "src/db.ts",
        "web/server": "src/web/server.ts",
        "web/client": "src/web/client.ts",
        "admin/server": "src/admin/server.ts",
        "admin/client": "src/admin/client.ts",
    },
    outDir: "dist",
    // Both ESM & CJS for Next.js compatibility
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    sourcemap: true,
    splitting: false,
    target: "es2020",
});
