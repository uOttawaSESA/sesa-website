"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const ContactDetails = () => {
    const t = useTranslations("contact_us");

    return (
        <div>
            {/* <div className="absolute bottom-0 left-0 h-full w-1/2">
                <GridGlobe />
            </div> */}

            <div className="">
                <p className="color-gradient font-mono text-xs md:text-base">{t("contact_us")}</p>

                <h1 className="mt-2 font-heading text-3xl uppercase leading-tight md:mt-4 md:text-5xl">
                    {t("get_in_touch")}{" "}
                    <span className="highlight-text">{t("get_in_touch_hl")}</span>
                </h1>

                <p className="mb-5 mt-4 max-w-[558px] font-sans text-thistle md:mb-7 md:text-xl">
                    {t("questions_blurb")}
                </p>

                <Button
                    className="flex items-center gap-3 font-heading text-base uppercase md:text-xl"
                    style={{ width: "fit-content" }}
                    onClick={() => navigator.clipboard.writeText("uottawa.sesa@gmail.com")}
                >
                    uottawa.sesa@gmail.com
                    <Image
                        src="/contact-page/Vector.svg"
                        alt="Vector Icon"
                        width={17}
                        height={20}
                        className="ml-2"
                    />
                </Button>

                <div className="mt-7 space-y-1 font-mono text-sm text-thistle md:text-base">
                    <p>800 King Edward Ave,</p>
                    <p>Ottawa, ON, K1N 1A2,</p>
                    <p>STE 0109</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
