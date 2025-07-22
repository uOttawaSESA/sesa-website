"use client";
import Image from "next/image";
import Button from "@/components/Button";
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
                <span className="from-blueviolet-100 to-darkmagenta bg-gradient-to-r bg-clip-text font-mono text-transparent">
                    {t("contact_us")}
                </span>

                <h1 className="font-heading mt-4 text-5xl leading-tight uppercase">
                    {t("get_in_touch")}{" "}
                    <span className="relative inline-block">
                        {t("get_in_touch_hl")}
                        <div className="animate-highlight from-blueviolet-100/25 to-darkmagenta/25 absolute top-0 right-0 h-full w-0 bg-gradient-to-r"></div>
                    </span>
                </h1>

                <p className="text-thistle mt-4 max-w-[558px] font-sans text-xl">
                    {t("questions_blurb")}
                </p>

                <Button
                    className="font-heading flex items-center gap-3 text-lg uppercase transition-opacity hover:opacity-80 md:text-xl"
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

                <div className="text-thistle space-y-1 font-mono text-sm md:text-base">
                    <p>800 King Edward Ave,</p>
                    <p>Ottawa, ON, K1N 1A2,</p>
                    <p>STE 0109</p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;
