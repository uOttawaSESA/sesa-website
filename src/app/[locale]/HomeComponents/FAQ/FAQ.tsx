import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const FAQ = () => {
    return (
        <>
            <section className="relative flex flex-col gap-8 px-8 text-white md:px-20 xl:px-32 2xl:px-96">
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
                        We have A&apos;s to your Q&apos;s below. If you still have questions,
                        contact us and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                {/* Accordion */}
                <div className="backdrop-blue-lg flex justify-center">
                    <div className="relative w-full overflow-hidden border border-purple-600">
                        <div className="clip-corner-inner">
                            <Accordion
                                type="single"
                                collapsible
                                className="outline-gradient w-full overflow-hidden rounded-br-2xl border"
                            >
                                <AccordionItem
                                    value="item-1"
                                    className="border-purple-600 px-4 leading-tight"
                                >
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT IS SESA?
                                    </AccordionTrigger>
                                    <AccordionContent className="tight font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>SESA</b> is the University of Ottawa{" "}
                                                <b>Software Engineering Students Association</b>!
                                                We&apos;re an informally and independently run
                                                student organization with the mission of{" "}
                                                <b>enriching SEG student life</b>,{" "}
                                                <b>promoting software engineering</b> as a field,
                                                and{" "}
                                                <b>
                                                    supporting students academically and
                                                    professionally
                                                </b>{" "}
                                                as they begin their careers.
                                            </p>

                                            <p>
                                                Our initiatives are designed to help students
                                                succeed both in and out of the classroom. These
                                                include:
                                            </p>

                                            <ul className="list-disc space-y-1 pl-10">
                                                <li>
                                                    <b>Professional development workshops</b> and{" "}
                                                    <b>networking events</b> for students
                                                </li>
                                                <li>
                                                    <b>Academic support</b> through study resources
                                                </li>
                                                <li>
                                                    <b>Social and community-building events</b> to
                                                    bring students together
                                                </li>
                                                <li>
                                                    <b>Student outreach</b> to inspire and engage
                                                    future engineers
                                                </li>
                                                <li>
                                                    <b>Advocacy</b> for the SEG student voice within
                                                    uOttawa
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-2" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHO CAN JOIN?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>SESA events are open to everyone</b> — not just
                                                software engineering students!
                                            </p>

                                            <p>
                                                Whether you&apos;re a <b>high school student</b>,{" "}
                                                <b>community member</b>, <b>undergraduate</b>,{" "}
                                                <b>graduate</b>, or <b>alum</b>, you&apos;re welcome
                                                to attend (unless stated otherwise).
                                            </p>

                                            <div>
                                                <p className="mb-2">
                                                    <b>To become a SESA team member:</b>
                                                </p>
                                                <ul className="list-disc space-y-1 pl-10">
                                                    <li>
                                                        <b>
                                                            You must be an enrolled uOttawa student
                                                        </b>{" "}
                                                        (undergraduate or graduate, full-time or
                                                        part-time).
                                                    </li>
                                                    <li>
                                                        You don&apos;t have to be in the{" "}
                                                        <b>software engineering program</b> — just
                                                        passionate about the community.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-3" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT MAKES SESA SPECIAL?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>SESA is run by students, for students</b>, with a
                                                focus on <b>community</b>, <b>collaboration</b>, and{" "}
                                                <b>creating opportunities</b>.
                                            </p>

                                            <p>
                                                We&apos;re committed to building an{" "}
                                                <b>inclusive space</b> where anyone can get
                                                involved, learn, and grow.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value="item-4" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        WHAT EVENTS DOES SESA HOST?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                SESA hosts tech-related events each year at the
                                                University of Ottawa, including{" "}
                                                <b>
                                                    technical workshops, career fairs, meet and
                                                    greets, mock interviews, and product launches
                                                </b>
                                                .
                                            </p>

                                            <p>
                                                Many of these activities are in partnership with
                                                community organizations, such as <b>Blackberry</b>,{" "}
                                                <b>Shopify</b>, <b>SurveyMonkey</b>, and <b>Warp</b>{" "}
                                                to help organize high quality experiences comparable
                                                to the professional workplace.
                                            </p>

                                            <p>
                                                For organizations or identities interested in
                                                collaborating with us, visit our{" "}
                                                <Link
                                                    href="/SponsorsPage"
                                                    className="underline hover:text-white"
                                                >
                                                    Sponsor page
                                                </Link>{" "}
                                                for more information.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-7 text-center font-heading uppercase md:gap-4">
                    <h2 className="w-max text-sm md:text-xl">Did we miss something?</h2>
                    <Button asChild>
                        <Link href="ContactUsPage">
                            MESSAGE US
                            {/* <span className="ms-2 text-gray-50/65">{` >`}</span> */}
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
