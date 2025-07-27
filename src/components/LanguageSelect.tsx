"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";

/**
 * Provides a select component that can be used to select the page locale.
 * Changing the locale here automatically reloads the current page with the new locale activated.
 *
 * Used in the header and footer.
 */
export const LanguageSelect = () => {
    const pathname = usePathname();
    const router = useRouter();

    // _Technically_ this isn't necessary since the page refreshes anyway,
    // but imo it looks better to a user if the select immediately updates
    // instead of having a moment of confusion until the page reloads.
    const [locale, setLocale] = useState(useLocale());

    const languageItems = [
        {
            label: "EN",
            value: "en",
        },
        {
            label: "FR",
            value: "fr",
        },
    ] as const;

    const changeLocale = (newLocale: string) => {
        if (locale !== newLocale) {
            setLocale(newLocale);
            router.push(pathname, { locale: newLocale });
        }
    };

    return (
        <Select value={locale} onValueChange={changeLocale}>
            <SelectTrigger className="font-heading">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {languageItems.map(({ label, value }) => (
                        <SelectItem className="font-heading" key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
