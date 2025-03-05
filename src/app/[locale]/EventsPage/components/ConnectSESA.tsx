"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ConnectSESA = () => {
    const t = useTranslations("events");

    return (
        <div className="w-full">
            <div className="mx-auto max-w-7xl text-center">
                <div className="color-gradient font-mono">{t("connect_with_sesa")}</div>
                <h1 className="mt-4 text-[36px] uppercase">
                    <span className="relative inline-block">
                        {t("stay_updated")}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                    <span className="ml-7">{t("stay_updated_hl")}</span>
                </h1>

                <p className="mx-auto mb-6 mt-6 max-w-[558px] font-mono text-[16px] text-thistle">
                    {t("stay_updated_blurb")}
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Button
                        className="!p-3"
                        variant="outline"
                        href="https://www.instagram.com/uottawasesa/"
                        target="_blank"
                    >
                        <Image
                            src="/icons/instagram-plain.svg"
                            width={25}
                            height={25}
                            alt="Instagram Logo"
                        />
                    </Button>
                    <Button
                        className="!p-3"
                        variant="outline"
                        href="https://discord.com/invite/atYdx5HHCs"
                        target="_blank"
                    >
                        <Image
                            src="/icons/discord-plain.svg"
                            width={25}
                            height={25}
                            alt="Discord Logo"
                        />
                    </Button>
                    <Button
                        className="!p-3"
                        variant="outline"
                        href="https://github.com/uOttawaSESA"
                        target="_blank"
                    >
                        <Image
                            src="/icons/github-plain.svg"
                            width={25}
                            height={25}
                            alt="GitHub Logo"
                        />
                    </Button>
                    <Button
                        className="!p-3"
                        variant="outline"
                        href="https://www.linkedin.com/company/software-engineering-students-association/"
                        target="_blank"
                    >
                        <Image
                            src="/icons/linkedin-plain.svg"
                            width={25}
                            height={25}
                            alt="LinkedIn Logo"
                        />
                    </Button>
                    <Button
                        className="!p-3"
                        variant="outline"
                        href="https://www.youtube.com/@uottawasesa52"
                        target="_blank"
                    >
                        <Image
                            src="/icons/youtube-plain.svg"
                            width={25}
                            height={25}
                            alt="YouTube Logo"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConnectSESA;
