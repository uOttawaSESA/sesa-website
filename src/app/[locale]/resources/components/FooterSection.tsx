import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const FooterSection: React.FC = () => {
    const t = useTranslations("resources");

    return (
        <div className="relative">
            {/* Decorations */}
            <div className="pointer-events-none select-none">
                {/* Light gradient */}
                <div className="fade-from-center-bg absolute right-[5rem] top-[6rem] hidden h-[80rem] w-[100vw] bg-blueviolet-100 bg-opacity-25 blur-3xl backdrop-blur-2xl md:block" />

                <Image
                    src="/decoration/star.svg"
                    className="absolute left-[14rem] hidden rotate-[-110deg] transform md:left-[25rem] md:top-[55rem] md:block"
                    width={120}
                    height={120}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="absolute right-[14rem] hidden md:right-[10rem] md:top-[14rem] md:block"
                    width={120}
                    height={120}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute right-[2rem] top-[29rem] rotate-[30deg] transform md:right-[9rem] md:top-[19rem]"
                    width={63}
                    height={63}
                    alt=""
                />
            </div>
            {/* CTA Section */}
            <div className="mt-5 flex flex-col items-center justify-center md:mt-16 md:flex-row md:gap-6">
                <div className="flex flex-col items-center text-center">
                    <h2 className="mb-8 font-heading text-lg uppercase">
                        {t("contributing_heading")}
                    </h2>
                </div>
                <div className="flex -translate-y-4 transform items-center justify-center">
                    <Button asChild>
                        <a href="https://discord.com/invite/atYdx5HHCs" target="_blank">
                            {t("btn_join_discord")}
                        </a>
                    </Button>
                </div>
            </div>

            {/* Ange quote section */}
            <div className="my-20 flex flex-col-reverse items-center justify-start gap-12 align-middle md:my-36 md:h-[45rem] md:flex-row 2xl:gap-20">
                {/* Grid Gradient Back */}
                <div className="grid-overlay-left md:h-[43.93rem] md:w-[53vw] 2xl:w-[45vw]"></div>

                <div className="relative z-10 lg:block">
                    <Image
                        src="/resources-page/ange-quote.webp"
                        alt="SESA Group Photo"
                        className="h-auto w-auto object-contain"
                        width={703}
                        height={700}
                    />
                </div>

                <div className="z-10 mx-5 max-w-lg text-left text-white">
                    <div className="font-heading text-2xl uppercase">
                        “{t("education_quote_1")}{" "}
                        <span className="relative inline-block">
                            {t("education_quote_1_hl")}
                            <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                        </span>
                        {t("education_quote_2")}.”
                    </div>
                    <div className="my-3 flex items-center gap-4">
                        <Image
                            src="/imgs/team/ange.webp"
                            alt="Ange Emmanuel"
                            className="z-10 h-14 w-14 rounded-full object-cover"
                            width={50}
                            height={50}
                        />
                        <div>
                            <p className="z-20 mt-4 font-heading text-xl">ANGE EMMANUEL</p>
                            <p className="text-sm opacity-70">{t("academic_lead")}</p>
                        </div>
                    </div>
                    {/* Call To Action Button */}
                    <div className="mt-6">
                        <Button asChild className="relative z-10 font-heading text-lg uppercase">
                            <Link href="/about" className="block text-inherit">
                                Meet the Team
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterSection;
