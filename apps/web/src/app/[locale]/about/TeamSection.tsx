"use client";
import { Button } from "@repo/ui/components/button";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { Members } from "@/app/types/Member";
import AnimateOnView from "@/components/AnimateOnView";
import Star from "@/components/decorations/star";
import { Link } from "@/i18n/navigation";
import TeamMembers from "./TeamMembers";

export interface Props {
    membersData: Members[];
}

export default function TeamSection({ membersData }: Props) {
    const t = useTranslations("about");
    const tOurTeam = useTranslations("about.introducing_our_team_section");

    const { teams } = useMemo(() => {
        const teams: Record<string, typeof membersData> = {};

        for (const member of membersData ?? []) {
            if (!teams[member.teamKey]) {
                teams[member.teamKey] = [];
            }
            // biome-ignore lint/style/noNonNullAssertion: <We check the null just before this line>
            teams[member.teamKey]!.push(member);
        }

        return { teams };
    }, [membersData]);

    const codirectors = teams["Co-directors"] ?? [];
    const development = teams.Development ?? [];
    const communications = teams.Communications ?? [];
    const partnership = teams.Partnership ?? [];
    const events = teams.Events ?? [];
    const academic = teams.Academic ?? [];
    const advisors = teams.Advisor ?? [];

    return (
        <section>
            <div className="relative">
                {/* Decorations */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                    {/* Light gradient */}
                    <div className="fade-from-center-bg absolute top-[-10rem] left-[-10rem] h-[70rem] w-[70vw] bg-blueviolet-100/15 blur-xs 2xl:left-[-45rem]" />

                    {/* Warm gradient */}
                    <div className="fade-from-left-bg absolute top-[-20rem] left-[-10rem] h-[90rem] w-full bg-[#B1219D]/15 blur-xs md:w-[60vw] 2xl:left-[-45rem]" />

                    {/* Light gradient */}
                    <div className="fade-from-left-bg absolute top-[10rem] left-[-10rem] h-[100rem] w-[80vw] bg-blueviolet-100/20 blur-xs 2xl:left-[-45rem]" />

                    {/* Warm gradient */}
                    <div className="fade-from-center-bg absolute top-[100rem] left-1/2 h-[100rem] w-full -translate-x-1/2 bg-[#B1219D]/25 blur-xs md:w-screen 2xl:left-[-45rem]" />

                    {/* Light gradient */}
                    <div className="fade-from-right-bg absolute top-[130rem] right-[-6rem] h-[100rem] w-[50vw] bg-blueviolet-100/20 blur-xs 2xl:right-[-45rem]" />

                    {/* Warm gradient */}
                    <div className="fade-from-center-bg absolute top-[190rem] left-1/2 h-[100rem] w-full -translate-x-1/2 bg-[#B1219D]/25 blur-xs md:w-screen" />

                    <Star
                        variant="star"
                        className="absolute top-[-4rem] left-[4rem] hidden lg:block"
                        rotate={-15}
                        width={130}
                        height={130}
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-[3.5rem] left-[5rem]"
                        width={60}
                        height={60}
                        delay={0.5}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-[1rem] right-[2rem]"
                        rotate={30}
                        width={79}
                        height={80}
                        delay={0.5}
                    />
                </div>
                <div
                    id="introducing-our-team"
                    className="flex scroll-mt-28 flex-col items-center gap-2 text-center align-center md:mt-28"
                >
                    <p className="color-gradient font-mono text-xs md:text-base">
                        {t("introducing_our_team")}
                    </p>
                    <h2 className="font-heading text-2xl uppercase md:text-3xl">
                        <AnimateOnView animationClass="highlight-text">
                            {t("introducing_our_team_heading_hl")}
                        </AnimateOnView>{" "}
                        {t("introducing_our_team_heading")}
                    </h2>
                    <p className="max-w-[32rem] text-base text-thistle leading-tight md:text-lg">
                        {t("introducing_our_team_blurb")}
                    </p>
                </div>
                {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                <div className="top-[5.6rem] z-10 mt-4 grid grid-flow-col grid-rows-4 text-center font-heading uppercase backdrop-blur-xs md:grid-rows-1">
                    <Button className="!inline px-2!" variant="outline" asChild>
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
            </div>
            <div className="mt-16 flex flex-col gap-24">
                {/* Stars */}
                <div className="absolute w-full">
                    {/* Between Co-Directors and Partnerships */}
                    <Star
                        variant="star"
                        className="absolute top-[40rem] right-[0rem] hidden lg:block"
                        delay={1}
                        width={90}
                        height={90}
                    />

                    {/* Next to Events text */}
                    <Star
                        variant="star"
                        className="absolute top-[85rem] right-1/2 hidden lg:block"
                        delay={1}
                        width={90}
                        height={90}
                        rotate={-22}
                    />

                    {/* Next to Development */}
                    <Star
                        variant="star"
                        className="absolute top-[160rem] right-[5rem] hidden lg:block"
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-[165rem] right-[10rem] hidden lg:block"
                        delay={1}
                        rotate={10}
                    />
                </div>

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
            ;
        </section>
    );
}
