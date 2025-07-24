import Image from "next/image";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Hero() {
    const t = useTranslations("homepage");

    return (
        <section className="xl:items-between mb-8 mt-8 flex h-max w-full flex-col items-start justify-between gap-24 text-white lg:flex-row">
            {/* Content Container */}
            <div className="relative z-10 max-w-80 ps-8 sm:max-w-md md:max-w-2xl md:ps-20 xl:ps-32">
                <p className="font-monocode relative inline-block !bg-clip-text text-left text-base text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(55.37deg,_#8824dc,_#b1219d)]">
                    {t("we_are_sesa")}
                </p>
                <h1 className="my-2 font-heading text-2xl uppercase leading-tight md:text-5xl">
                    <span className="relative inline-block">
                        {t("bridging_the_gap_hl")}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                    <br />
                    {t("bridging_the_gap")}
                </h1>
                <p className="relative flex items-center text-left font-sans text-base leading-tight text-thistle md:text-lg">
                    {t("purpose")}
                </p>
                <div className="mt-4 flex gap-2 font-heading md:mt-6">
                    <Link href="/AboutPage">
                        <Button className="font-heading text-sm uppercase md:text-lg">
                            {t("learn_more")}
                        </Button>
                    </Link>
                    <Button
                        href="https://linktr.ee/uottawa.sesa"
                        external
                        className="font-heading text-sm uppercase md:text-lg"
                        variant="outline"
                    >
                        {t("get_involved")}
                    </Button>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="relative w-full">
                <Image
                    src="/imgs/Home/heroImage.webp"
                    alt="SESA Group Photo"
                    className="relative z-10 h-[250px] w-full object-cover sm:h-[400px] md:h-[600px] lg:h-[500px]"
                    width={700}
                    height={700}
                />
                <div className="grid-overlay-right -top-12 z-0 h-[350px] w-full sm:h-[500px] md:h-[700px] lg:-top-24 lg:h-[43.9rem] lg:w-[53vw]"></div>
            </div>
        </section>
    );
}
