"use client";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage";
import { Link } from "@/i18n/navigation";
import Marquee from "react-fast-marquee";
import { membersData } from "@/app/data/Members";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Team = () => {
    const t = useTranslations("homepage");
    const [hovered, setHovered] = useState<string>("");

    return (
        <>
            <section className="relative mb-12 flex flex-col gap-16 md:mb-24 2xl:mb-24 2xl:mt-44">
                <div className="pointer-events-none z-0 select-none">
                    <div className="fade-from-center-bg absolute left-1/2 top-[-29rem] h-[112.8rem] w-full -translate-x-1/2 bg-blueviolet-100 bg-opacity-25 blur-xl md:top-[-50rem] md:w-[130rem] 2xl:top-[-53rem]" />
                    <div className="fade-from-center-bg absolute bottom-[-15rem] left-1/2 h-[55rem] w-full -translate-x-1/2 bg-[#B1219D] bg-opacity-30 blur-xl md:w-[80vw]" />

                    <Image
                        src="/decoration/star.svg"
                        className="absolute hidden rotate-[-110deg] transform md:left-[8rem] md:top-[1rem] md:block"
                        width={77}
                        height={77}
                        alt=""
                    />

                    <Image
                        src="/decoration/star.svg"
                        className="absolute hidden opacity-60 md:right-[5rem] md:top-[-5rem] md:block"
                        width={120}
                        height={120}
                        alt=""
                    />

                    <Image
                        src="/decoration/star-faded.svg"
                        className="absolute right-[2rem] top-[1rem] rotate-[30deg] transform md:right-[10rem] md:top-[-1rem]"
                        width={60}
                        height={60}
                        alt=""
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
                            <span className="highlight-text">
                                {t("team_heading_line1_highlight")}
                            </span>{" "}
                            {t("team_heading_line1_part2")}
                        </span>
                        <span className="block">{t("team_heading_line2")}</span>
                    </h1>
                    <p className="w-full text-center font-sans text-base text-thistle md:text-xl">
                        {t("team_subheading_line1")}
                        <br />
                        {t("team_subheading_line2")}
                    </p>
                </div>

                <div className="z-20 -mt-8 flex justify-center gap-4 px-8 text-center font-heading md:-mt-10">
                    <Button className="w-full font-heading uppercase sm:w-max" asChild>
                        <a href="sponsors">
                            {t("team_become_sponsor_btn")}{" "}
                            <span className="text-gray ml-2 opacity-50">{">"}</span>
                        </a>
                    </Button>

                    <Button
                        className="w-full font-heading text-sm uppercase sm:w-max md:text-lg xl:text-xl"
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
                                        src={member.imgPath}
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
                        <div className="absolute left-1/2 top-14 z-10 mt-7 -translate-x-1/2 px-4 py-2 text-center">
                            <h1 className="mb-2 font-heading text-xl">{hovered}</h1>
                            <p className="font-sans text-thistle">
                                {membersData.find(m => m.name === hovered)?.role}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Team;
