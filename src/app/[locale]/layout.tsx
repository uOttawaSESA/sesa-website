import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
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
        metadataBase: new URL("https://sesa-aegl.ca"),
        openGraph: {
            title,
            siteName: title,
            description,
            type: "website",
            url: new URL("https://sesa-aegl.ca"),
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

    return (
        <html lang={locale}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} bg-linear-to-b from-0% from-gray-100 via-10% via-[#381e4b] to-gray-100 font-sans antialiased`}
                style={{
                    backgroundImage: `url('/decoration/noise-texture.svg'), linear-gradient(to bottom, #1b1b1b 0%, #381e4b 10%, #1b1b1b 100%)`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "cover",
                }}
            >
                <NextIntlClientProvider>
                    <TRPCReactProvider>
                        <NuqsAdapter>
                            <div className="overflow-x-hidden">
                                <Navbar />
                                <main>
                                    {children}
                                    <Analytics />
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
