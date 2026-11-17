import { discordId, httpUrl, nonEmpty, text } from "@repo/api/schemas/common";
import { ROLE_KEYS, TEAM_KEYS } from "@repo/api/schemas/options";
import * as z from "zod";

const memberFields = z.object({
    name: text(),
    teamKey: z.enum(TEAM_KEYS),
    roleKey: z.enum(ROLE_KEYS),
    /** A URL from the upload flow. */
    imageUrl: httpUrl(),
    email: z.email().nullable(),
    linkedinUrl: httpUrl().nullable(),
    githubUrl: httpUrl().nullable(),
    portfolioUrl: httpUrl().nullable(),
    /** Without one, the member cannot log in and is skipped by Discord sync. */
    discordId: discordId().nullable(),
});

export const memberCreateInput = memberFields;
export type MemberCreateInput = z.infer<typeof memberCreateInput>;

/** Only the changed fields. */
export const memberUpdateInput = memberFields.partial().refine(nonEmpty, "Nothing to update");
export type MemberUpdateInput = z.infer<typeof memberUpdateInput>;

/**
 * What a member may change on their own profile: not team, role or Discord id.
 */
export const memberSelfUpdateInput = memberFields
    .pick({
        name: true,
        imageUrl: true,
        email: true,
        linkedinUrl: true,
        githubUrl: true,
        portfolioUrl: true,
    })
    .partial()
    .refine(nonEmpty, "Nothing to update");
export type MemberSelfUpdateInput = z.infer<typeof memberSelfUpdateInput>;
