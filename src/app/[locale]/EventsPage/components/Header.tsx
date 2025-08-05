import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations("events");

    return (
        <div className="mx-4 pt-8">
            <div className="mx-auto max-w-7xl md:text-center">
                <p className="color-gradient font-mono text-xs md:text-base">{t("our_events")}</p>
                <h1 className="mt-4 text-3xl uppercase md:text-4xl">
                    <span className="highlight-text">{t("stay_up_to_date_hl")}</span>
                    <span className="ml-4 md:ml-7">{t("stay_up_to_date")}</span>
                </h1>

                <p className="my-6 max-w-[558px] font-sans text-base text-thistle md:mx-auto md:text-lg">
                    {t("stay_up_to_date_blurb")}
                </p>

                <Button
                    className="font-heading uppercase md:mx-8"
                    onClick={() => {
                        // Add functionality here
                        console.log("Subscribed to calendar!");
                    }}
                >
                    {t("btn_subscribe")}
                </Button>

                <div className="mt-4 font-mono text-sm text-thistle md:text-base">
                    <p>{t("subscribe_info_line1")}</p>
                    <p>{t("subscribe_info_line2")}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
