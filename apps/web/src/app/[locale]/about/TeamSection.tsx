"use client";
import { Button } from "@repo/ui/components/button";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { Member, TeamKey } from "@/app/types/Member";
import AnimateOnView from "@/components/AnimateOnView";
import Star from "@/components/decorations/star";
import { Link } from "@/i18n/navigation";
import { api } from "@/trpc/react";
import TeamMembers from "./TeamMembers";

export default function TeamSection() {
    const t = useTranslations("about");
    const tOurTeam = useTranslations("about.introducing_our_team_section");

    const { data: members = [] } = api.member.getAll.useQuery();

    const teams = useMemo(
        () =>
            Object.groupBy(members, member => member.teamKey) as Partial<Record<TeamKey, Member[]>>,
        [members],
    );

    const orderedTeamKeys = Object.keys(teams) as TeamKey[];

    return (
        <section>
            <div className="relative">
                {/* Decorations */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full select-none">
                    {/* Light gradient */}
                    <div className="fade-from-center-bg absolute -top-40 -left-40 h-280 w-[70vw] bg-blueviolet-100/15 blur-xs 2xl:-left-180" />

                    {/* Warm gradient */}
                    <div className="fade-from-left-bg absolute -top-80 -left-40 h-360 w-full bg-[#B1219D]/15 blur-xs md:w-[60vw] 2xl:-left-180" />

                    {/* Light gradient */}
                    <div className="fade-from-left-bg absolute top-40 -left-40 h-400 w-[80vw] bg-blueviolet-100/20 blur-xs 2xl:-left-180" />

                    {/* Warm gradient */}
                    <div className="fade-from-center-bg absolute top-400 left-1/2 h-400 w-full -translate-x-1/2 bg-[#B1219D]/25 blur-xs md:w-screen 2xl:-left-180" />

                    {/* Light gradient */}
                    <div className="fade-from-right-bg absolute top-520 -right-24 h-400 w-[50vw] bg-blueviolet-100/20 blur-xs 2xl:-right-180" />

                    {/* Warm gradient */}
                    <div className="fade-from-center-bg absolute top-760 left-1/2 h-400 w-full -translate-x-1/2 bg-[#B1219D]/25 blur-xs md:w-screen" />

                    <Star
                        variant="star"
                        className="absolute -top-16 left-16 hidden lg:block"
                        rotate={-15}
                        width={130}
                        height={130}
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-14 left-20"
                        width={60}
                        height={60}
                        delay={0.5}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-4 right-8"
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
                    <p className="max-w-lg text-base text-thistle leading-tight md:text-lg">
                        {t("introducing_our_team_blurb")}
                    </p>
                </div>
                {/* TODO: Add the `sticky` class once a way to make it not super ugly is found */}
                <div className="top-[5.6rem] z-10 mt-4 grid grid-flow-col grid-rows-4 text-center font-heading uppercase backdrop-blur-xs md:grid-rows-1">
                    {orderedTeamKeys.map(teamKey => (
                        <Button key={teamKey} className="inline!" variant="outline" asChild>
                            <Link href={`#${teamKey}`}>{tOurTeam(teamKey)}</Link>
                        </Button>
                    ))}
                </div>
                <br />
            </div>
            <div className="mt-16 flex flex-col gap-24">
                {/* Stars */}
                <div className="absolute w-full">
                    {/* Between Co-Directors and Partnerships */}
                    <Star
                        variant="star"
                        className="absolute top-160 right-0 hidden lg:block"
                        delay={1}
                        width={90}
                        height={90}
                    />

                    {/* Next to Events text */}
                    <Star
                        variant="star"
                        className="absolute top-340 right-1/2 hidden lg:block"
                        delay={1}
                        width={90}
                        height={90}
                        rotate={-22}
                    />

                    {/* Next to Development */}
                    <Star
                        variant="star"
                        className="absolute top-640 right-20 hidden lg:block"
                        delay={1}
                    />
                    <Star
                        variant="star-faded"
                        className="absolute top-660 right-40 hidden lg:block"
                        delay={1}
                        rotate={10}
                    />
                </div>

                {orderedTeamKeys.map(teamKey => (
                    <TeamMembers
                        key={teamKey}
                        teamKey={teamKey}
                        title={tOurTeam(teamKey)}
                        description={tOurTeam(`${teamKey}_desc`)}
                        people={teams[teamKey] ?? []}
                    />
                ))}
            </div>
        </section>
    );
}
