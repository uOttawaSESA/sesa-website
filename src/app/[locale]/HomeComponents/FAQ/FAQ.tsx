import Button from "@/components/Button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useParams } from "next/navigation";

const FAQ = () => {
    // Get the current locale from the dynamic route params
    const params = useParams();
    const locale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || "en";

    return (
        <>
            <section className="text-white md:w-full">
                <div className="mb-14 flex flex-col items-center justify-center gap-2">
                    <p className="font-monocode color-gradient">Frequently asked questions</p>
                    <h1 className="font-heading text-4xl uppercase leading-tight">
                        Got Questions?{" "}
                        <span className="relative inline-block">
                            We&apos;ve got answers!
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>
                    </h1>
                    <p className="px-96 text-center font-sans text-xl text-thistle">
                        We have A’s to your Q’s below. If you still have questions, contact us and
                        we’ll get back to you as soon as possible.
                    </p>
                </div>

                {/* Accordian */}
                <div className="flex justify-center">
                    {/* Wrapper with the outer clip-corner (transparent) */}
                    <div className="clip-corner relative w-10/12 overflow-hidden rounded-br-2xl border border-purple-600">
                        {/* Inner content with the inner clip-corner (transparent) */}
                        <div className="clip-corner-inner">
                            <Accordion
                                type="single"
                                collapsible
                                className="outline-gradient w-full overflow-hidden rounded-br-2xl border"
                            >
                                <AccordionItem value="item-1" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHAT IS SESA?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
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
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHO CAN JOIN?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
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
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHAT MAKES SESA SPECIAL?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
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
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHAT EVENTS DOES SESA HOST?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
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

                <div className="mt-14 flex flex-row items-center justify-center gap-[25px] text-center font-heading uppercase">
                    <h2 className="text-xl">Did we miss something?</h2>
                    <Link href={`/${locale}/ContactUsPage`}>
                        <Button>
                            MESSAGE US <span className="text-gray-50 opacity-65">{` >`}</span>
                        </Button>
                    </Link>
                </div>
                <div className="mt-5 text-center">
                    <p className="text-thistle">We&apos;ll get back to you within 48 hours.</p>
                </div>
            </section>
        </>
    );
};

export default FAQ;
