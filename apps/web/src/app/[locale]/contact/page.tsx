import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import Star from "@/components/decorations/star";
import FadeInSection from "@/components/FadeInSection";
import ContactDetails from "./components/ContactDetails";
import ContactForm from "./components/ContactForm";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("contact_title")} | ${t("title_suffix")}`;
    const description = t("contact_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/contact`,
            languages: {
                en: "/en/contact",
                fr: "/fr/contact",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://www.sesa-aegl.ca/contact"),
        },
    };
}

const Contact: React.FC = () => {
    return (
        <div className="relative mb-20 min-h-screen">
            {/* Decorations */}
            <div className="pointer-events-none absolute">
                {/* Light gradient */}
                <div className="fade-from-left-bg -top-10 absolute hidden h-[110vh] w-[90vw] bg-blueviolet-100/20 blur-xs md:block" />

                <Star
                    variant="star"
                    className="absolute bottom-[60rem] md:bottom-[32vh] md:left-[33vw] 2xl:bottom-[40vh] 2xl:left-[20vw]"
                    width={55}
                    height={55}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="absolute md:top-[35rem] md:left-[25rem] md:h-max"
                    rotate={-10}
                    width={120}
                    height={120}
                    delay={1}
                />

                <div className="-bottom-[58rem] md:-bottom-[30rem] relative h-[60%] overflow-hidden md:left-0 md:block">
                    <Image
                        src="/decoration/globe.svg"
                        className="fade-from-top-bottom-bg-globe opacity-30 md:opacity-80"
                        width={500}
                        height={500}
                        alt=""
                    />
                </div>
            </div>

            <div className="absolute inset-0" />

            <div className="relative px-8 pt-10 pb-16 font-heading text-white md:px-12 md:pt-24 md:pt-26 md:pb-20 lg:px-16 xl:px-24">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 md:flex-row md:gap-16">
                    <FadeInSection>
                        <div className="flex flex-1 justify-center">
                            <ContactDetails />
                        </div>
                    </FadeInSection>
                    <FadeInSection>
                        <div className="flex-1">
                            <ContactForm />
                        </div>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
};

export default Contact;
