/**
 * Building blocks shared by the entity schemas.
 *
 * Payloads are stored as JSON in `change_requests` and validated again on approval, so every schema
 * must accept its own output after a JSON round trip. That is why dates accept ISO strings, and why
 * nothing is transformed into a different shape (e.g. resource tiers stay letters).
 */

import * as z from "zod";

/** A non-empty string, trimmed. */
export const text = () => z.string().trim().min(1);

/** A `Date`, or an ISO 8601 string with an offset (what a `Date` becomes in JSON). */
export const dateTime = () =>
    z.union([z.date(), z.iso.datetime({ offset: true }).transform(s => new Date(s))]);

/** An `http(s)` URL. */
export const httpUrl = () => z.url({ protocol: /^https?$/ });

/** A Discord snowflake id. */
export const discordId = () => z.string().regex(/^\d{17,20}$/, "Invalid Discord id");

/** Input for procedures that target one record. */
export const idInput = z.object({ id: z.uuid() });

/**
 * Member and event mutations accept this to skip mirroring the change to Discord.
 * Not part of the stored payload.
 */
export const syncDiscordInput = z.object({ syncDiscord: z.boolean().default(true) });

/** Rejects an update that changes nothing. */
export const nonEmpty = <T extends object>(value: T) => Object.keys(value).length > 0;
