import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.google.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    // Biome is used for linting, not ESLint
    eslint: { ignoreDuringBuilds: true },
};

export default createNextIntlPlugin()(nextConfig);
