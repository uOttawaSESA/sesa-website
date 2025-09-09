import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Star from "@/components/ui/decorations/star";
import { Link } from "@/i18n/navigation";

export default function Hero() {
    const t = useTranslations("homepage");

    return (
        <section className="xl:items-between relative mt-5 mb-8 flex h-max w-full flex-col items-start justify-between gap-24 text-white md:mt-28 md:mb-20 lg:flex-row">
            {/* Decorations */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none">
                {/* Warm gradient */}
                <div className="fade-from-top-left-bg absolute top-[-13rem] h-[70rem] w-full bg-[#B1219D]/20 blur-xs md:w-[60vw]" />

                {/* Light gradient */}
                <div className="fade-from-left-bg absolute top-[48rem] h-[140rem] w-[25vw] bg-blueviolet-100/25 blur-xs" />

                {/* Stars */}
                <Star
                    variant="star-faded"
                    className="hidden opacity-60 md:top-[-3rem] md:left-[40vw] md:block"
                    width={55}
                    height={55}
                    rotate={30}
                />

                {/* Middle Group */}
                <Star
                    variant="star"
                    className="hidden md:top-[55vh] md:left-[12vw] md:block 2xl:top-[40vh] 2xl:left-[33vw]"
                    width={120}
                    height={120}
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:top-[53vh] md:left-[10vw] md:block 2xl:top-[37vh] 2xl:left-[32vw]"
                    width={63}
                    height={63}
                    delay={0.5}
                />

                {/* Bottom Right Group */}
                <Star
                    variant="star"
                    className="hidden md:top-[41rem] md:right-[15rem] md:block"
                    width={120}
                    height={120}
                    delay={1}
                />

                <Star
                    variant="star-faded"
                    className="hidden md:top-[46rem] md:right-[20rem] md:block"
                    width={63}
                    height={63}
                    delay={0.5}
                />
            </div>

            {/* Content Container */}
            <div className="relative max-w-80 ps-8 sm:max-w-md md:max-w-2xl md:ps-20 xl:ps-32">
                <p className="relative inline-block bg-clip-text! text-left font-monocode text-transparent text-xs [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,#8824dc,#b1219d)] md:text-base">
                    {t("we_are_sesa")}
                </p>
                <h1 className="my-2 font-heading text-3xl uppercase leading-tight md:text-5xl">
                    <span className="highlight-text">{t("bridging_the_gap_hl")}</span>
                    <br />
                    {t("bridging_the_gap")}
                </h1>
                <p className="relative flex items-center text-left font-sans text-base text-thistle leading-tight md:text-lg">
                    {t("purpose")}
                </p>
                <div className="mt-4 flex gap-2 font-heading md:mt-6">
                    <Button className="font-heading text-sm uppercase md:text-lg" asChild>
                        <Link href="/about">{t("learn_more")}</Link>
                    </Button>
                    <Button
                        className="font-heading text-sm uppercase md:text-lg"
                        variant="outline"
                        asChild
                    >
                        <Link href="https://linktr.ee/uottawa.sesa">{t("get_involved")}</Link>
                    </Button>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="relative w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <Image
                    src="/imgs/Home/heroImage.webp"
                    alt="SESA Group Photo"
                    className="relative z-10 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:h-[500px]"
                    width={2000}
                    height={1200}
                    priority
                />
                <Image
                    src="/decoration/grid-mobile.svg"
                    alt=""
                    className="fade-from-top-grid-mobile absolute top-[-6.5rem] block md:hidden"
                    width={700}
                    height={700}
                />
                <div className="grid-overlay-right -top-12 lg:-top-24 z-0 hidden h-[350px] w-full sm:h-[500px] md:block md:h-[700px] lg:h-[43.9rem] lg:w-[53vw]"></div>
            </div>
        </section>
    );
}
