import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Load fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SESA Website",
    description: "Created by the amazing developers at SESA!",
};
const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} bg-[#1b1b1b] bg-gradient-to-b from-[#1b1b1b] to-[#381e4b] font-sans antialiased`}
            >
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
