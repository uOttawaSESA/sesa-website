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
};

export default createNextIntlPlugin()(nextConfig);
