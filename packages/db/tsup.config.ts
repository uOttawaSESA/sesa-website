import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts", "src/schema.ts", "src/types.ts", "src/seed.ts", "src/pglite.ts"],
    outDir: "dist",
    // Both ESM & CJS for Next.js compatibility
    format: ["esm", "cjs"],
    // PGlite is a dev dependency, used only by tests and the local database; never bundle it.
    external: ["@electric-sql/pglite"],
    // `pglite.ts` uses `import.meta.url`, which the CJS build needs shimmed.
    shims: true,
    dts: false,
    clean: true,
    sourcemap: true,
    splitting: false,
    target: "es2020",
});
