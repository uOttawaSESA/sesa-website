import { Button } from "@/components/ui/button";
import Image from "next/image";

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
        <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute -top-10 hidden h-[110vh] w-[90vw] bg-blueviolet-100 bg-opacity-20 blur-sm md:block" />

                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute bottom-[60rem] right-10 rotate-[22deg] transform opacity-60 md:bottom-[32vh] md:left-[27vw] md:block 2xl:bottom-[40vh] 2xl:left-[20vw]"
                    width={55}
                    height={55}
                    alt=""
                />

                <Image
                    src="/decoration/star.svg"
                    className="absolute hidden rotate-[-10deg] opacity-70 md:left-[25rem] md:top-[35rem] md:block md:h-max md:opacity-100"
                    width={120}
                    height={120}
                    alt=""
                />
                <div className="relative -bottom-[35rem] h-[60%] overflow-hidden md:-bottom-[30rem] md:left-0 md:block">
                    <Image
                        src="/decoration/globe.svg"
                        className="fade-from-top-bottom-bg-globe opacity-50 md:opacity-80"
                        width={500}
                        height={500}
                        alt=""
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
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
            <p className="font-raleway mb-8 max-w-xl text-base text-thistle md:text-lg">
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
