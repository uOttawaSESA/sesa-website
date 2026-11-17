import { loadActor } from "@repo/api/admin/actor";
import { createTestDb, SEED_MEMBERS } from "@repo/api/admin/test/helpers";
import { afterAll, describe, expect, it } from "vitest";

const t = await createTestDb();
afterAll(() => t.close());

describe("loadActor", () => {
    it("loads an active member", async () => {
        const { id, name } = SEED_MEMBERS.developmentLead;
        await expect(loadActor(t.db, id)).resolves.toEqual({
            memberId: id,
            name,
            teamKey: "development",
            roleKey: "lead",
            grants: [],
        });
    });

    it("treats a retired member as signed out", async () => {
        await expect(loadActor(t.db, SEED_MEMBERS.retired.id)).resolves.toBeNull();
    });

    it("treats an unknown id as signed out", async () => {
        await expect(loadActor(t.db, crypto.randomUUID())).resolves.toBeNull();
    });
});
