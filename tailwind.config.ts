import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gray: {
                    100: "#1b1b1b",
                    200: "rgba(0, 0, 0, 0)",
                    300: "rgba(27, 27, 27, 0.05)",
                },
                thistle: "#ab9db6",
                white: "#fff",
                blueviolet: {
                    100: "#8824dc",
                    200: "rgba(136, 36, 220, 0.5)",
                    700: "#6A0DAD",
                },
                darkorchid: {
                    100: "#9e22ba",
                    200: "#9f22b8",
                    300: "#701bb7",
                },
                black: "#000",
                darkmagenta: "#ac1fa0",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            borderRadius: {
                "8xs": "5px",
            },
            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "16px",
                xl: "20px",
                inherit: "inherit",
            },
            fontFamily: {
                heading: ["VCR OSD Mono", "ui-monospace", "Courier New", "Courier", "monospace"],
                sans: ["var(--font-raleway)", "Arial", "sans-serif"],
                mono: ["Monocode", "Courier New", "Courier", "monospace"],
            },
            animation: {
                "spin-slow": "spin 30s linear infinite",
                highlight: "highlight 0.5s ease-out 1s forwards",
            },
            keyframes: {
                highlight: {
                    "0%": {
                        width: "0",
                        left: "100%",
                    },
                    "100%": {
                        width: "100%",
                        left: "0",
                    },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
