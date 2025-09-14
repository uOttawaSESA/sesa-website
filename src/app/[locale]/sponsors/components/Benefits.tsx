"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Benefits() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const t = useTranslations("sponsorships");
    const locale = useLocale();

    const cards = [
        {
            image: "/sponsors-page/benefits-1.webp",
            icon: "/sponsors-page/network.webp",
            title: {
                en: "NETWORK WITH TOP TALENT",
                fr: "RÉSEAUTER AVEC LES MEILLEURS TALENTS",
            },
            description: {
                en: "Connect and recruit highly skilled job-ready students pursuing the field of software engineering at uOttawa.",
                fr: "Connectez-vous et recrutez des étudiants hautement qualifiés et prêts à l'emploi poursuivant le domaine du génie logiciel à l'Université d'Ottawa.",
            },
        },
        {
            image: "/sponsors-page/benefits-2.webp",
            icon: "/sponsors-page/impact.webp",
            title: {
                en: "MAKE A REAL-WORLD IMPACT",
                fr: "FAITES UN IMPACT DANS LE MONDE RÉEL",
            },
            description: {
                en: "Give back to your community and make a meaningful difference in software engineering education at the University of Ottawa.",
                fr: "Redonnez à votre communauté et faites une différence significative dans l'éducation en génie logiciel à l'Université d'Ottawa.",
            },
        },
        {
            image: "/sponsors-page/benefits-3.webp",
            icon: "/sponsors-page/brand.webp",
            title: {
                en: "PROMOTE YOUR BRAND",
                fr: "PROMOUVOIR VOTRE MARQUE",
            },
            description: {
                en: "Increase your brand visibility, survey your target audience, or offer exclusive discounts to students attending uOttawa.",
                fr: "Augmentez la visibilité de votre marque, sondez votre public cible ou offrez des remises exclusives aux étudiants de l'Université d'Ottawa.",
            },
        },
        {
            image: "/sponsors-page/benefits-4.webp",
            icon: "/sponsors-page/connect.svg",
            title: {
                en: "ACCESS EXCLUSIVE EVENTS",
                fr: "ACCÉDEZ À DES ÉVÉNEMENTS EXCLUSIFS",
            },
            description: {
                en: "Participate in workshops, mentorship programs, and networking events tailored for sponsors and students alike.",
                fr: "Participez à des ateliers, des programmes de mentorat et des événements de réseautage conçus pour les commanditaires et les étudiants.",
            },
        },
    ];

    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        updateIsMobile(); // Initial check
        window.addEventListener("resize", updateIsMobile);

        return () => {
            window.removeEventListener("resize", updateIsMobile);
        };
    }, []);

    const cardWidthVW = isMobile ? 60 : 28;

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? cards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === cards.length - 1 ? 0 : prev + 1));
    };

    return (
        // biome-ignore lint/correctness/useUniqueElementIds: Should be human-readable
        <div
            id="benefits"
            className="relative flex min-h-screen flex-col justify-center space-y-5 py-10 md:mb-24 md:py-20"
        >
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-left-bg absolute left-0 h-[70rem] w-full bg-[#B1219D]/15 blur-3xl md:w-[80vw]" />

                <Image
                    src="/decoration/waves.svg"
                    className="fade-from-center-sponsorship-floor absolute left-1/2 hidden w-11/12 -translate-x-1/2 transform md:bottom-10 md:block md:w-max"
                    width={1200}
                    height={280}
                    alt=""
                />
            </div>
            <div className="flex flex-col space-y-6 px-6 md:flex-row md:items-start md:justify-between md:space-y-0 md:px-40">
                <div className="md:w-1/2">
                    <p className="color-gradient relative mb-1 font-mono text-xs md:text-base">
                        {t("benefits_top")}
                    </p>
                    <h2 className="mb-4 font-heading text-2xl uppercase text-white md:text-3xl">
                        <span className="block md:inline">{t("benefits_title_part1")}</span>{" "}
                        <span className="relative inline-block">
                            {t("benefits_title_highlight")}
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,rgba(136,36,220,0.25),rgba(177,33,97,0.25))]"></div>
                        </span>{" "}
                        <span className="block md:inline">{t("benefits_title_part3")}</span>
                    </h2>

                    <p className="max-w-full text-base leading-tight text-thistle md:mb-4 md:max-w-2xl md:text-lg">
                        {t("benefits_description")}
                    </p>
                </div>

                {/* Arrows */}
                <div className="flex translate-y-3 gap-2 self-start md:translate-y-4">
                    <Button size="icon" variant="outline" onClick={handlePrev}>
                        <Image
                            src="/resources-page/arrow_backword.svg"
                            width={25}
                            height={25}
                            alt={t("benefits_arrow_left_alt")}
                        />
                    </Button>
                    <Button size="icon" variant="outline" onClick={handleNext}>
                        <Image
                            src="/resources-page/arrow_forward.svg"
                            width={25}
                            height={25}
                            alt={t("benefits_arrow_right_alt")}
                        />
                    </Button>
                </div>
            </div>
            <div className="relative mt-10 overflow-visible">
                <div
                    className="flex gap-6 pl-6 pr-6 transition-transform duration-500 ease-in-out md:gap-8 md:pl-40 md:pr-40"
                    style={{
                        transform: `translateX(-${currentIndex * cardWidthVW}vw)`,
                    }}
                >
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="shrink-0"
                            style={{
                                width: `${cardWidthVW}vw`,
                            }}
                        >
                            <div className="flex h-full flex-col overflow-hidden border border-solid text-left text-white backdrop-blur-super [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]">
                                <Image
                                    src={card.image}
                                    alt={locale === "fr" ? card.title.fr : card.title.en}
                                    width={500}
                                    height={300}
                                    className="h-40 w-full object-cover md:h-48 2xl:h-96"
                                />
                                <div className="flex grow flex-col justify-between p-4">
                                    <div>
                                        <div className="my-3 inline-block border border-solid [border-image:linear-gradient(55deg,rgba(136,36,220,0.3)_41.93%,rgba(177,33,157,0.3)_81.89%)_1]">
                                            <Image
                                                src={card.icon}
                                                alt={`${locale === "fr" ? card.title.fr : card.title.en} icon`}
                                                width={24}
                                                height={24}
                                                className="m-3"
                                            />
                                        </div>
                                        <div className="mb-2 font-heading text-base uppercase leading-snug text-white md:text-lg">
                                            {locale === "fr" ? card.title.fr : card.title.en}
                                        </div>
                                        <p className="font-sans text-sm leading-snug text-thistle md:text-lg">
                                            {locale === "fr"
                                                ? card.description.fr
                                                : card.description.en}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
