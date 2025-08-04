"use client";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

const FAQ = () => {
    // Get the current locale from the dynamic route params
    const params = useParams();
    const locale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || "en";

    return (
        <>
            <section className="relative flex flex-col gap-8 px-8 text-white md:px-20 xl:px-32">
                {/* Decorations */}
                <div className="pointer-events-none select-none">
                    {/* Warm gradient */}
                    <div className="fade-from-center-bg absolute left-1/2 top-1/2 h-[120rem] w-full -translate-x-1/2 -translate-y-1/2 bg-[#B1219D] bg-opacity-20 blur-xl md:w-[100rem]" />

                    <Image
                        src="/decoration/star.svg"
                        className="absolute hidden rotate-[-110deg] transform md:left-[8rem] md:top-[1rem] md:block"
                        width={120}
                        height={120}
                        alt=""
                    />

                    <Image
                        src="/decoration/star-faded.svg"
                        className="absolute right-[2rem] top-[8rem] hidden rotate-[30deg] transform md:right-[10rem] md:top-[7rem] md:block"
                        width={60}
                        height={60}
                        alt=""
                    />

                    <Image
                        src="/decoration/star.svg"
                        className="absolute hidden md:bottom-[-8rem] md:right-[5rem] md:block"
                        width={120}
                        height={120}
                        alt=""
                    />
                    <Image
                        src="/decoration/star-faded.svg"
                        className="absolute hidden md:bottom-[-8rem] md:right-[10rem] md:block"
                        width={63}
                        height={63}
                        alt=""
                    />
                </div>
                <div className="backdrop-blue-xl flex flex-col items-center justify-center gap-3">
                    <p className="font-monocode color-gradient text-xs md:text-base">
                        Frequently asked questions
                    </p>
                    <h1 className="text-center font-heading text-2xl uppercase leading-tight md:text-4xl">
                        Got Questions?&nbsp;
                        <span className="highlight-text">We&apos;ve got answers!</span>
                    </h1>
                    <p className="max-w-sm text-center font-sans text-base text-thistle md:max-w-lg md:text-lg xl:max-w-xl">
                        We have A’s to your Q’s below. If you still have questions, contact us and
                        we’ll get back to you as soon as possible.
                    </p>
                </div>

                {/* Accordian */}
                <div className="backdrop-blue-lg flex justify-center">
                    <div className="relative w-full overflow-hidden border border-purple-600">
                        <div className="clip-corner-inner">
                            <Accordion
                                type="single"
                                collapsible
                                className="outline-gradient w-full overflow-hidden rounded-br-2xl border"
                            >
                                <AccordionItem value="item-1" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT IS SESA?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <b>SESA</b> is the University of Ottawa{" "}
                                        <b>Software Engineering Students Association</b>! We’re an
                                        informally and independently run student organization with
                                        the mission of <b>enriching SEG student life</b>,{" "}
                                        <b>promoting software engineering</b> as a field, and{" "}
                                        <b>supporting students academically and professionally</b>{" "}
                                        as they begin their careers.
                                        <br />
                                        <br />
                                        Our initiatives are designed to help students succeed both
                                        in and out of the classroom. These include:
                                        <ul className="mt-4 space-y-2 pl-4">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>Professional development workshops</b> and{" "}
                                                    <b>networking events</b> for students
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>Academic support</b> through study resources
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>Social and community-building events</b> to
                                                    bring students together
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>Student outreach</b> to inspire and engage
                                                    future engineers
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>Advocacy</b> for the SEG student voice within
                                                    uOttawa
                                                </span>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHO CAN JOIN?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <b>SESA events are open to everyone</b> — not just software
                                        engineering students!
                                        <br />
                                        <br />
                                        Whether you&apos;re a <b>high school student</b>,{" "}
                                        <b>community member</b>, <b>undergraduate</b>,{" "}
                                        <b>graduate</b>, or <b>alum</b>, you&apos;re welcome to
                                        attend (unless stated otherwise).
                                        <br />
                                        <br />
                                        <b>To become a SESA team member:</b>
                                        <ul className="mt-2 space-y-2 pl-4">
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    <b>You must be an enrolled uOttawa student</b>{" "}
                                                    (undergraduate or graduate, full-time or
                                                    part-time).
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="mt-1 text-purple-400">•</span>
                                                <span>
                                                    You don’t have to be in the{" "}
                                                    <b>software engineering program</b> — just
                                                    passionate about the community.
                                                </span>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT MAKES SESA SPECIAL?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <b>SESA is run by students, for students</b>, with a focus
                                        on <b>community</b>, <b>collaboration</b>, and{" "}
                                        <b>creating opportunities</b>.
                                        <br />
                                        <br />
                                        We’re committed to building an <b>inclusive space</b> where
                                        anyone can get involved, learn, and grow.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT EVENTS DOES SESA HOST?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <span>{`SESA hosts tech-related events each year at the University of Ottawa, including `}</span>
                                        <b>
                                            technical workshops, career fairs, meet and greets, mock
                                            interviews, and product launches
                                        </b>
                                        <span>{`. Many of these activities are in partnership with community organizations, such as `}</span>
                                        <b>Blackberry</b>
                                        <span>{`, `}</span>
                                        <b>Shopify</b>
                                        <span>{`, `}</span>
                                        <b>SurveyMonkey</b>
                                        <span>{`, and `}</span>
                                        <b>Warp</b>
                                        <span>
                                            {" "}
                                            to help organize high quality experiences comparable to
                                            the professional workplace. For organizations or
                                            identities interested in collaborating with us, visit
                                            our Sponsor page for more information.
                                        </span>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-7 text-center font-heading uppercase md:gap-4">
                    <h2 className="w-max text-sm md:text-xl">Did we miss something?</h2>
                    <Button asChild>
                        <Link href={`/${locale}/ContactUsPage`}>
                            MESSAGE US <span className="text-gray-50/65">{` >`}</span>
                        </Link>
                    </Button>
                </div>
                <p className="text-center text-sm text-thistle">
                    We&apos;ll get back to you within 48 hours.
                </p>
            </section>
        </>
    );
};

export default FAQ;
