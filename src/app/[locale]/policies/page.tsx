import { useTranslations } from "next-intl";

import type { Metadata } from "next";

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
            <h1 className="font-heading text-3xl uppercase md:text-5xl">
                {t("our_policies")} <span className="highlight-text">{t("our_policies_hl")}</span>
            </h1>
            <section>
                <h2 id="terms" className="font-heading text-2xl uppercase md:text-4xl">
                    {t("tnc_heading")}
                </h2>
                <p>{t("tnc")}</p>
            </section>
            <section>
                <h2 id="privacy" className="font-heading text-2xl uppercase md:text-4xl">
                    {t("privacy_heading")}
                </h2>
                <p>{t("privacy")}</p>
            </section>
        </div>
    );
}
