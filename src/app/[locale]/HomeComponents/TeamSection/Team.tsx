"use client";
import Button from "@/components/Button";
import CircleImage from "@/components/CircleImage";
import Marquee from "react-fast-marquee";
import { membersData } from "@/app/data/Members";
import { useState } from "react";
import Image from "next/image";

const Team = () => {
    const [hovered, setHovered] = useState<string>("");

    return (
        <>
            <section className="mb-28">
                <div className="mb-14 flex flex-col items-center justify-center gap-2">
                    <div className="mb-4 flex flex-row gap-3">
                        <Image src="/logo-filled.svg" width={50} height={50} alt="sesa" />
                        <Image src="/logo-text.svg" width={111} height={50} alt="sesa" />
                    </div>
                    <h1 className="w-[47rem] text-center font-heading text-4xl uppercase leading-tight">
                        The{" "}
                        <span className="relative inline-block">
                            Univeristy of Ottawa&apos;s
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>{" "}
                        Software Engineering Students Association
                    </h1>
                    <p className="mt-2 px-96 text-center font-sans text-xl text-thistle">
                        Our communications team meticulously crafted the web design, while our
                        development team built it with heart.
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <div className="flex space-x-4 font-heading">
                        <Button className="font-heading text-lg uppercase" href="#">
                            Become a sponsor <span className="text-gray opacity-50">{">"}</span>
                        </Button>

                        <Button
                            className="font-heading text-lg uppercase"
                            variant="outline"
                            href="/ContactUsPage"
                        >
                            Get in touch
                        </Button>
                    </div>
                </div>

                <div className="relative mt-12 bg-transparent">
                    <Marquee pauseOnHover speed={40}>
                        <div className="flex flex-row py-5">
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
