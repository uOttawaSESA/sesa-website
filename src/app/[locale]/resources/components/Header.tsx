import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations("resources");

    return (
        <div className="mb-7 text-white md:mb-5">
            <span className="bg-linear-to-r from-blueviolet-100 to-darkmagenta bg-clip-text font-mono text-transparent text-xs md:text-base">
                {t("resources_heading")}
            </span>
            <h1 className="mt-4 font-heading text-2xl uppercase md:text-4xl">
                {t("resources_heading")}{" "}
                <span className="highlight-text">{t("resources_heading_hl")}</span>
            </h1>
            <p className="mt-2 max-w-10xl font-sans text-base text-thistle md:text-lg">
                {t("resources_blurb")}
            </p>
        </div>
    );
};

export default Header;
