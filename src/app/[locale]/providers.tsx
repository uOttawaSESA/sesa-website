"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query";
import type { ReactNode } from "react";

export interface Props {
    children: ReactNode;
}

/**
 * Used to provide clientside-only providers to specific elements that need it.
 * This can be used to nicely wrap clientside portions of an otherwise SSR-ready page.
 */
export default function Providers({ children }: Props) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
