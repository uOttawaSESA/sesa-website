import { Button } from "@repo/ui/components/button";
import type { Metadata } from "next";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
// Precompile i18n
import localeParams from "@/app/data/locales";
import type { Member } from "@/app/types/Member";
import AnimateOnView from "@/components/AnimateOnView";
import Star from "@/components/decorations/star";
import Metric from "@/components/Metric";
import { TeamBadgeStack } from "@/components/TeamBadgeStack";
import { Link } from "@/i18n/navigation";
import { api } from "@/trpc/server";
import TeamSection from "./TeamSection";
import WhatWeDoCard from "./WhatWeDoCard";
export const generateStaticParams = localeParams;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations("meta");

    const title = `${t("about_title")} | ${t("title_suffix")}`;
    const description = t("about_description");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                en: "/en/about",
                fr: "/fr/about",
            },
        },
        openGraph: {
            title,
            description,
            url: new URL("https://www.sesa-aegl.ca/about"),
        },
    };
}

export default async function About() {
    const beyonSesaCompanies = [
        { src: "/imgs/about/beyond-sesa/dropbox.webp", alt: "Dropbox", width: 75, height: 75 },
        { src: "/imgs/about/beyond-sesa/meta.webp", alt: "Meta", width: 150, height: 75 },
        { src: "/imgs/about/beyond-sesa/cisco.webp", alt: "Cisco", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/amazon.webp", alt: "Amazon", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/google.webp", alt: "Google", width: 100, height: 75 },
        { src: "/imgs/about/beyond-sesa/apple.webp", alt: "Apple", width: 120, height: 75 },
        { src: "/imgs/about/beyond-sesa/shopify.webp", alt: "Shopify", width: 140, height: 75 },
        { src: "/imgs/about/beyond-sesa/ibm.webp", alt: "IBM", width: 100, height: 75 },
        {
            src: "/imgs/about/beyond-sesa/ycombinator.svg",
            alt: "Y Combinator",
            width: 200,
            height: 75,
        },
    ];

    const t = await getTranslations("about");
    const tWhatWeDo = await getTranslations("about.what_do_we_do_cards");

    void api.member.getAll.prefetch();
    const members: Member[] = (await api.member.getAll()) ?? [];

    const directorsImg = members
        .filter(member => member.teamKey === "codirectors")
        .map(member => member.imageUrl);

    return (
        <div className="relative min-h-screen text-white">
            {/* Gradient */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                {/* Light gradient */}
                <div className="fade-from-left-bg absolute -top-80 left-0 h-280 w-[80vw] bg-blueviolet-100/20 blur-xs" />
                {/* Warm gradient */}
                <div className="fade-from-left-bg absolute top-280 h-360 w-full bg-[#B1219D]/15 blur-xs md:w-[60vw]" />
            </div>

            <div className="container relative mx-auto max-w-7xl px-4 py-8">
                {/* Decorations */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                    <Image
                        className="fade-left-bottom absolute -top-40 -right-48 h-240 w-240"
                        src="/decoration/double-tunnel.svg"
                        width={913}
                        height={909}
                        alt=""
                    />
                    <Star
                        variant="star"
                        className="absolute top-48 right-4 hidden md:block"
                        width={130}
                        height={130}
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-68 right-0"
                        rotate={33}
                        delay={0.5}
                    />
                    <Star
                        variant="star"
                        className="absolute top-92 right-96"
                        rotate={-15}
                        delay={1}
                    />
                </div>
                {/* Upper area */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-heading text-base uppercase md:text-lg">
                        <p className="fill-gradient px-2 py-0.5">{t("partner")}</p>
                        <p>{t("faculty_of_eng")}</p>
                    </div>
                    <h1 className="max-w-96 font-heading text-3xl uppercase md:text-4xl">
                        {t("inspiring_heading")}
                    </h1>
                    <p className="max-w-md text-base text-thistle md:text-lg">
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
                                <a
                                    href="https://linktr.ee/uottawa.sesa"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {t("join_our_family")}
                                </a>
                            </Button>
                        </div>
                        <div className="mt-2 flex flex-nowrap items-center">
                            <TeamBadgeStack imgs={directorsImg} />
                        </div>
                    </div>
                </div>
                {/* Images (TODO) */}
                <div className="mt-12 flex justify-center">
                    <Image
                        className="z-10 h-[600px] w-[1250px] object-cover outline-gradient"
                        src="/imgs/about/team-1.webp"
                        width={1200}
                        height={600}
                        alt="Team picture"
                    />
                </div>
                {/* "Who are we" */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                        <Image
                            className="fade-right-bottom absolute top-80 left-24 h-220 w-220 opacity-60 md:-top-56 md:-left-64 md:opacity-100"
                            src="/decoration/disc.svg"
                            width={911}
                            height={822}
                            alt=""
                        />
                        <Star
                            variant="star"
                            className="absolute top-12 left-48 hidden md:block lg:left-96"
                            width={150}
                            height={150}
                            delay={1}
                        />
                        <Star
                            variant="star-faded"
                            className="absolute top-64 left-16"
                            rotate={5}
                            width={79}
                            height={80}
                            delay={0.5}
                        />
                    </div>
                    <div className="my-8 flex max-w-md flex-col gap-2 md:mt-28 md:ml-[53%]">
                        <p className="color-gradient font-mono">{t("who_are_we")}</p>
                        <h2 className="font-heading text-2xl uppercase md:text-3xl">
                            {t("who_are_we_heading")}{" "}
                            <AnimateOnView animationClass="highlight-text">
                                {t("who_are_we_heading_hl")}
                            </AnimateOnView>
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
                    {/* Figures */}
                    <div className="flex justify-center md:mb-28">
                        <div className="grid w-fit grid-cols-1 place-items-center gap-4 md:grid-cols-4 md:gap-20">
                            <Metric
                                className="w-64! backdrop-blur-lg"
                                figure={3500}
                                suffix="+"
                                caption={t("figure_eecs_students")}
                                border
                            />
                            <Metric
                                className="w-64! backdrop-blur-lg"
                                figure={21}
                                caption={t("figure_previous_partners")}
                                border
                            />
                            <Metric
                                className="w-64! backdrop-blur-lg"
                                figure={2300}
                                suffix="+"
                                caption={t("figure_event_attendees")}
                                border
                            />
                            <Metric
                                className="w-64! backdrop-blur-lg"
                                figure={34}
                                caption={t("figure_events")}
                                border
                            />
                        </div>
                    </div>
                </div>
                {/* "What do we do" */}
                <div className="relative">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                        <Star
                            variant="star"
                            className="absolute top-32 right-0 md:top-12 md:right-40"
                            width={130}
                            height={130}
                            delay={1}
                        />
                        <Star
                            variant="star-faded"
                            className="absolute top-32 right-40"
                            rotate={30}
                            delay={0.5}
                        />
                    </div>
                    <div className="my-8 flex max-w-md flex-col gap-2">
                        <p className="color-gradient font-mono text-xs md:text-base">
                            {t("what_do_we_do")}
                        </p>
                        <h2 className="font-heading text-2xl uppercase md:text-3xl">
                            {t("what_do_we_do_heading")}{" "}
                            <AnimateOnView animationClass="highlight-text">
                                {t("what_do_we_do_heading_hl")}
                            </AnimateOnView>
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
                    {/* Cards for "What do we do" */}
                    <div className="mx-0 mb-8 flex w-max max-w-md gap-3 overflow-x-auto md:max-w-max md:justify-start md:gap-6">
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
                </div>
                {/* Introducing our team */}
                <TeamSection />

                {/* Beyond SESA */}
                <div className="relative mt-56">
                    {/* Decorations */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                        <Image
                            className="fade-from-center-bg absolute right-0 left-0 ms-auto me-auto w-auto opacity-60"
                            src="/decoration/globe-sponsor-page.svg"
                            width={740}
                            height={741}
                            alt=""
                        />
                        {/* Light gradient */}
                        <div className="fade-from-left-bg absolute -top-400 -left-24 h-800 w-[80vw] bg-blueviolet-100/20 blur-xs 2xl:-left-180" />

                        {/* Warm gradient */}
                        <div className="fade-from-center-bg absolute -top-100 left-1/2 h-400 w-full -translate-x-1/2 bg-[#B1219D]/25 blur-xs md:w-screen" />

                        <Star
                            variant="star"
                            className="absolute top-16 left-16 hidden lg:block"
                            rotate={-15}
                            width={130}
                            height={130}
                            delay={1}
                        />
                        <Star
                            variant="star-faded"
                            className="absolute top-12 left-40"
                            rotate={15}
                            delay={0.5}
                        />
                        <Star
                            variant="star-faded"
                            className="absolute top-26 right-60"
                            rotate={25}
                            width={79}
                            height={80}
                            delay={0.5}
                        />
                    </div>
                    <div className="mt-24 flex flex-col items-center gap-3 text-center align-center">
                        <p className="color-gradient font-mono text-xs md:text-base">
                            {t("our_previous_partners")}
                        </p>
                        <h2 className="font-heading text-2xl uppercase md:text-3xl">
                            <AnimateOnView animationClass="highlight-text">
                                {t("our_previous_partners_heading_hl")}
                            </AnimateOnView>
                        </h2>
                        <p className="max-w-lg text-base text-thistle leading-snug md:text-lg">
                            <b>{t("our_previous_partners_p_bold")}</b>,{" "}
                            {t("our_previous_partners_p")}{" "}
                        </p>
                        <div className="mt-10 flex items-center justify-center text-center">
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                                {beyonSesaCompanies.map((company, i) => (
                                    <div
                                        className="flex h-36 w-64 items-center justify-center outline-gradient backdrop-blur-lg"
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
            </div>
            {/* Be a part of our family */}
            <div className="relative">
                {/* Decorations */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                    {/* Light gradient */}
                    <div className="fade-from-center-bg relative top-0 left-40 h-200 w-[70vw] bg-blueviolet-100/10 blur-xs" />
                    <Star
                        variant="star"
                        className="absolute -bottom-20 left-140 hidden lg:block"
                        rotate={-15}
                        width={130}
                        height={130}
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute -bottom-28 left-168 hidden lg:block"
                        rotate={20}
                        width={60}
                        height={60}
                        delay={0.5}
                    />
                </div>
                <section className="relative my-10 flex min-h-[60vh] w-full flex-col items-center justify-center gap-8 text-white md:my-32 md:flex-row md:justify-between md:ps-32 2xl:ps-96">
                    {/* Grid Gradient Back */}
                    <div className="grid-overlay-right md:h-[43.93rem] md:w-[53vw]"></div>

                    {/* Content Container */}
                    <div className="relative z-10 max-w-2xl px-4 md:px-0">
                        <p className="color-gradient font-mono text-xs md:text-base">
                            {t("our_family")}
                        </p>
                        <h2 className="mt-4 max-w-md font-heading text-2xl uppercase leading-tight md:text-3xl">
                            {t("our_family_heading")}{" "}
                            <AnimateOnView animationClass="highlight-text">
                                {t("our_family_heading_hl")}
                            </AnimateOnView>
                        </h2>
                        <p className="mt-4 max-w-md font-sans text-base text-thistle md:text-lg">
                            <b>{t("our_family_p_bold")}</b>. {t("our_family_p")}
                        </p>
                        <div className="mt-6 flex flex-col space-y-2 font-heading">
                            <Button className="my-4 w-fit font-heading uppercase" asChild>
                                <a
                                    href="https://linktr.ee/uottawa.sesa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {t("get_involved")}
                                </a>
                            </Button>
                            <p className="max-w-md font-mono text-sm text-thistle">
                                {t("no_more_apps")}
                            </p>
                        </div>
                    </div>

                    {/* Right Side Image - Centered on mobile, touches right edge on desktop */}
                    <div className="relative z-10">
                        <Image
                            src="/imgs/about/team-1.webp"
                            alt="Team picture"
                            className="h-[400px] w-auto object-cover outline-gradient md:h-[500px]"
                            width={700}
                            height={500}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
