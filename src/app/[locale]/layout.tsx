import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { NextIntlClientProvider, hasLocale } from "next-intl";
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
    title: "Software Engineering Student Association",
    description: "The official website for the University of Ottawa's SESA.",
    keywords: ["uottawa", "sesa", "software", "students", "seg"],
    metadataBase: new URL("https://sesa-aegl.ca"), // TBD whether this is the real URL
    openGraph: {
        title: "Software Engineering Student Association",
        siteName: "Software Engineering Student Association",
        description: "The official website for the University of Ottawa's SESA.",
        type: "website",
        url: new URL("https://sesa-aegl.ca"),
        // Should be changed, this is a random pic and I'm not even sure OG works with WebP?
        images: "/imgs/about/team-1.webp",
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    // Ensure that the incoming `locale` is valid
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
                    // backgroundPosition: "center",
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
