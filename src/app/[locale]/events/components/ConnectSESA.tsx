import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";

const ConnectSESA = () => {
    const t = useTranslations("events");

    return (
        <>
            <div className="relative w-full select-none">
                {/* Decorations */}
                <Star
                    variant="star"
                    className="left-[14rem] top-[-6rem] md:top-[-3rem]"
                    delay={1}
                    width={82}
                    height={82}
                    rotate={-110}
                />

                <Star variant="star" className="right-[14rem] top-[-5rem]" delay={1.5} />

                <Star
                    variant="star-faded"
                    className="left-[18rem] top-[-3rem] md:top-0"
                    delay={2}
                />
            </div>
            <div className="mx-auto lg:max-w-3xl lg:my-36 px-8 max-w-7xl md:text-center">
                <div className="text-sm md:text-base color-gradient font-mono">
                    {t("connect_with_sesa")}
                </div>
                <h1 className="mt-1 text-3xl md:text-5xl uppercase">
                    <span className="highlight-text">{t("stay_updated")}</span>
                    <span> {t("stay_updated_hl")}</span>
                </h1>

                <p className="mt-4 font-mono text-sm md:text-lg text-thistle">
                    {t("stay_updated_blurb")}
                </p>

                <div className="mt-4 flex justify-start md:justify-center gap-4">
                    <Button size="icon" variant="outline" asChild>
                        <a
                            href="https://www.instagram.com/uottawasesa/"
                            target="_blank"
                            rel="noopener"
                        >
                            <Image
                                src="/icons/instagram-plain.svg"
                                width={25}
                                height={25}
                                alt="Instagram Logo"
                            />
                        </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                        <a
                            href="https://discord.com/invite/atYdx5HHCs"
                            target="_blank"
                            rel="noopener"
                        >
                            <Image
                                src="/icons/discord-plain.svg"
                                width={25}
                                height={25}
                                alt="Discord Logo"
                            />
                        </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                        <a href="https://github.com/uOttawaSESA" target="_blank" rel="noopener">
                            <Image
                                src="/icons/github-plain.svg"
                                width={25}
                                height={25}
                                alt="GitHub Logo"
                            />
                        </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                        <a
                            href="https://www.linkedin.com/company/software-engineering-students-association/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/icons/linkedin-plain.svg"
                                width={25}
                                height={25}
                                alt="LinkedIn Logo"
                            />
                        </a>
                    </Button>
                    <Button size="icon" variant="outline" asChild>
                        <a
                            href="https://www.youtube.com/@uottawasesa527"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="/icons/youtube-plain.svg"
                                width={25}
                                height={25}
                                alt="YouTube Logo"
                            />
                        </a>
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ConnectSESA;
