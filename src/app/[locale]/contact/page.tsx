import Image from "next/image";
// Precompile i18n
import localeParams from "@/app/data/locales";
import FadeInSection from "@/components/FadeInSection";
import ContactDetails from "./components/ContactDetails";
import ContactForm from "./components/ContactForm";
import type { Metadata } from "next";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Contact | Software Engineering Student Association",
    description: "The contact page for the University of Ottawa's SESA.",
    alternates: {
        canonical: "/contact",
        languages: {
            en: "/en/contact",
            fr: "/fr/contact",
        },
    },
    openGraph: {
        title: "Contact | Software Engineering Student Association",
        description: "The contact page for the University of Ottawa's SESA.",
        url: new URL("https://sesa-aegl.ca/contact"),
    },
};

const Contact: React.FC = () => {
    return (
        <div className="relative min-h-screen">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute -top-10 hidden h-[110vh] w-[90vw] bg-blueviolet-100 bg-opacity-20 blur-sm md:block" />

                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute bottom-[60rem] right-10 rotate-[22deg] transform opacity-60 md:bottom-[32vh] md:left-[33vw] md:block 2xl:bottom-[40vh] 2xl:left-[20vw]"
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
                <div className="relative -bottom-[58rem] h-[60%] overflow-hidden md:-bottom-[30rem] md:left-0 md:block">
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

            <div className="md:pt-26 relative px-8 pb-16 pt-10 font-heading text-white md:px-12 md:pb-20 md:pt-24 lg:px-16 xl:px-24">
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
