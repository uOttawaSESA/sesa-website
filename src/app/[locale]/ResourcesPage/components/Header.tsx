import { useTranslations } from "next-intl";
import React from "react";

const Header = () => {
    const t = useTranslations("resources");

    return (
        <div className="mb-12 text-white">
            <span className="bg-gradient-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent">
                {t("resources")}
            </span>
            <h1 className="mt-4 font-heading text-4xl uppercase">
                {t("resources_heading")}{" "}
                <span className="relative inline-block">
                    {t("resources_heading_hl")}
                    <div className="absolute right-0 top-0 h-full w-0 animate-highlight bg-gradient-to-r from-blueviolet-100/25 to-darkmagenta/25"></div>
                </span>
            </h1>
            <p className="max-w-10xl mt-4 font-sans text-xl text-thistle">{t("resources_blurb")}</p>
        </div>
    );
};

export default Header;
