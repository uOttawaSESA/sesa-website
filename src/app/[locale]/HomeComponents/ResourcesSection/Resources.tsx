"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";
import ComingSoonMessage from "@/components/ComingSoonMessage";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link, useRouter } from "@/i18n/navigation";
import { api } from "@/trpc/react";
import ResourceCard from "../../resources/components/ResourceCard/ResourceCard";

const Resources = () => {
    const t = useTranslations("homepage");
    const { data: resources } = api.resource.getAll.useQuery();
    const router = useRouter();

    return (
        <section className="relative my-10 mb-0 flex w-full flex-col gap-4 text-white md:mb-20">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                <Star
                    variant="star"
                    className="hidden opacity-60 md:left-[5rem] md:top-[3rem] md:block"
                    rotate={-110}
                    delay={1}
                />

                <Star
                    variant="star"
                    className="hidden md:left-[10rem] md:top-[7rem] md:block"
                    width={63}
                    height={63}
                    delay={0.5}
                />

                {/* Light gradient */}
                <div className="fade-from-right-bg absolute right-0 top-[20rem] h-[100rem] w-[30vw] bg-blueviolet-100 bg-opacity-20 blur-sm" />

                <Image
                    src="/decoration/waves.svg"
                    className={`fade-from-top-bottom-bg absolute left-1/2 hidden w-11/12 -translate-x-1/2 transform md:bottom-[4rem] md:block md:w-max ${resources && resources.length === 0 ? "hidden" : ""}`}
                    width={1200}
                    height={280}
                    alt=""
                />

                <Star
                    variant="star"
                    className="hidden md:bottom-[-4rem] md:right-[15rem] md:block"
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:bottom-[-5rem] md:right-[14rem] md:block"
                    rotate={30}
                    width={63}
                    height={63}
                    delay={0.5}
                />
            </div>
            <div className="flex flex-col gap-3 px-8 text-center md:px-10 lg:mb-14">
                <p className="font-monocode color-gradient text-xs md:text-base">
                    {t("resources_by_students")}
                </p>
                <h1 className="font-heading text-2xl uppercase leading-tight md:text-4xl">
                    {t("resources_heading_h1")}&nbsp;
                    <span className="highlight-text">{t("resources_heading_h1_highlighted")}</span>
                </h1>
                <p className="font-sans text-base text-thistle md:text-lg">
                    {t("resources_subheading")}
                </p>
            </div>
            {/* Carousel */}
            {resources && resources.length !== 0 ? (
                <Marquee pauseOnHover>
                    <div className="flex flex-col gap-4">
                        {/* Two rows with gap */}
                        {/* First Row */}
                        <div className="me-4 flex gap-4">
                            {resources.slice(0, Math.ceil(resources.length / 2)).map(resource => (
                                <div key={resource.id}>
                                    <ResourceCard
                                        title={resource.title}
                                        category={resource.category}
                                        course={resource.course}
                                        tier={resource.tier}
                                        format={resource.format}
                                        onOpen={() =>
                                            router.push({
                                                pathname: "/resources",
                                                query: { id: resource.id },
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Second Row */}
                        <div className="me-4 flex gap-4">
                            {resources.slice(Math.ceil(resources.length / 2)).map(resource => (
                                <div key={resource.id}>
                                    <ResourceCard
                                        title={resource.title}
                                        category={resource.category}
                                        course={resource.course}
                                        tier={resource.tier}
                                        format={resource.format}
                                        onOpen={() =>
                                            router.push({
                                                pathname: "/resources",
                                                query: { id: resource.id },
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Marquee>
            ) : (
                <div className="2xl:my-10">
                    <ComingSoonMessage
                        title={t("coming_soon_title")}
                        subtitle={t("coming_soon_subtitle")}
                        homeButton={false}
                    />
                </div>
            )}

            <div className="z-10 space-y-4 px-8 md:px-32">
                <div className="flex w-full justify-center gap-4 font-heading">
                    <Button className="text-sm md:text-lg" asChild>
                        <Link href="/resources">
                            {t("explore_all_resources")}{" "}
                            {/* <span className="text-gray opacity-50">{">"}</span> */}
                        </Link>
                    </Button>
                    <Button className="text-sm md:text-lg" variant="outline" asChild>
                        <a
                            href="https://discord.com/invite/atYdx5HHCs"
                            target="_blank"
                            rel="noopener"
                        >
                            {t("join_our_discord")}
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Resources;
