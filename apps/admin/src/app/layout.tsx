import type { Metadata } from "next";
import "./globals.css";
import "@repo/ui/shadcn.css";

export const metadata: Metadata = {
    title: "SESA Admin",
    robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
