import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Member = RouterOutputs["member"]["getAll"][0];
export type TeamKey = Member["teamKey"];
