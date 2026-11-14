/**
 * Fixed lists for option fields. The columns stay text; these lists define what admin input
 * accepts.
 *
 * Must stay free of admin, auth and Discord imports: the public site may bundle this file.
 */

import { roleKeyEnum, teamKeyEnum } from "@repo/db/schema";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const TEAM_KEYS = teamKeyEnum.enumValues;
export const ROLE_KEYS = roleKeyEnum.enumValues;

export const EVENT_TYPES = ["workshop", "networking", "social", "academic"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const RESOURCE_CATEGORIES = ["academic", "career", "technical"] as const;
export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];

export const RESOURCE_FORMATS = ["video", "textbook", "website", "blog", "article"] as const;
export type ResourceFormat = (typeof RESOURCE_FORMATS)[number];

export const RESOURCE_PRICING = ["free", "freemium", "paid"] as const;
export type ResourcePricing = (typeof RESOURCE_PRICING)[number];

export const RESOURCE_ACCESSIBILITY = ["closed captions [cc]", "screen reader compatible"] as const;
export type ResourceAccessibility = (typeof RESOURCE_ACCESSIBILITY)[number];

/** Resource tiers, best first. The database stores the index (S = 0). */
export const RESOURCE_TIERS = ["S", "A", "B", "C", "D", "E", "F"] as const;
export type ResourceTier = (typeof RESOURCE_TIERS)[number];

export const tierToNumber = (tier: ResourceTier): number => RESOURCE_TIERS.indexOf(tier);
export const tierFromNumber = (tier: number): ResourceTier => RESOURCE_TIERS[tier] ?? "F";
