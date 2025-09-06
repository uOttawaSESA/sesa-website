"use client";
import createDOMPurify from "dompurify";
import { marked } from "marked";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link } from "@/i18n/navigation";

const FAQ = () => {
    const t = useTranslations("homepage");

    // Only create DOMPurify when in browser
    const DOMPurify = useMemo(() => {
        if (typeof window !== "undefined") {
            return createDOMPurify(window);
        }
        return null;
    }, []);

    // Helper function to safely parse markdown
    const parseMarkdown = (markdown: string) => {
        const rawHTML = marked(markdown, { async: false }) as string;
        return DOMPurify ? DOMPurify.sanitize(rawHTML) : "";
    };

    // FAQ data structure
    const faqItems = [
        { id: "item-1", title: t("faq_q1.title"), answer: t("faq_q1.answer") },
        { id: "item-2", title: t("faq_q2.title"), answer: t("faq_q2.answer") },
        { id: "item-3", title: t("faq_q3.title"), answer: t("faq_q3.answer") },
        { id: "item-4", title: t("faq_q4.title"), answer: t("faq_q4.answer") },
    ];

    return (
        <section className="relative flex flex-col gap-8 px-8 text-white md:px-20 xl:px-32 2xl:px-96">
            {/* Decorations */}
            <div className="pointer-events-none select-none">
                {/* Warm gradient */}
                <div className="fade-from-center-bg absolute left-1/2 top-1/2 h-[120rem] w-full -translate-x-1/2 -translate-y-1/2 bg-[#B1219D] bg-opacity-20 blur-xl md:w-[100rem]" />

                <Star
                    variant="star"
                    className="hidden md:left-[8rem] md:top-[1rem] md:block"
                    rotate={-110}
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="absolute right-[2rem] top-[8rem] hidden md:right-[10rem] md:top-[7rem] md:block"
                    rotate={30}
                    width={60}
                    height={60}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="hidden md:bottom-[-8rem] md:right-[5rem] md:block"
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:bottom-[-8rem] md:right-[10rem] md:block"
                    width={63}
                    height={63}
                    delay={0.5}
                />
            </div>

            <div className="backdrop-blue-xl flex flex-col items-center justify-center gap-3">
                <p className="font-monocode color-gradient text-xs md:text-base">
                    {t("faq_subtitle")}
                </p>
                <h1 className="text-center font-heading text-2xl uppercase leading-tight md:text-4xl">
                    {t("faq_heading_h1")}&nbsp;
                    <span className="highlight-text">{t("faq_heading_h1_highlighted")}</span>
                </h1>
                <p className="max-w-sm text-center font-sans text-base text-thistle md:max-w-lg md:text-lg xl:max-w-xl">
                    {t("faq_description")}
                </p>
            </div>

            {/* Accordion */}
            <div className="backdrop-blue-lg flex justify-center backdrop-blur-lg">
                <div className="relative w-full overflow-hidden border border-purple-600">
                    <div className="clip-corner-inner">
                        <Accordion
                            type="single"
                            collapsible
                            className="outline-gradient w-full overflow-hidden rounded-br-2xl border"
                        >
                            {faqItems.map(item => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="border-purple-600 px-4 leading-tight"
                                >
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="markdown font-sans text-base text-thistle md:text-lg">
                                        {/* biome-ignore-start lint/security/noDangerouslySetInnerHtml: HTML has been sanitized */}
                                        <div
                                            className="prose prose-invert max-w-none [&>li]:mb-2 [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:pl-4 [&_a:hover]:text-white [&_a]:text-purple-400 [&_a]:underline"
                                            dangerouslySetInnerHTML={{
                                                __html: parseMarkdown(item.answer),
                                            }}
                                        />
                                        {/* biome-ignore-end lint/security/noDangerouslySetInnerHtml: HTML has been sanitized */}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-7 text-center font-heading uppercase md:gap-4">
                <h2 className="w-max text-sm md:text-xl">{t("faq_missed_something")}</h2>
                <Button asChild>
                    <Link href={"/contact"}>
                        {t("faq_message_us_btn")}{" "}
                        {/* <span className="text-gray-50/65">{` >`}</span> */}
                    </Link>
                </Button>
            </div>
            <p className="text-center text-sm text-thistle">{t("faq_response_time")}</p>
        </section>
    );
};

export default FAQ;
