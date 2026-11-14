import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Don't generate AGENTS.md/CLAUDE.md on `next dev`
    agentRules: false,
    experimental: {
        // TypeScript 7 has no JS compiler API, so type-check via the CLI
        useTypeScriptCli: true,
    },
    transpilePackages: ["@repo/ui"],
};

export default nextConfig;
