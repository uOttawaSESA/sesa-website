import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    // Don't generate AGENTS.md/CLAUDE.md on `next dev`
    agentRules: false,
    experimental: {
        // TypeScript 7 has no JS compiler API, so type-check via the CLI
        useTypeScriptCli: true,
    },
    transpilePackages: ["@repo/ui", "@repo/env", "@repo/db", "@repo/api"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.google.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "dkfgekwffkyxixrsgaml.supabase.co",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default createNextIntlPlugin()(nextConfig);
