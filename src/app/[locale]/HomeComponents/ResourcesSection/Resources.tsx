import { resources } from "@/app/data/Resources";
import ResourceCard from "../../ResourcesPage/components/ResourceCard";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Resources = () => {
    return (
        <>
            <section className="flex w-full flex-col gap-4 text-white">
                <div className="flex flex-col gap-2 px-8 text-center md:px-20 md:text-left xl:px-32">
                    <p className="font-monocode color-gradient">
                        Resources by students for students
                    </p>
                    <h1 className="font-heading text-2xl uppercase leading-tight md:text-5xl">
                        Resources at your&nbsp;
                        <span className="relative inline-block">
                            Fingertips
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>
                    </h1>
                    <p className="font-sans text-base text-thistle md:text-lg">
                        Our academic team actively organize free resources to support software
                        engineering students in their studies.
                    </p>
                </div>
                {/* Carousel */}
                <Marquee pauseOnHover>
                    <div className="flex flex-col gap-4">
                        {/* Two rows with gap */}
                        {/* First Row */}
                        <div className="me-4 flex gap-4">
                            {resources
                                .slice(0, Math.ceil(resources.length / 2))
                                .map((resource, index) => (
                                    <div key={index}>
                                        <ResourceCard
                                            title={resource.title}
                                            category={resource.category}
                                            course={resource.course}
                                            rating={resource.rating}
                                            tier={resource.tier}
                                            format={resource.format}
                                        />
                                    </div>
                                ))}
                        </div>
                        {/* Second Row */}
                        <div className="me-4 flex gap-4">
                            {resources
                                .slice(Math.ceil(resources.length / 2))
                                .map((resource, index) => (
                                    <div key={index}>
                                        <ResourceCard {...resource} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </Marquee>

                <div className="space-y-4 px-8 md:px-32">
                    <div className="flex w-full justify-center gap-4 font-heading">
                        <Button className="text-sm md:text-lg" asChild>
                            <Link href="/ResourcesPage">
                                Explore all resources{" "}
                                <span className="text-gray opacity-50">{">"}</span>
                            </Link>
                        </Button>
                        <Button className="text-sm md:text-lg" variant="outline" asChild>
                            <a href="https://discord.com/invite/atYdx5HHCs" target="_blank">
                                Join our discord
                            </a>
                        </Button>
                    </div>
                    <div className="hidden w-full items-center justify-center text-center font-mono text-sm text-thistle md:text-base lg:flex">
                        <Image
                            src="/resources-page/thumbsup.svg"
                            alt="thumbsUp"
                            width={25}
                            height={25}
                            className="me-2 size-5 md:size-8"
                        ></Image>
                        <p>95% average helpfulness, 1000+ students helped</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Resources;
