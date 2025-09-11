import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("thank_you_title")} | ${t("title_suffix")}`;
    const description = t("thank_you_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/thank_you`,
            languages: {
                en: "/en/thank_you",
                fr: "/fr/thank_you",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://sesa-aegl.ca/thank_you"),
        },
    };
}

const ThankYou = () => {
    return (
        <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-24 text-center mb-56 md:mb-32 2xl:mb-20">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute -top-10 hidden h-[110vh] w-[90vw] bg-blueviolet-100 bg-opacity-20 blur-sm md:block" />

                <Star
                    variant="star-faded"
                    className="absolute 2xl:bottom-[40vh] 2xl:left-[20vw] md:bottom-[20vh] md:left-[33vw] bottom-[60rem]"
                    rotate={22}
                    width={55}
                    height={55}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="absolute hidden md:left-[25rem] md:top-[35rem] md:block md:h-max"
                    rotate={-10}
                    width={120}
                    height={120}
                    delay={1}
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
                    <Link href="/sponsors">Browse Sponsors</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
};

export default ThankYou;
