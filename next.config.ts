import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    images: {
        domains: ["www.google.com"],
    },
};

export default createNextIntlPlugin()(nextConfig);
