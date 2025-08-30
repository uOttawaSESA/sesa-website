import { Button } from "@/components/ui/button";

// Precompile i18n
import localeParams from "@/app/data/locales";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Thank You | Software Engineering Student Association",
    description: "Thank you for contacting the Software Engineering Student Association!",
    alternates: {
        canonical: "/thank_you",
        languages: {
            en: "/en/thank_you",
            fr: "/fr/thank_you",
        },
    },
    openGraph: {
        title: "Thank You | Software Engineering Student Association",
        description: "Thank you for contacting the Software Engineering Student Association!",
        url: new URL("https://sesa-aegl.ca/thank_you"),
    },
};

const ThankYou = () => {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
            <div className="mb-6 flex flex-row items-center gap-4">
                <span className="bg-gradient-to-r from-[#8824dc] to-[#b1219d] px-3 py-1 font-heading text-base uppercase text-white">
                    Success
                </span>
                <span className="font-heading text-base uppercase tracking-widest text-white">
                    Message Successfully Received
                </span>
            </div>
            <h1 className="mb-4 font-heading text-4xl uppercase text-white">
                <span className="highlight-text">Thank you</span> for reaching out!
            </h1>
            <p className="font-raleway mb-8 max-w-xl text-lg text-thistle">
                We’ll get back to you within 48 hours. In the meantime, check out our amazing
                sponsors who make SESA possible.
            </p>
            <div className="mb-12 flex flex-col justify-center gap-4 text-white sm:flex-row">
                <Button asChild>
                    <Link href="/sponsors">
                        Browse Sponsors <span className="text-white">{`>`}</span>
                    </Link>
                </Button>
                <Button variant="outline">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default ThankYou;
