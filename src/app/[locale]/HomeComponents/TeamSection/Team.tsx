"use client";
import { Button } from "@/components/ui/button";
import CircleImage from "@/components/CircleImage";
import { Link } from "@/i18n/navigation";
import Marquee from "react-fast-marquee";
import { membersData } from "@/app/data/Members";
import { useState } from "react";
import Image from "next/image";

const Team = () => {
    const [hovered, setHovered] = useState<string>("");

    return (
        <>
            <section className="mb-12 flex flex-col gap-16 md:mb-16 xl:mb-24">
                <div className="flex flex-col items-center justify-center gap-4 px-8 md:px-20 xl:px-32">
                    <div className="flex flex-row gap-3">
                        <Image src="/logo-filled.svg" width={50} height={50} alt="sesa" />
                        <Image src="/logo-text.svg" width={111} height={50} alt="sesa" />
                    </div>
                    <h1 className="text-center font-heading text-2xl uppercase leading-tight md:text-3xl xl:text-5xl">
                        The&nbsp;
                        <span className="highlight-text">University of Ottawa&apos;s</span> Software
                        Engineering Students Association
                    </h1>
                    <p className="text-center font-sans text-base text-thistle md:text-lg xl:text-xl">
                        Our communications team meticulously crafted the web design, while our
                        development team built it with heart.
                    </p>
                </div>

                <div className="flex justify-center gap-4 px-8 text-center font-heading">
                    <Button
                        className="w-full font-heading text-sm uppercase sm:w-max md:text-lg xl:text-xl"
                        asChild
                    >
                        <a href="#">
                            Become a sponsor <span className="text-gray opacity-50">{">"}</span>
                        </a>
                    </Button>

                    <Button
                        className="w-full font-heading text-sm uppercase sm:w-max md:text-lg xl:text-xl"
                        variant="outline"
                        asChild
                    >
                        <Link href="/ContactUsPage">Get in touch</Link>
                    </Button>
                </div>

                <div className="relative bg-transparent">
                    <Marquee pauseOnHover speed={40}>
                        <div className="flex flex-row">
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

                    {/* Hover text container - positioned absolutely */}
                    {hovered && (
                        <div className="absolute left-1/2 top-14 z-10 mt-12 -translate-x-1/2 px-4 py-2 text-center">
                            <h1 className="mb-2 font-heading text-xl">
                                {membersData.find(m => m.name === hovered)?.name}
                            </h1>
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
