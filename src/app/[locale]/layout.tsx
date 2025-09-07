import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "./globals.css";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { routing } from "@/i18n/routing";

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

export const metadata: Metadata = {
    title: "Software Engineering Students' Association",
    description: "The official website for the University of Ottawa's SESA.",
    keywords: ["uottawa", "sesa", "software", "students", "seg"],
    metadataBase: new URL("https://sesa-aegl.ca"),
    openGraph: {
        title: "Software Engineering Students' Association",
        siteName: "Software Engineering Students' Association",
        description: "The official website for the University of Ottawa's SESA.",
        type: "website",
        url: new URL("https://sesa-aegl.ca"),
        images: "/imgs/about/team-1.webp",
    },
    icons: [
        {
            media: "(prefers-color-scheme: light)",
            url: "/logo-filled.svg",
            type: "image/svg+xml",
        },
        {
            media: "(prefers-color-scheme: dark)",
            url: "/sesa-logo.svg",
            type: "image/svg+xml",
        },
    ],
};

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
                className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} bg-gradient-to-b from-[#1b1b1b] from-0% via-[#381e4b] via-10% to-[#1b1b1b] font-sans antialiased`}
                style={{
                    backgroundImage: `url('/decoration/noise-texture.svg'), linear-gradient(to bottom, #1b1b1b 0%, #381e4b 10%, #1b1b1b 100%)`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "cover",
                }}
            >
                <NextIntlClientProvider>
                    <div className="overflow-x-hidden">
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
