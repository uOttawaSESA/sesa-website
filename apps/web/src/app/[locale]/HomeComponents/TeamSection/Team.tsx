"use client";
import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import type { Members } from "@/app/types/Member";
import AnimateOnView from "@/components/AnimateOnView";
import CircleImage from "@/components/CircleImage";
import Star from "@/components/decorations/star";
import { Link } from "@/i18n/navigation";

interface TeamProps {
    membersData: Members[];
}

const Team = ({ membersData }: TeamProps) => {
    const t = useTranslations("homepage");
    const [hovered, setHovered] = useState<string>("");

    return (
        <section className="relative mb-12 flex flex-col gap-16 md:mb-36 2xl:mt-44 2xl:mb-52">
            <div className="pointer-events-none z-0 select-none">
                <div className="fade-from-center-bg absolute top-[-29rem] left-1/2 h-[112rem] w-full -translate-x-1/2 bg-blueviolet-100/25 blur-xl md:top-[-59rem] md:w-[130rem] 2xl:top-[-55rem]" />
                <div className="fade-from-center-bg absolute bottom-[-15rem] left-1/2 h-[55rem] w-full -translate-x-1/2 bg-[#B1219D]/30 blur-xl md:w-[80vw] 2xl:bottom-[-8rem]" />

                <Star
                    variant="star"
                    className="hidden md:top-[1rem] md:left-[8rem] md:block"
                    rotate={-110}
                    width={77}
                    height={77}
                    delay={1}
                />

                <Star
                    variant="star"
                    className="hidden opacity-60 md:top-[-5rem] md:right-[5rem] md:block"
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="absolute top-[1rem] right-[2rem] md:top-[-1rem] md:right-[10rem]"
                    rotate={30}
                    width={60}
                    height={60}
                    delay={0.5}
                />

                <div className="fade-from-center-tunnel-home absolute bottom-[5rem] left-1/2 z-0 hidden h-[580px] w-[1500px] -translate-x-1/2 transform overflow-hidden md:block">
                    <Image
                        src="/decoration/tunnel.svg"
                        className="relative left-1/2 -translate-x-1/2 object-cover opacity-85"
                        width={1500}
                        height={300}
                        alt=""
                    />

                    {/* Bottom light */}
                    <div
                        className="pointer-events-none absolute inset-0 z-10"
                        style={{
                            background: `radial-gradient(ellipse 80% 60% at center bottom, rgba(177, 33, 157, 0.1) 0%, transparent 80%)`,
                        }}
                    />
                </div>
            </div>

            <div className="z-20 flex flex-col items-center justify-center gap-4 px-8 md:px-20 xl:px-32">
                <div className="flex flex-row gap-3">
                    <Image src="/logo-filled.svg" width={50} height={50} alt="sesa" />
                    <Image src="/logo-text.svg" width={111} height={50} alt="sesa" />
                </div>
                <h1 className="text-center font-heading text-2xl uppercase leading-tight md:text-5xl">
                    <span className="block">
                        {t("team_heading_line1_part1")}{" "}
                        <AnimateOnView animationClass="highlight-text">
                            {t("team_heading_line1_highlight")}
                        </AnimateOnView>{" "}
                        {t("team_heading_line1_part2")}
                    </span>
                    <span className="block">{t("team_heading_line2")}</span>
                </h1>
                <p className="w-full font-sans text-base text-thistle md:text-center md:text-xl">
                    {t("team_subheading_line1")}
                    <br className="hidden md:block" />
                    {t("team_subheading_line2")}
                </p>
            </div>

            <div className="z-20 -mt-8 flex flex-col items-center gap-4 px-8 sm:flex-row md:-mt-10 md:flex-row md:justify-center">
                <Button className="w-full font-heading uppercase sm:w-max" asChild>
                    <Link href="/sponsors">{t("team_become_sponsor_btn")}</Link>
                </Button>

                <Button
                    className="w-full font-heading uppercase sm:w-max"
                    variant="outline"
                    asChild
                >
                    <Link href="/contact">{t("team_get_in_touch_btn")}</Link>
                </Button>
            </div>

            <div className="relative -mt-5 bg-transparent md:-mt-7">
                <Marquee pauseOnHover speed={40} autoFill={true}>
                    <div className="mb-16 flex flex-row pt-2">
                        {membersData.map((member, index) => (
                            <div key={index} className="relative">
                                <CircleImage
                                    size={50}
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="mx-5 transition-all ease-in-out hover:-translate-y-2"
                                    onMouseEnter={() => setHovered(member.name)}
                                    onMouseLeave={() => setHovered("")}
                                />
                            </div>
                        ))}
                    </div>
                </Marquee>

                {hovered && (
                    <div className="absolute top-16 left-1/2 z-10 mt-7 -translate-x-1/2 px-4 py-2 text-center 2xl:top-20">
                        <h1 className="mb-2 font-heading text-xl">{hovered}</h1>
                        <p className="font-sans text-thistle">
                            {membersData.find(m => m.name === hovered)?.roleLabel ??
                                membersData.find(m => m.name === hovered)?.roleKey}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Team;
