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
import { useTranslations } from "next-intl";
import { Link as I18nLink } from "@/i18n/navigation";

const FAQ = () => {
    const t = useTranslations("homepage");

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
                                        {t("faq_q1_title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>SESA</b> {t("faq_q1_intro")}
                                            </p>
                                            <p>{t("faq_q1_initiatives")}</p>
                                            <ul className="space-y-2 pl-4">
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 text-purple-400">•</span>
                                                    <span>
                                                        <b>{t("faq_q1_point1_bold")}</b>{" "}
                                                        {t("faq_q1_point1_text")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 text-purple-400">•</span>
                                                    <span>
                                                        <b>{t("faq_q1_point2_bold")}</b>{" "}
                                                        {t("faq_q1_point2_text")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 text-purple-400">•</span>
                                                    <span>
                                                        <b>{t("faq_q1_point3_bold")}</b>{" "}
                                                        {t("faq_q1_point3_text")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 text-purple-400">•</span>
                                                    <span>
                                                        <b>{t("faq_q1_point4_bold")}</b>{" "}
                                                        {t("faq_q1_point4_text")}
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="mt-1 text-purple-400">•</span>
                                                    <span>
                                                        <b>{t("faq_q1_point5_bold")}</b>{" "}
                                                        {t("faq_q1_point5_text")}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        {t("faq_q2_title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>{t("faq_q2_intro_bold")}</b>{" "}
                                                {t("faq_q2_intro_text")}
                                            </p>
                                            <p>
                                                {t("faq_q2_everyone_part1")}{" "}
                                                <b>{t("faq_q2_everyone_types")}</b>
                                                {t("faq_q2_everyone_part2")}
                                            </p>
                                            <div>
                                                <p>
                                                    <b>{t("faq_q2_team_member")}</b>
                                                </p>
                                                <ul className="mt-2 space-y-2 pl-4">
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-1 text-purple-400">
                                                            •
                                                        </span>
                                                        <span>
                                                            <b>{t("faq_q2_requirement1_bold")}</b>{" "}
                                                            {t("faq_q2_requirement1_text")}
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="mt-1 text-purple-400">
                                                            •
                                                        </span>
                                                        <span>
                                                            {t("faq_q2_requirement2_part1")}{" "}
                                                            <b>{t("faq_q2_requirement2_bold")}</b>{" "}
                                                            {t("faq_q2_requirement2_part2")}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        {t("faq_q3_title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <div className="flex flex-col gap-4">
                                            <p>
                                                <b>{t("faq_q3_answer1_bold")}</b>
                                                {t("faq_q3_answer1_part1")}{" "}
                                                <b>{t("faq_q3_answer1_values")}</b>
                                                {t("faq_q3_answer1_part2")}
                                            </p>
                                            <p>
                                                {t("faq_q3_answer2_part1")}{" "}
                                                <b>{t("faq_q3_answer2_bold")}</b>{" "}
                                                {t("faq_q3_answer2_part2")}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4" className="border-purple-600 px-4">
                                    <AccordionTrigger className="py-4 font-heading text-base text-white md:text-lg">
                                        {t("faq_q4_title")}
                                    </AccordionTrigger>
                                    <AccordionContent className="font-sans text-base text-thistle md:text-lg">
                                        <p>
                                            <span>{t("faq_q4_answer_part1")}</span>
                                            <b>{t("faq_q4_events_list")}</b>
                                            <span>{t("faq_q4_answer_part2")}</span>
                                            <b>Blackberry</b>
                                            <span>{`, `}</span>
                                            <b>Shopify</b>
                                            <span>{`, `}</span>
                                            <b>SurveyMonkey</b>
                                            <span>{`, and `}</span>
                                            <b>Warp</b>
                                            <span>{t("faq_q4_answer_part3")}</span>
                                            <I18nLink
                                                href="/SponsorsPage"
                                                className="underline hover:text-white"
                                            >
                                                {t("faq_q4_sponsor_page_link")}
                                            </I18nLink>
                                            <span>{t("faq_q4_answer_part4")}</span>
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-7 text-center font-heading uppercase md:gap-4">
                    <h2 className="w-max text-sm md:text-xl">{t("faq_missed_something")}</h2>
                    <Button asChild>
                        <Link href={`/${locale}/ContactUsPage`}>
                            {t("faq_message_us_btn")}{" "}
                            <span className="text-gray-50/65">{` >`}</span>
                        </Link>
                    </Button>
                </div>
                <p className="text-center text-sm text-thistle">{t("faq_response_time")}</p>
            </section>
        </>
    );
};

export default FAQ;
