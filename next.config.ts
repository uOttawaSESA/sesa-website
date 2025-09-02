import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

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
