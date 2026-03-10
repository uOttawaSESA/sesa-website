import { Button } from "@repo/ui/components/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimateOnView from "@/components/AnimateOnView";
import Star from "@/components/decorations/star";
import { Link } from "@/i18n/navigation";
import SponsorsGrid from "../../sponsors/components/SponsorsGrid";

const Sponsors = () => {
    const t = useTranslations("homepage");

    return (
        <section className="relative">
            {/* Decorations */}
            <div className="pointer-events-none z-0 select-none">
                {/* Light gradient */}
                <div className="fade-from-center-bg absolute top-1/2 left-1/2 h-480 w-full -translate-x-1/2 -translate-y-1/2 bg-blueviolet-100/35 blur-xl md:w-[90vw]" />

                <Image
                    src="/decoration/sponsorships-floor-grid.svg"
                    className="fade-from-center-sponsorship-floor absolute left-1/2 z-0 hidden -translate-x-1/2 transform opacity-60 md:top-44 md:block"
                    width={1200}
                    height={1000}
                    alt=""
                />

                <Image
                    src="/decoration/floor-grid.svg"
                    className="fade-from-center-bg absolute bottom-10 left-1/2 h-[235px] -translate-x-1/2 transform object-cover object-bottom md:-bottom-18"
                    width={1200}
                    height={430}
                    alt=""
                />

                <Star
                    variant="star"
                    className="hidden md:top-12 md:left-20 md:block"
                    rotate={-110}
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:top-28 md:left-40 md:block"
                    rotate={30}
                    width={63}
                    height={63}
                    delay={0.5}
                />

                <Star
                    variant="star"
                    className="right-56 hidden md:top-56 md:right-40 md:block"
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="top-32 right-8 md:top-52 md:right-56"
                    rotate={30}
                    width={60}
                    height={60}
                    delay={0.5}
                />
            </div>

            <div className="text-center lg:my-20">
                <div className="flex w-full justify-center px-6">
                    {/* Content Container */}
                    <div className="relative z-10 text-center">
                        <p className="relative inline-block bg-clip-text! font-mono text-transparent text-xs [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                            {t("sponsors_partners")}
                        </p>
                        <h1 className="mx-auto mt-2 max-w-[30ch] font-heading text-2xl text-white uppercase leading-tight md:text-4xl">
                            <span className="relative inline-block">
                                <AnimateOnView animationClass="highlight-text">
                                    {t("sponsors_heading_h1_highlighted")}
                                </AnimateOnView>{" "}
                                {t("sponsors_heading_h1")}
                            </span>
                            <br />
                        </h1>

                        <p className="relative mx-auto mt-4 w-full max-w-160 font-sans text-base text-thistle md:text-lg">
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
