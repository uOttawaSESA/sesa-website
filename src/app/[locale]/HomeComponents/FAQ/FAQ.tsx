import Button from "@/components/Button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    return (
        <>
            <section className="text-white md:w-full">
                <div className="mb-14 flex flex-col items-center justify-center gap-2">
                    <p className="font-monocode color-gradient">Frequently asked questions</p>
                    <h1 className="font-heading text-4xl uppercase leading-tight">
                        Got Questions?{" "}
                        <span className="relative inline-block">
                            We{"'"}ve got answers!
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
                                        Yes. It adheres to the WAI-ARIA design pattern.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHO CAN JOIN?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
                                        Yes. It comes with default styles that matches the other
                                        components&apos; aesthetic.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-lg text-white">
                                        WHAT MAKES SESA SPECIAL?
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-lg text-thistle">
                                        Yes. It&apos;s animated by default, but you can disable it
                                        if you prefer.
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
                    <Button>
                        Message Us <span className="text-gray-50 opacity-65">{` >`}</span>
                    </Button>
                </div>
                <div className="mt-5 text-center">
                    <p className="text-thistle">We&apos;ll get back to you within 48 hours.</p>
                </div>
            </section>
        </>
    );
};

export default FAQ;
