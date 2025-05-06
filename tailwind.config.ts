import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backdropBlur: {
                super: "500px",
            },

            colors: {
                gray: {
                    "100": "#1b1b1b",
                    "200": "rgba(0, 0, 0, 0)",
                    "300": "rgba(27, 27, 27, 0.05)",
                },
                thistle: "#ab9db6",
                white: "#fff",
                blueviolet: {
                    "100": "#8824dc",
                    "200": "rgba(136, 36, 220, 0.5)",
                    "700": "#6A0DAD",
                },
                darkorchid: {
                    "100": "#9e22ba",
                    "200": "#9f22b8",
                    "300": "#701bb7",
                },
                black: "#000",
                darkmagenta: "#ac1fa0",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
            borderRadius: {
                "8xs": "5px",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
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
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
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
                "accordion-down": {
                    from: {
                        height: "0",
                    },
                    to: {
                        height: "var(--radix-accordion-content-height)",
                    },
                },
                "accordion-up": {
                    from: {
                        height: "var(--radix-accordion-content-height)",
                    },
                    to: {
                        height: "0",
                    },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
