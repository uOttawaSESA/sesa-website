import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import Metric from "@/components/Metric";
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
    const images = [
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
        "/imgs/team/ange.png",
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
                    <p className="max-w-[28rem] text-gray-400">{t("inspiring_blurb")}</p>
                    <div className="my-2 flex gap-2 font-heading uppercase">
                        <Button href="#introducing-our-team" className="font-heading uppercase">
                            {t("meet_the_team")}
                        </Button>
                        <Button
                            href="https://linktr.ee/uottawa.sesa"
                            external
                            className="font-heading uppercase"
                            variant="outline"
                        >
                            {t("join_our_family")}
                        </Button>
                    </div>
                    <div className="flex flex-nowrap items-center">
                        {images.map((src, i) => (
                            <CircleImage
                                src={src}
                                key={i}
                                alt="Profile picture"
                                size={56}
                                className={(i & 1) === 1 ? "-m-5" : undefined}
                            />
                        ))}
                    </div>
                </div>
                {/* Images (TODO) */}
                <div className="mt-6 flex justify-center">
                    <Image
                        className="outline-gradient h-[600px] w-[1000px] object-cover"
                        src="/imgs/about/team-1.png"
                        width={1000}
                        height={600}
                        alt="Team picture"
                    />
                </div>
                {/* "Who are we" */}
                <div className="my-8 flex max-w-[28rem] flex-col gap-2 md:ml-[50%]">
                    <p className="color-gradient font-mono">{t("who_are_we")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        {t("who_are_we_heading")}{" "}
                        <span className="relative inline-block">
                            {t("who_are_we_heading_hl")}
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <p className="text-gray-400">
                        <b>{t("who_are_we_p1_bold")}</b>, {t("who_are_we_p1")}{" "}
                    </p>
                    <p className="my-2 text-gray-400">
                        <b>{t("who_are_we_p2_bold")}</b> {t("who_are_we_p2")}
                    </p>
                    <Button href="#introducing-our-team" className="w-fit font-heading uppercase">
                        {t("meet_the_team")}
                    </Button>
                </div>
                {/* Figures */}
                <div className="flex justify-center">
                    <div className="grid w-fit grid-cols-1 place-items-center gap-0 md:grid-cols-2 lg:grid-cols-4">
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
                <div className="my-8 flex flex-col gap-2">
                    <p className="color-gradient font-mono">{t("what_do_we_do")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        {t("what_do_we_do_heading")}{" "}
                        <span className="relative inline-block">
                            {t("what_do_we_do_heading_hl")}
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <div className="max-w-[28rem]">
                        <p className="text-gray-400">
                            <b>{t("what_do_we_do_p_bold")}</b> {t("what_do_we_do_p")}
                        </p>
                    </div>
                    <Button href="/SponsorsPage" className="w-fit font-heading uppercase">
                        {t("become_a_sponsor")} &gt;
                    </Button>
                </div>
                {/* Cards for "What do we do" */}
                <div className="mb-8 flex w-full gap-8 overflow-x-scroll lg:justify-center">
                    <WhatWeDoCard
                        imageHref="/imgs/about/social-events.png"
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
                        imageHref="/imgs/about/academic-support.png"
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
                        imageHref="/imgs/about/professional-development.png"
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
                    className="align-center flex scroll-mt-28 flex-col items-center gap-2 text-center"
                >
                    <p className="color-gradient font-mono">{t("introducing_our_team")}</p>
                    <h1 className="font-heading text-3xl uppercase">
                        <span className="relative inline-block">
                            {t("introducing_our_team_heading_hl")}
                            <div className="highlight-gradient" />
                        </span>{" "}
                        {t("introducing_our_team_heading")}
                    </h1>
                    <p className="max-w-[32rem] text-lg leading-tight text-gray-400">
                        {t("introducing_our_team_blurb")}
                    </p>
                </div>
                {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                <div className="top-[5.6rem] z-10 mt-4 grid grid-flow-col grid-rows-4 text-center font-heading uppercase backdrop-blur-sm md:grid-rows-2 lg:grid-rows-1">
                    <Button variant="outline" href="#co-directors">
                        {tOurTeam("codirectors")}
                    </Button>
                    <Button variant="outline" href="#partnerships">
                        {tOurTeam("partnerships")}
                    </Button>
                    <Button variant="outline" href="#events">
                        {tOurTeam("events")}
                    </Button>
                    <Button variant="outline" href="#communications">
                        {tOurTeam("communications")}
                    </Button>
                    <Button variant="outline" href="#development">
                        {tOurTeam("development")}
                    </Button>
                    <Button variant="outline" href="#academic">
                        {tOurTeam("academic")}
                    </Button>
                    <Button variant="outline" href="#advisors">
                        {tOurTeam("advisors")}
                    </Button>
                </div>
                <br />
                {/* TODO: Add horizontal scrolling if the members don't all fit onscreen. */}
                <div className="flex flex-col gap-8">
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
                </div>
            </div>
            {/* Beyond SESA */}
            <div className="align-center flex flex-col items-center gap-2 text-center">
                <p className="color-gradient font-mono">{t("our_previous_partners")}</p>
                <h1 className="font-heading text-3xl uppercase">
                    <span className="relative inline-block">
                        {t("our_previous_partners_heading_hl")}
                        <div className="highlight-gradient" />
                    </span>
                </h1>
                <p className="max-w-[32rem] text-lg leading-tight text-gray-400">
                    <b>{t("our_previous_partners_p_bold")}</b>, {t("our_previous_partners_p")}{" "}
                </p>
                <div className="flex items-center justify-center text-center">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        {/* This just fills the grid with 8 Warp logos for the time being */}
                        {Array(8)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    className="outline-gradient flex h-36 w-64 items-center justify-center"
                                    key={i}
                                >
                                    <Image
                                        src="/sponsors/warp.svg"
                                        width={192}
                                        height={75}
                                        alt="Warp Logo"
                                        className="w-48"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {/* Be a part of our family */}
            <div className="mb-24 mt-16 flex flex-col items-center justify-center gap-8 px-4 lg:flex-row">
                <div className="flex flex-col gap-2">
                    <p className="color-gradient font-mono">{t("our_family")}</p>
                    <h1 className="max-w-[28rem] font-heading text-3xl uppercase">
                        {t("our_family_heading")}{" "}
                        <span className="relative inline-block">
                            {t("our_family_heading_hl")}
                            <div className="highlight-gradient" />
                        </span>
                    </h1>
                    <p className="max-w-[28rem] text-lg leading-tight text-gray-400">
                        <b>{t("our_family_p_bold")}</b>. {t("our_family_p")}
                    </p>
                    <Button
                        href="/ContactUsPage"
                        className="my-4 w-fit font-heading uppercase"
                        disabled
                    >
                        {t("apply_now")}
                    </Button>
                    <p className="max-w-[28rem] font-mono text-gray-400">{t("no_more_apps")}</p>
                </div>
                <Image
                    className="outline-gradient h-[500px] w-[700px] object-cover"
                    src="/imgs/about/team-1.png"
                    width={700}
                    height={500}
                    alt="Team picture"
                />
            </div>
        </div>
    );
}
