import { useTranslations } from "next-intl";
import React from "react";

const Header = () => {
    const t = useTranslations("resources");

    return (
        <div className="mb-12 text-white">
            <span className="from-blueviolet-100 to-darkmagenta bg-gradient-to-r bg-clip-text font-mono text-transparent">
                {t("resources")}
            </span>
            <h1 className="font-heading mt-4 text-4xl uppercase">
                {t("resources_heading")}{" "}
                <span className="relative inline-block">
                    {t("resources_heading_hl")}
                    <div className="animate-highlight from-blueviolet-100/25 to-darkmagenta/25 absolute right-0 top-0 h-full w-0 bg-gradient-to-r"></div>
                </span>
            </h1>
            <p className="max-w-10xl text-thistle mt-4 font-sans text-xl">{t("resources_blurb")}</p>
        </div>
    );
};

export default Header;
