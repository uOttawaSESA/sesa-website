import { createCaller } from "@repo/api/admin";
import { actorFor, createTestContext, createTestDb } from "@repo/api/admin/test/helpers";
import {
    authorizedProcedure,
    baseProcedure,
    createCallerFactory,
    createTRPCRouter,
    protectedProcedure,
} from "@repo/api/admin/trpc";
import { afterAll, describe, expect, it } from "vitest";

const t = await createTestDb();
afterAll(() => t.close());

/** One procedure per guard, so the guards are tested apart from any feature router. */
const guards = createTRPCRouter({
    open: baseProcedure.query(() => "ok"),
    signedIn: protectedProcedure.query(({ ctx }) => ctx.actor.memberId),
    canCreateResource: authorizedProcedure("resource.create").mutation(() => "ok"),
});
const createGuardsCaller = createCallerFactory(guards);

describe("admin tRPC wiring", () => {
    it("serves health without a session", async () => {
        const caller = createCaller(createTestContext({ db: t.db, actor: null }));
        await expect(caller.health()).resolves.toEqual({ ok: true });
    });
});

describe("procedure guards", () => {
    const callerFor = (actor: Awaited<ReturnType<typeof actorFor>> | null) =>
        createGuardsCaller(createTestContext({ db: t.db, actor }));

    it("rejects signed-out requests with UNAUTHORIZED", async () => {
        const caller = callerFor(null);
        await expect(caller.open()).resolves.toBe("ok");
        await expect(caller.signedIn()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
        await expect(caller.canCreateResource()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    });

    it("lets any active member through protectedProcedure", async () => {
        const actor = await actorFor(t.db, "academicsMember");
        await expect(callerFor(actor).signedIn()).resolves.toBe(actor.memberId);
    });

    it("checks the action in authorizedProcedure", async () => {
        const codirector = await actorFor(t.db, "codirectorsLead");
        const member = await actorFor(t.db, "academicsMember");

        await expect(callerFor(codirector).canCreateResource()).resolves.toBe("ok");
        await expect(callerFor(member).canCreateResource()).rejects.toMatchObject({
            code: "FORBIDDEN",
        });
        await expect(
            callerFor({ ...member, grants: ["resource.create"] }).canCreateResource(),
        ).resolves.toBe("ok");
    });
});
