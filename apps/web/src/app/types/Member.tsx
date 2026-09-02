import type { AppRouter } from "@repo/api";
import type { inferRouterOutputs } from "@trpc/server";

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Member = RouterOutputs["member"]["getAll"][0];
export type TeamKey = Member["teamKey"];
