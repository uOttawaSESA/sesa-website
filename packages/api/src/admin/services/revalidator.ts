/**
 * Refreshes the public site's static pages after an admin change. The admin context uses
 * `fakeSiteRevalidator`.
 */

export type RevalidationTarget = "members" | "events" | "resources";

export interface SiteRevalidator {
    /** Refresh every public page, in both locales, that shows `what`. */
    revalidate(what: RevalidationTarget): Promise<void>;
}

/** Logs every call. */
export const fakeSiteRevalidator: SiteRevalidator = {
    async revalidate(what) {
        console.info(`[fake revalidator] revalidate ${what}`);
    },
};
