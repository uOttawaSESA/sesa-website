"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link, useRouter } from "@/i18n/navigation";
import { api } from "@/trpc/react";
import ResourceCard from "../../resources/components/ResourceCard/ResourceCard";

const Resources = () => {
    const t = useTranslations("homepage");
    const router = useRouter();

    const { isFetching, data, fetchNextPage } = api.resource.getCursorPage.useInfiniteQuery(
        {
            search: null,
            filters: {
                course: null,
                category: null,
                format: null,
                locale: null,
                tier: null,
            },
            sort: "created_desc",
        },
        {
            getPreviousPageParam: lastPage => lastPage.prevCursor,
            getNextPageParam: lastPage => lastPage.nextCursor,
        },
    );

    // Fetch the next page so that we have more resources to show
    // biome-ignore-start lint/correctness/useExhaustiveDependencies: The dependencies are deliberate to only trigger the effect once
    const fetchedNext = useRef(false);
    useEffect(() => {
        if (fetchedNext.current) return;
        fetchNextPage();
        fetchedNext.current = true;
    }, [!isFetching && data && data.pages.length !== 0]);
    // biome-ignore-end lint/correctness/useExhaustiveDependencies: The dependencies are deliberate to only trigger the effect once

    const resources = useMemo(() => {
        if (!data) return [];
        return data.pages.flatMap(page => page.data);
    }, [data]);

    return (
        <section className="relative my-10 mb-0 flex w-full flex-col gap-4 text-white md:mb-20">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                <Star
                    variant="star"
                    className="hidden opacity-60 md:top-[3rem] md:left-[5rem] md:block"
                    rotate={-110}
                    delay={1}
                />

                <Star
                    variant="star"
                    className="hidden md:top-[7rem] md:left-[10rem] md:block"
                    width={63}
                    height={63}
                    delay={0.5}
                />

                {/* Light gradient */}
                <div className="fade-from-right-bg absolute top-[20rem] right-0 h-[100rem] w-[30vw] bg-blueviolet-100/20 blur-xs" />

                <Image
                    src="/decoration/waves.svg"
                    className={`fade-from-top-bottom-bg -translate-x-1/2 absolute left-1/2 hidden w-11/12 transform md:bottom-[4rem] md:block md:w-max ${resources && resources.length === 0 ? "hidden" : ""}`}
                    width={1200}
                    height={280}
                    alt=""
                />

                <Star
                    variant="star"
                    className="hidden md:right-[15rem] md:bottom-[-4rem] md:block"
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:right-[14rem] md:bottom-[-5rem] md:block"
                    rotate={30}
                    width={63}
                    height={63}
                    delay={0.5}
                />
            </div>
            <div className="flex flex-col gap-3 px-8 text-center md:px-10 lg:mb-14">
                <p className="color-gradient font-monocode text-xs md:text-base">
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
            {resources && resources.length !== 0 && (
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
