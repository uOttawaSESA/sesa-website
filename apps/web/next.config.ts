import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    transpilePackages: ["@repo/ui", "@repo/env"],
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
    // Biome is used for linting, not ESLint
    eslint: { ignoreDuringBuilds: true },
};

export default createNextIntlPlugin()(nextConfig);
