import { adminRouter } from "@repo/api/admin";
import { createAdminContext } from "@repo/api/admin/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

/**
 * This wraps the `createAdminContext` helper and provides the required context for the admin API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
    return createAdminContext({
        headers: req.headers,
    });
};

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: adminRouter,
        createContext: () => createContext(req),
        onError:
            process.env.NODE_ENV === "development"
                ? ({ path, error }) => {
                      console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
                  }
                : undefined,
    });

export { handler as GET, handler as POST };
