import { useTranslations } from "next-intl";

import type { Metadata } from "next";

// Precompile i18n
import localeParams from "@/app/data/locales";
export const generateStaticParams = localeParams;

export const metadata: Metadata = {
    title: "Policies | Software Engineering Student Association",
    description: "Policies for our website.",
    alternates: {
        canonical: "/policies",
        languages: {
            en: "/en/policies",
            fr: "/fr/policies",
        },
    },
    openGraph: {
        title: "Policies | Software Engineering Student Association",
        description: "Policies for our website.",
        url: new URL("https://sesa-aegl.ca/policies"),
    },
};

export default function Policies() {
    const t = useTranslations("terms");

    return (
        <div className="container mx-auto mb-16 mt-8 flex min-h-96 max-w-5xl flex-col gap-4 text-white">
            <h1 className="mb-8 font-heading text-3xl uppercase md:text-5xl">
                {t("our_policies")} <span className="highlight-text">{t("our_policies_hl")}</span>
            </h1>
            <section className="mb-8">
                <h2 id="terms" className="mb-4 font-heading text-2xl uppercase md:text-4xl">
                    {t("tnc_heading")}
                </h2>
                <p className="mb-6 text-thistle">{t("tnc")}</p>
            </section>
            <section>
                <h2 id="privacy" className="mb-4 font-heading text-2xl uppercase md:text-4xl">
                    {t("privacy_heading")}
                </h2>
                <p className="mb-6 text-thistle">{t("privacy")}</p>
            </section>
        </div>
    );
}
