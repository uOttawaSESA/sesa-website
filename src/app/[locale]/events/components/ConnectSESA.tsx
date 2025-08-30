import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ConnectSESA = () => {
    const t = useTranslations("events");

    return (
        <>
            <div className="pointer-events-none relative w-full select-none">
                {/* Decorations */}
                <Image
                    src="/decoration/star.svg"
                    className="bottom absolute left-[14rem] top-[-6rem] rotate-[-110deg] transform md:top-[-3rem]"
                    width={82}
                    height={82}
                    alt=""
                />
                <Image
                    src="/decoration/star.svg"
                    className="bottom absolute right-[14rem] top-[-5rem] hidden md:block"
                    width={121}
                    height={121}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute left-[18rem] top-[-3rem] md:top-0"
                    width={50}
                    height={50}
                    alt=""
                />
            </div>
            <div>
                <div className="mx-auto max-w-7xl text-center">
                    <div className="color-gradient font-mono">{t("connect_with_sesa")}</div>
                    <h1 className="mt-4 text-[36px] uppercase">
                        <span className="highlight-text">{t("stay_updated")}</span>
                        <span className="ml-7">{t("stay_updated_hl")}</span>
                    </h1>

                    <p className="mx-auto mb-6 mt-6 max-w-[558px] font-mono text-[16px] text-thistle">
                        {t("stay_updated_blurb")}
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Button size="icon" variant="outline" asChild>
                            <a href="https://www.instagram.com/uottawasesa/" target="_blank">
                                <Image
                                    src="/icons/instagram-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="Instagram Logo"
                                />
                            </a>
                        </Button>
                        <Button size="icon" variant="outline" asChild>
                            <a href="https://discord.com/invite/atYdx5HHCs" target="_blank">
                                <Image
                                    src="/icons/discord-plain.svg"
                                    width={25}
                                    height={25}
                                    alt="Discord Logo"
                                />
                            </a>
                        </Button>
                        <Button size="icon" variant="outline" asChild>
                            <a href="https://github.com/uOttawaSESA" target="_blank">
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
            </div>
        </>
    );
};

export default ConnectSESA;
