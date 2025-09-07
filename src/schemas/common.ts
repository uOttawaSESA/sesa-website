import { Timestamp } from "firebase/firestore";
import * as z from "zod";

export const isTimestamp = (x: unknown) => x instanceof Timestamp;

export const Localized = z.object({
    en: z.string("Expected English localization"),
    fr: z.string("Expected French localization"),
});
