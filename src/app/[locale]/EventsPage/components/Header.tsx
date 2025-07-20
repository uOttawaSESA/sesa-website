import Button from "@/components/Button";
import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations("events");

    return (
        <div className="mx-4 pt-8">
            <div className="mx-auto max-w-7xl md:text-center">
                <div className="color-gradient font-mono">{t("our_events")}</div>
                <h1 className="mt-4 text-[48px] uppercase">
                    <span className="relative inline-block">
                        {t("stay_up_to_date_hl")}
                        <div className="absolute right-0 top-0 h-full w-0 animate-highlight [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]"></div>
                    </span>
                    <span className="ml-7">{t("stay_up_to_date")}</span>
                </h1>

                <p className="my-6 max-w-[558px] font-sans text-[16px] text-thistle md:mx-auto">
                    {t("stay_up_to_date_blurb")}
                </p>

                <Button
                    className="font-heading text-xl uppercase md:mx-8"
                    onClick={() => {
                        // Add functionality here
                        console.log("Subscribed to calendar!");
                    }}
                >
                    {t("btn_subscribe")}
                </Button>

                <div className="mt-4 font-mono text-base text-thistle">
                    <p>{t("subscribe_info_line1")}</p>
                    <p>{t("subscribe_info_line2")}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
