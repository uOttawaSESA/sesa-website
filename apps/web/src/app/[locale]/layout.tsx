import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import "./globals.css";
import "@repo/ui/shadcn.css";
import { Button } from "@repo/ui/components/button";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { routing } from "@/i18n/routing";
import { TRPCReactProvider } from "@/trpc/react";

// Load fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = t("title_suffix");
    const description = t("default_description");

    // Arrays not supported by next-intl
    const keywords = {
        en: ["uottawa", "sesa", "software", "students", "engineering"],
        fr: ["uottawa", "aegl", "logiciel", "étudiants", "génie"],
    };

    return {
        title,
        description,
        keywords: keywords[locale as "en" | "fr"],
        metadataBase: new URL("https://www.sesa-aegl.ca"),
        openGraph: {
            title,
            siteName: title,
            description,
            type: "website",
            url: new URL("https://www.sesa-aegl.ca"),
            images: "/imgs/about/team-1.webp",
        },
        icons: [
            {
                url: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                url: "/logo-filled.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    const t = await getTranslations("navigation");

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} bg-linear-to-b from-0% from-gray-100 via-10% via-[#381e4b] to-gray-100 font-sans antialiased`}
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, #1b1b1b 0%, #381e4b 10%, #1b1b1b 100%)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "cover",
                }}
            >
                <NextIntlClientProvider>
                    <TRPCReactProvider>
                        <NuqsAdapter>
                            <div className="overflow-x-hidden">
                                <Button
                                    asChild
                                    className="sr-only absolute focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-6 focus:py-3 focus:text-white focus:outline-2 focus:outline-white"
                                >
                                    <a href="#main-content">{t("skip_to_content")}</a>
                                </Button>
                                <Navbar />
                                <main id="main-content" tabIndex={-1}>
                                    {children}
                                    <Analytics />
                                    <SpeedInsights />
                                </main>
                                <Footer />
                            </div>
                        </NuqsAdapter>
                    </TRPCReactProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
