export const locales = ["en", "fr"] as const;

/** Used to tell Next.js to precompile localized pages. */
export default function localeParams() {
    return locales.map(locale => ({ locale }));
}
