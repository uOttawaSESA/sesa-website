import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async () => {
    // Read the locale from the `[locale]` root segment rather than request headers, which lets
    // localized pages be statically rendered
    const locale = await rootParams.locale();
    if (!hasLocale(routing.locales, locale)) notFound();

    return {
        locale,
        messages: (await import(`../../i18n/${locale}.json`)).default,
    };
});
