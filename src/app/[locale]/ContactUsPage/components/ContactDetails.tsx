"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GridGlobe from "./GridGlobe";
import { useTranslations } from "next-intl";

const ContactDetails = () => {
    const t = useTranslations("contact_us");

    return (
        <div className="relative flex-1">
            <div className="absolute bottom-0 left-0 h-full w-1/2">
                <GridGlobe />
            </div>

            <div className="space-y-4 md:space-y-6">
                <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent">
                    {t("contact_us")}
                </span>

                <h1 className="mt-4 font-heading text-5xl uppercase leading-tight">
                    {t("get_in_touch")}{" "}
                    <span className="highlight-text">{t("get_in_touch_hl")}</span>
                </h1>

                <p className="mt-4 max-w-[558px] font-sans text-xl text-thistle">
                    {t("questions_blurb")}
                </p>

                <Button
                    className="flex items-center gap-3 font-heading text-lg uppercase transition-opacity hover:opacity-80 md:text-xl"
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

                <div className="space-y-1 font-mono text-sm text-thistle md:text-base">
                    <p>800 King Edward Ave,</p>
                    <p>Ottawa, ON, K1N 1A2,</p>
                    <p>STE 0109</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
