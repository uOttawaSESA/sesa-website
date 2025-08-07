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

// Precompile i18n
import localeParams from "../../data/locales";
export const generateStaticParams = localeParams;

export default function AboutPage() {
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
                {/* Upper area */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-heading text-lg uppercase">
                        <p className="fill-gradient px-2 py-0.5">{t("partner")}</p>
                        <p>{t("faculty_of_eng")}</p>
                    </div>
                    <h1 className="max-w-96 font-heading text-4xl uppercase">
                        {t("inspiring_heading")}
                    </h1>
                    <p className="max-w-[28rem] text-thistle">{t("inspiring_blurb")}</p>
                    <div className="my-2 flex gap-2 font-heading uppercase">
                        <Button className="font-heading uppercase" asChild>
                            <a href="#introducing-our-team">{t("meet_the_team")}</a>
                        </Button>
                        <Button className="font-heading uppercase" variant="outline" asChild>
                            <a href="https://linktr.ee/uottawa.sesa" target="_blank">
                                {t("join_our_family")}
                            </a>
                        </Button>
                    </div>
                    <div className="ml-3 flex flex-nowrap items-center">
                        <TeamBadgeStack imgs={memberImages} />
                    </div>
                </div>
                {/* Images (TODO) */}
                <div className="mt-6 flex justify-center">
                    <Image
                        className="outline-gradient h-[600px] w-[1000px] object-cover"
                        src="/imgs/about/team-1.webp"
                        width={1000}
                        height={600}
                        alt="Team picture"
                    />
                </div>
                {/* "Who are we" */}
                <div className="my-8 flex max-w-[28rem] flex-col gap-2 md:ml-[50%] md:mt-28">
                    <p className="color-gradient font-mono">{t("who_are_we")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        {t("who_are_we_heading")}{" "}
                        <span className="highlight-text">{t("who_are_we_heading_hl")}</span>
                    </h1>
                    <p className="text-thistle">
                        <b>{t("who_are_we_p1_bold")}</b>, {t("who_are_we_p1")}{" "}
                    </p>
                    <p className="my-2 text-thistle">
                        <b>{t("who_are_we_p2_bold")}</b> {t("who_are_we_p2")}
                    </p>
                    <Button className="w-fit font-heading uppercase" asChild>
                        <a href="#introducing-our-team">{t("meet_the_team")}</a>
                    </Button>
                </div>
                {/* Figures */}
                <div className="flex justify-center md:mb-28">
                    <div className="grid w-fit grid-cols-1 place-items-center gap-0 md:grid-cols-2 md:grid-cols-4">
                        <Metric
                            className="!w-64"
                            figure="3500+"
                            caption={t("figure_eecs_students")}
                            border
                        />
                        <Metric
                            className="!w-64"
                            figure="21"
                            caption={t("figure_previous_partners")}
                            border
                        />
                        <Metric
                            className="!w-64"
                            figure="2300+"
                            caption={t("figure_event_attendees")}
                            border
                        />
                        <Metric className="!w-64" figure="34" caption={t("figure_events")} border />
                    </div>
                </div>
                {/* "What do we do" */}
                <div className="my-8 flex flex-col gap-2 overflow-x-auto">
                    <p className="color-gradient font-mono">{t("what_do_we_do")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        {t("what_do_we_do_heading")}{" "}
                        <span className="highlight-text">{t("what_do_we_do_heading_hl")}</span>
                    </h1>
                    <div className="max-w-[28rem]">
                        <p className="text-thistle">
                            <b>{t("what_do_we_do_p_bold")}</b> {t("what_do_we_do_p")}
                        </p>
                    </div>
                    <Button className="w-fit font-heading uppercase" asChild>
                        <Link href="/SponsorsPage">{t("become_a_sponsor")} &gt;</Link>
                    </Button>
                </div>
                {/* Cards for "What do we do" */}
                <div className="mb-8 flex w-full gap-8 overflow-x-auto md:justify-center">
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
                        linkHref="/placeholder"
                    />
                </div>
                {/* Introducing our team */}
                <div
                    id="introducing-our-team"
                    className="align-center flex scroll-mt-28 flex-col items-center gap-2 text-center md:mt-28"
                >
                    <p className="color-gradient font-mono">{t("introducing_our_team")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        <span className="highlight-text">
                            {t("introducing_our_team_heading_hl")}
                        </span>{" "}
                        {t("introducing_our_team_heading")}
                    </h1>
                    <p className="max-w-[32rem] text-lg leading-tight text-thistle">
                        {t("introducing_our_team_blurb")}
                    </p>
                </div>
                {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                <div className="top-[5.6rem] z-10 mt-4 grid grid-flow-col grid-rows-4 text-center font-heading uppercase backdrop-blur-sm md:grid-rows-2">
                    <Button className="!inline" variant="outline" asChild>
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
                {/* TODO: Add horizontal scrolling if the members don't all fit onscreen. */}
                <div className="mt-16 flex flex-col gap-24">
                    <TeamMembers
                        title={tOurTeam("codirectors")}
                        description={tOurTeam("codirectors_desc")}
                        people={codirectors}
                    />
                    <TeamMembers
                        title={tOurTeam("partnerships")}
                        description={tOurTeam("partnerships_desc")}
                        people={partnership}
                    />
                    <TeamMembers
                        title={tOurTeam("events")}
                        description={tOurTeam("events_desc")}
                        people={events}
                    />
                    <TeamMembers
                        title={tOurTeam("communications")}
                        description={tOurTeam("communications_desc")}
                        people={communications}
                    />
                    <TeamMembers
                        title={tOurTeam("development")}
                        description={tOurTeam("development_desc")}
                        people={development}
                    />
                    <TeamMembers
                        title={tOurTeam("academic")}
                        description={tOurTeam("academic_desc")}
                        people={academic}
                    />
                    <TeamMembers
                        title={tOurTeam("advisors")}
                        description={tOurTeam("advisors_desc")}
                        people={advisors}
                    />
                </div>

                {/* Beyond SESA */}
                <div className="align-center mt-24 flex flex-col items-center gap-3 text-center">
                    <p className="color-gradient font-mono">{t("our_previous_partners")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        <span className="highlight-text">
                            {t("our_previous_partners_heading_hl")}
                        </span>
                    </h1>
                    <p className="max-w-[32rem] text-lg leading-snug text-thistle">
                        <b>{t("our_previous_partners_p_bold")}</b>,{" "}
                        {t("our_previous_partners_p")}{" "}
                    </p>
                    <div className="mt-10 flex items-center justify-center text-center">
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
            </div>
            {/* Be a part of our family */}
            <section className="relative my-10 flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 text-white md:my-32 md:flex-row md:justify-between md:ps-32 2xl:ps-96">
                {/* Grid Gradient Back */}
                <div className="grid-overlay-right md:h-[43.93rem] md:w-[53vw]"></div>

                {/* Content Container */}
                <div className="relative z-10 max-w-2xl px-4 md:px-0">
                    <p className="color-gradient font-mono">{t("our_family")}</p>
                    <h1 className="mt-4 max-w-[28rem] font-heading text-3xl uppercase leading-tight">
                        {t("our_family_heading")}{" "}
                        <span className="highlight-text">{t("our_family_heading_hl")}</span>
                    </h1>
                    <p className="mt-4 max-w-[28rem] font-sans text-base text-thistle md:text-lg md:leading-tight">
                        <b>{t("our_family_p_bold")}</b>. {t("our_family_p")}
                    </p>
                    <div className="mt-6 flex flex-col space-y-2 font-heading">
                        <Button
                            className="pointer-events-none my-4 w-fit cursor-not-allowed font-heading uppercase opacity-50"
                            disabled
                            asChild
                        >
                            <Link href="/ContactUsPage">{t("apply_now")}</Link>
                        </Button>
                        <p className="max-w-[28rem] font-mono text-gray-400">{t("no_more_apps")}</p>
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
        </div>
    );
}
