import { Button } from "@/components/ui/button";
import SponsorsGrid from "../../sponsors/components/SponsorsGrid";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Sponsors = () => {
    const t = useTranslations("homepage");

    return (
        <section className="relative">
            {/* Decorations */}
            <div className="pointer-events-none z-0 select-none">
                {/* Light gradient */}
                <div className="fade-from-center-bg absolute left-1/2 top-1/2 h-[120rem] w-full -translate-x-1/2 -translate-y-1/2 bg-blueviolet-100 bg-opacity-35 blur-xl md:w-[90vw]" />

                <Image
                    src="/decoration/large-wavy-grid.svg"
                    className="fade-from-top-bottom-bg absolute left-1/2 top-[8rem] h-[850px] -translate-x-1/2 transform object-cover md:top-[19rem]"
                    width={1000}
                    height={1870}
                    alt=""
                />

                <Image
                    src="/decoration/star.svg"
                    className="absolute hidden rotate-[-110deg] transform md:left-[5rem] md:top-[3rem] md:block"
                    width={120}
                    height={120}
                    alt=""
                />
                <Image
                    src="/decoration/star-faded.svg"
                    className="absolute hidden rotate-[30deg] transform md:left-[10rem] md:top-[7rem] md:block"
                    width={63}
                    height={63}
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
                    className="absolute right-[2rem] top-[8rem] rotate-[30deg] transform md:right-[14rem] md:top-[13rem]"
                    width={60}
                    height={60}
                    alt=""
                />
            </div>

            <div className="text-center lg:my-20">
                <div className="flex w-full justify-center px-6">
                    {/* Content Container */}
                    <div className="relative z-10 text-center">
                        <p className="relative inline-block !bg-clip-text font-mono text-xs text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)] md:text-base">
                            {t("sponsors_partners")}
                        </p>
                        <h1 className="mx-auto mt-2 max-w-[30ch] font-heading text-2xl uppercase leading-tight text-white md:text-4xl">
                            <span className="relative inline-block">
                                <span className="highlight-text">
                                    {t("sponsors_heading_h1_highlighted")}
                                </span>{" "}
                                {t("sponsors_heading_h1")}
                            </span>
                            <br />
                        </h1>

                        <p className="relative mx-auto mt-4 w-full max-w-[40rem] font-sans text-base text-thistle md:text-lg">
                            {t("sponsors_subheading")}
                        </p>
                        <div className="mt-6 flex justify-center space-x-4 font-heading text-white">
                            <Button className="font-heading text-sm uppercase md:text-lg" asChild>
                                <Link href="/sponsors">{t("become_sponsor_btn")}</Link>
                            </Button>
                            <Button
                                className="font-heading text-sm uppercase md:text-lg"
                                variant="outline"
                                asChild
                            >
                                <Link href="/about">{t("meet_team_btn")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="relative z-20">
                    <SponsorsGrid />
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
