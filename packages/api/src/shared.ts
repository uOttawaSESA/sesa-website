/**
 * Pieces shared by the public (`trpc.ts`) and admin (`admin/trpc.ts`) tRPC inits.
 *
 * Must not import `@repo/auth`, the Discord client, or anything under `admin/`, since the public
 * site bundles this file.
 */

import type { TRPCDefaultErrorShape, TRPCError } from "@trpc/server";
import { flattenError, ZodError } from "zod";

/** Parse ZodErrors so the frontend gets typesafe validation errors. */
export const errorFormatter = ({
    shape,
    error,
}: {
    shape: TRPCDefaultErrorShape;
    error: TRPCError;
}) => ({
    ...shape,
    data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? flattenError(error.cause) : null,
    },
});

/**
 * Body of the timing middleware: logs how long a procedure took and adds an artificial delay in
 * development.
 *
 * The delay helps catch unwanted waterfalls by simulating network latency that would occur in
 * production but not in local development.
 */
export const timeProcedure = async <T>(opts: {
    path: string;
    isDev: boolean;
    next: () => Promise<T>;
}): Promise<T> => {
    const start = Date.now();

    if (opts.isDev) {
        const waitMs = Math.floor(Math.random() * 400) + 100;
        await new Promise(resolve => setTimeout(resolve, waitMs));
    }

    const result = await opts.next();

    console.log(`[TRPC] ${opts.path} took ${Date.now() - start}ms to execute`);

    return result;
};
