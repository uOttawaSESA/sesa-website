import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    dts: false,
    clean: true,
    sourcemap: true,
    splitting: false,
    target: "es2020",
});
