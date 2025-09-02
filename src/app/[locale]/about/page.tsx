import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Button } from "@/components/ui/button";
import Metric from "@/components/Metric";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import TeamMembers from "./TeamMembers";
import { useMemo } from "react";
import { membersData } from "@/app/data/Members";
import WhatWeDoCard from "./WhatWeDoCard";
import { useTranslations } from "next-intl";
import FadeInSection from "@/components/FadeInSection";

import type { Metadata } from "next";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "About | Software Engineering Student Association",
    description: "The about page for the University of Ottawa's SESA.",
    alternates: {
        canonical: "/about",
        languages: {
            en: "/en/about",
            fr: "/fr/about",
        },
    },
    openGraph: {
        title: "About | Software Engineering Student Association",
        description: "The about page for the University of Ottawa's SESA.",
        url: new URL("https://sesa-aegl.ca/about"),
    },
};

export default function About() {
    const memberImages = ["/imgs/team/rolf.webp", "/imgs/team/asad.webp", "/imgs/team/rayen.webp"];
    const beyonSesaCompanies = [
        { src: "/imgs/about/beyond-sesa/dropbox.webp", alt: "Dropbox", width: 75, height: 75 },
        { src: "/imgs/about/beyond-sesa/meta.webp", alt: "Meta", width: 150, height: 75 },
        { src: "/imgs/about/beyond-sesa/cisco.webp", alt: "Cisco", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/amazon.webp", alt: "Amazon", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/google.webp", alt: "Google", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/apple.webp", alt: "Apple", width: 120, height: 75 },
        { src: "/imgs/about/beyond-sesa/shopify.webp", alt: "Shopify", width: 140, height: 75 },
        { src: "/imgs/about/beyond-sesa/ibm.webp", alt: "IBM", width: 100, height: 75 },
    ];

    const codirectors = useMemo(
        () => membersData.filter(member => member.team === "Co-directors"),
        [],
    );
    const development = useMemo(
        () => membersData.filter(member => member.team === "Development"),
        [],
    );
    const communications = useMemo(
        () => membersData.filter(member => member.team === "Communications"),
        [],
    );
    const partnership = useMemo(
        () => membersData.filter(member => member.team === "Partnership"),
        [],
    );
    const events = useMemo(() => membersData.filter(member => member.team === "Events"), []);
    const academic = useMemo(() => membersData.filter(member => member.team === "Academic"), []);
    const advisors = useMemo(() => membersData.filter(member => member.team === "Advisors"), []);

    const t = useTranslations("about");
    const tWhatWeDo = useTranslations("about.what_do_we_do_cards");
    const tOurTeam = useTranslations("about.introducing_our_team_section");

    return (
        <div className="min-h-screen text-white">
            <div className="container relative mx-auto max-w-7xl px-4 py-8">
                {/* Decorations */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                    <Image
                        className="fade-left-bottom absolute right-[-12rem] top-[-10rem] z-[-1] h-[60rem] w-[60rem]"
                        src="/decoration/double-tunnel.svg"
                        width={913}
                        height={909}
                        alt=""
                    />
                    <Image
                        className="absolute right-[-6rem] top-[4rem] hidden h-[15rem] w-[15rem] md:block"
                        src="/decoration/star.svg"
                        width={196}
                        height={197}
                        alt=""
                    />
                    <Image
                        className="absolute right-[-6rem] top-[12rem] h-[6rem] w-[6rem] rotate-[40deg]"
                        src="/decoration/star-faded.svg"
                        width={79}
                        height={80}
                        alt=""
                    />
                    <Image
                        className="absolute right-[23rem] top-[24rem] h-[8rem] w-[8rem] rotate-[-15deg]"
                        src="/decoration/star.svg"
                        width={196}
                        height={197}
                        alt=""
                    />
                </div>
                {/* Upper area */}
                <FadeInSection>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 font-heading text-base uppercase md:text-lg">
                            <p className="fill-gradient px-2 py-0.5">{t("partner")}</p>
                            <p>{t("faculty_of_eng")}</p>
                        </div>
                        <h1 className="max-w-96 font-heading text-3xl uppercase md:text-4xl">
                            {t("inspiring_heading")}
                        </h1>
                        <p className="max-w-[28rem] text-base text-thistle md:text-lg">
                            {t("inspiring_blurb")}
                        </p>
                        <div className="my-2 flex flex-col items-start gap-2 font-heading uppercase">
                            <div>
                                <Button className="font-heading uppercase" asChild>
                                    <a href="#introducing-our-team">{t("meet_the_team")}</a>
                                </Button>
                                <Button
                                    className="ml-2 font-heading uppercase"
                                    variant="outline"
                                    asChild
                                >
                                    <a href="https://linktr.ee/uottawa.sesa" target="_blank">
                                        {t("join_our_family")}
                                    </a>
                                </Button>
                            </div>
                            <div className="mt-2 flex flex-nowrap items-center">
                                <TeamBadgeStack imgs={memberImages} />
                            </div>
                        </div>
                    </div>
                </FadeInSection>
                {/* Images (TODO) */}
                <FadeInSection>
                    <div className="mt-12 flex justify-center">
                        <Image
                            className="outline-gradient h-[600px] w-[1250px] object-cover"
                            src="/imgs/about/team-1.webp"
                            width={1200}
                            height={600}
                            alt="Team picture"
                        />
                    </div>
                </FadeInSection>
                {/* "Who are we" */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                        <Image
                            className="fade-right-bottom absolute top-[-14rem] z-[-1] h-[55rem] w-[55rem] md:left-[-16rem]"
                            src="/decoration/disc.svg"
                            width={911}
                            height={822}
                            alt=""
                        />
                        <Image
                            className="absolute left-[12rem] top-[3rem] hidden h-[10rem] w-[10rem] rotate-[-15deg] md:block lg:left-[24rem]"
                            src="/decoration/star.svg"
                            width={196}
                            height={197}
                            alt=""
                        />
                        <Image
                            className="absolute left-[4rem] top-[16rem] h-[6rem] w-[6rem] rotate-[5deg]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                    </div>
                    <FadeInSection>
                        <div className="my-8 flex max-w-[28rem] flex-col gap-2 md:ml-[53%] md:mt-28">
                            <p className="color-gradient font-mono">{t("who_are_we")}</p>
                            <h2 className="font-heading text-2xl uppercase md:text-3xl">
                                {t("who_are_we_heading")}{" "}
                                <span className="highlight-text">{t("who_are_we_heading_hl")}</span>
                            </h2>
                            <p className="text-base text-thistle">
                                <b>{t("who_are_we_p1_bold")}</b>, {t("who_are_we_p1")}{" "}
                            </p>
                            <p className="my-2 text-thistle">
                                <b>{t("who_are_we_p2_bold")}</b> {t("who_are_we_p2")}
                            </p>
                            <Button className="w-fit font-heading uppercase" asChild>
                                <a href="#introducing-our-team">{t("meet_the_team")}</a>
                            </Button>
                        </div>
                    </FadeInSection>
                    {/* Figures */}
                    <FadeInSection>
                        <div className="flex justify-center md:mb-28">
                            <div className="grid w-fit grid-cols-1 place-items-center gap-20 md:grid-cols-4">
                                <Metric
                                    className="!w-64 backdrop-blur-lg"
                                    figure="3500+"
                                    caption={t("figure_eecs_students")}
                                    border
                                />
                                <Metric
                                    className="!w-64 backdrop-blur-lg"
                                    figure="21"
                                    caption={t("figure_previous_partners")}
                                    border
                                />
                                <Metric
                                    className="!w-64 backdrop-blur-lg"
                                    figure="2300+"
                                    caption={t("figure_event_attendees")}
                                    border
                                />
                                <Metric
                                    className="!w-64 backdrop-blur-lg"
                                    figure="34"
                                    caption={t("figure_events")}
                                    border
                                />
                            </div>
                        </div>
                    </FadeInSection>
                </div>
                {/* "What do we do" */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                        <Image
                            className="absolute right-0 top-[8rem] h-[8rem] w-[8rem] rotate-[0deg] md:right-[10rem] md:top-[3rem]"
                            src="/decoration/star.svg"
                            width={196}
                            height={197}
                            alt=""
                        />
                        <Image
                            className="absolute right-[10rem] top-[8rem] h-[4rem] w-[4rem] rotate-[30deg]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                    </div>
                    <FadeInSection>
                        <div className="my-8 flex max-w-[28rem] flex-col gap-2">
                            <p className="color-gradient font-mono text-xs md:text-base">
                                {t("what_do_we_do")}
                            </p>
                            <h2 className="whitespace-nowrap font-heading text-2xl uppercase md:text-3xl">
                                {t("what_do_we_do_heading")}{" "}
                                <span className="highlight-text">
                                    {t("what_do_we_do_heading_hl")}
                                </span>
                            </h2>
                            <div>
                                <p className="mb-2 text-base text-thistle md:text-lg">
                                    <b>{t("what_do_we_do_p_bold")}</b> {t("what_do_we_do_p")}
                                </p>
                            </div>
                            <Button className="w-fit font-heading uppercase" asChild>
                                <Link href="/sponsors">{t("become_a_sponsor")} &gt;</Link>
                            </Button>
                        </div>
                    </FadeInSection>
                    {/* Cards for "What do we do" */}
                    <FadeInSection>
                        <div className="mb-8 flex w-full max-w-[28rem] gap-6 md:justify-start">
                            <WhatWeDoCard
                                imageHref="/imgs/about/social-events.webp"
                                icon={
                                    <Image
                                        src="/icons/rocket-plain.svg"
                                        width={24}
                                        height={24}
                                        alt="Rocket icon"
                                    />
                                }
                                heading={tWhatWeDo("social_events_heading")}
                                description={tWhatWeDo("social_events_desc")}
                                linkLabel={tWhatWeDo("social_events_btn")}
                                linkHref="/events"
                            />
                            <WhatWeDoCard
                                imageHref="/imgs/about/academic-support.webp"
                                icon={
                                    <Image
                                        src="/icons/school-plain.svg"
                                        width={24}
                                        height={24}
                                        alt="School icon"
                                    />
                                }
                                heading={tWhatWeDo("academic_support_heading")}
                                description={tWhatWeDo("academic_support_desc")}
                                linkLabel={tWhatWeDo("academic_support_btn")}
                                linkHref="/resources"
                            />
                            <WhatWeDoCard
                                imageHref="/imgs/about/professional-development.webp"
                                icon={
                                    <Image
                                        src="/icons/briefcase-plain.svg"
                                        width={24}
                                        height={24}
                                        alt="Briefcase icon"
                                    />
                                }
                                heading={tWhatWeDo("professional_development_heading")}
                                description={tWhatWeDo("professional_development_desc")}
                                linkLabel={tWhatWeDo("professional_development_btn")}
                                linkHref="/contact"
                            />
                        </div>
                    </FadeInSection>
                </div>
                {/* Introducing our team */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                        <Image
                            className="absolute left-[4rem] top-[-4rem] hidden h-[12rem] w-[12rem] rotate-[-15deg] lg:block"
                            src="/decoration/star.svg"
                            width={196}
                            height={197}
                            alt=""
                        />
                        <Image
                            className="absolute left-[5rem] top-[3.5rem] h-[4rem] w-[4rem]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                        <Image
                            className="absolute right-[2rem] top-[1rem] h-[7rem] w-[7rem] rotate-[30deg]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                    </div>
                    <FadeInSection>
                        <div
                            id="introducing-our-team"
                            className="align-center flex scroll-mt-28 flex-col items-center gap-2 text-center md:mt-28"
                        >
                            <p className="color-gradient font-mono text-xs md:text-base">
                                {t("introducing_our_team")}
                            </p>
                            <h2 className="font-heading text-2xl uppercase md:text-3xl">
                                <span className="highlight-text">
                                    {t("introducing_our_team_heading_hl")}
                                </span>{" "}
                                {t("introducing_our_team_heading")}
                            </h2>
                            <p className="max-w-[32rem] text-base leading-tight text-thistle md:text-lg">
                                {t("introducing_our_team_blurb")}
                            </p>
                        </div>
                    </FadeInSection>
                    {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                    <FadeInSection>
                        <div className="top-[5.6rem] z-10 mt-4 grid grid-flow-col grid-rows-4 text-center font-heading uppercase backdrop-blur-sm md:grid-rows-1">
                            <Button className="!inline !px-2" variant="outline" asChild>
                                <Link href="#co-directors">{tOurTeam("codirectors")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#partnerships">{tOurTeam("partnerships")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#events">{tOurTeam("events")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#communications">{tOurTeam("communications")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#development">{tOurTeam("development")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#academic">{tOurTeam("academic")}</Link>
                            </Button>
                            <Button className="!inline" variant="outline" asChild>
                                <Link href="#advisors">{tOurTeam("advisors")}</Link>
                            </Button>
                        </div>
                        <br />
                    </FadeInSection>
                </div>
                {/* TODO: Add horizontal scrolling if the members don't all fit onscreen. */}
                <div className="mt-16 flex flex-col gap-24">
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("codirectors")}
                            description={tOurTeam("codirectors_desc")}
                            people={codirectors}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("partnerships")}
                            description={tOurTeam("partnerships_desc")}
                            people={partnership}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("events")}
                            description={tOurTeam("events_desc")}
                            people={events}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("communications")}
                            description={tOurTeam("communications_desc")}
                            people={communications}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("development")}
                            description={tOurTeam("development_desc")}
                            people={development}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("academic")}
                            description={tOurTeam("academic_desc")}
                            people={academic}
                        />
                    </FadeInSection>
                    <FadeInSection>
                        <TeamMembers
                            title={tOurTeam("advisors")}
                            description={tOurTeam("advisors_desc")}
                            people={advisors}
                        />
                    </FadeInSection>
                </div>
                {/* Beyond SESA */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                        <Image
                            className="fade-from-center-sponsorship-floor absolute left-0 right-0 z-[-1] me-auto ms-auto w-auto"
                            src="/decoration/globe.svg"
                            width={740}
                            height={741}
                            alt=""
                        />
                        <Image
                            className="absolute left-[4rem] top-[4rem] hidden h-[12rem] w-[12rem] rotate-[-15deg] lg:block"
                            src="/decoration/star.svg"
                            width={196}
                            height={197}
                            alt=""
                        />
                        <Image
                            className="absolute left-[10rem] top-[3rem] h-[6rem] w-[6rem] rotate-[15deg]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                        <Image
                            className="absolute right-[15rem] top-[6.5rem] h-[7rem] w-[7rem] rotate-[25deg]"
                            src="/decoration/star-faded.svg"
                            width={79}
                            height={80}
                            alt=""
                        />
                    </div>
                    <FadeInSection>
                        <div className="align-center mt-24 flex flex-col items-center gap-3 text-center">
                            <p className="color-gradient font-mono text-xs md:text-base">
                                {t("our_previous_partners")}
                            </p>
                            <h2 className="font-heading text-2xl uppercase md:text-3xl">
                                <span className="highlight-text">
                                    {t("our_previous_partners_heading_hl")}
                                </span>
                            </h2>
                            <p className="max-w-[32rem] text-base leading-snug text-thistle md:text-lg">
                                <b>{t("our_previous_partners_p_bold")}</b>,{" "}
                                {t("our_previous_partners_p")}{" "}
                            </p>
                            <div className="mt-10 flex items-center justify-center text-center backdrop-blur-lg">
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                                    {beyonSesaCompanies.map((company, i) => (
                                        <div
                                            className="outline-gradient flex h-36 w-64 items-center justify-center"
                                            key={`partners:${i}`}
                                        >
                                            <Image
                                                src={company.src}
                                                width={company.width}
                                                height={company.height}
                                                alt={company.alt}
                                                className="max-w-[150px] brightness-0 invert filter"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </div>
            {/* Be a part of our family */}
            <div className="relative">
                {/* Decorations */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full select-none">
                    <Image
                        className="absolute bottom-[-8rem] left-[35rem] hidden h-[12rem] w-[12rem] rotate-[-15deg] lg:block"
                        src="/decoration/star.svg"
                        width={196}
                        height={197}
                        alt=""
                    />
                    <Image
                        className="absolute bottom-[-9rem] left-[43rem] hidden h-[6rem] w-[6rem] rotate-[20deg] lg:block"
                        src="/decoration/star-faded.svg"
                        width={79}
                        height={80}
                        alt=""
                    />
                </div>
                <FadeInSection>
                    <section className="relative my-10 flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 text-white md:my-32 md:flex-row md:justify-between md:ps-32 2xl:ps-96">
                        {/* Grid Gradient Back */}
                        <div className="grid-overlay-right md:h-[43.93rem] md:w-[53vw]"></div>

                        {/* Content Container */}
                        <div className="relative z-10 max-w-2xl px-4 md:px-0">
                            <p className="color-gradient font-mono text-xs md:text-base">
                                {t("our_family")}
                            </p>
                            <h2 className="mt-4 max-w-[28rem] font-heading text-2xl uppercase leading-tight md:text-3xl">
                                {t("our_family_heading")}{" "}
                                <span className="highlight-text">{t("our_family_heading_hl")}</span>
                            </h2>
                            <p className="mt-4 max-w-[28rem] font-sans text-base text-thistle md:text-lg">
                                <b>{t("our_family_p_bold")}</b>. {t("our_family_p")}
                            </p>
                            <div className="mt-6 flex flex-col space-y-2 font-heading">
                                <Button
                                    className="pointer-events-none my-4 w-fit cursor-not-allowed font-heading uppercase opacity-50"
                                    disabled
                                    asChild
                                >
                                    <Link href="/contact">{t("apply_now")}</Link>
                                </Button>
                                <p className="max-w-[28rem] font-mono text-sm text-thistle">
                                    {t("no_more_apps")}
                                </p>
                            </div>
                        </div>

                        {/* Right Side Image - Centered on mobile, touches right edge on desktop */}
                        <div className="relative z-10">
                            <Image
                                src="/imgs/about/team-1.webp"
                                alt="Team picture"
                                className="outline-gradient h-[400px] w-auto object-cover md:h-[500px]"
                                width={700}
                                height={500}
                            />
                        </div>
                    </section>
                </FadeInSection>
            </div>
        </div>
    );
}
