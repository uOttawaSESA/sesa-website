import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations("events");

    return (
        <div className="mt-4 px-8 md:px-20 lg:mt-16 lg:text-center">
            <p className="color-gradient font-mono text-xs md:text-base">{t("our_events")}</p>
            <h1 className="my-2 text-3xl uppercase md:text-5xl">
                <span className="highlight-text">{t("stay_up_to_date_hl")}</span>
                <span> {t("stay_up_to_date")}</span>
            </h1>

            <p className="font-sans text-base text-thistle md:text-lg">
                {t("stay_up_to_date_blurb")}
            </p>

            {/*
                <Button
                    className="font-heading uppercase md:mx-8"
                    onClick={() => {
                        // Add functionality here
                    }}
                >
                    {t("btn_subscribe")}
                </Button>

                <div className="mt-4 font-mono text-sm text-thistle md:text-base">
                    <p>{t("subscribe_info_line1")}</p>
                    <p>{t("subscribe_info_line2")}</p>
                </div>
                */}
        </div>
    );
};

export default Header;
