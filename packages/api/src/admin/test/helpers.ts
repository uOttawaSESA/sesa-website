/**
 * Helpers for testing admin procedures against an in-memory database. Imports Vitest, so only for
 * tests.
 *
 * Every test in a file shares one database seeded with `@repo/db/seed`. Tests that change data
 * should create their own rows rather than mutate seeded ones, so test order doesn't matter.
 */

import { createCaller } from "@repo/api/admin";
import { type Actor, loadActor } from "@repo/api/admin/actor";
import { fakeDiscordGateway } from "@repo/api/admin/services/discord";
import { fakeSiteRevalidator } from "@repo/api/admin/services/revalidator";
import { fakeFileStorage } from "@repo/api/admin/services/storage";
import type { AdminContext, AdminServices } from "@repo/api/admin/trpc";
import type { Database } from "@repo/db";
import { openPglite, type PgliteHandle } from "@repo/db/pglite";
import { SEED_MEMBERS, seed } from "@repo/db/seed";
import { type Mock, vi } from "vitest";

export { SEED_EVENT_IDS, SEED_MEMBERS, SEED_RESOURCES } from "@repo/db/seed";

export type SeedMemberKey = keyof typeof SEED_MEMBERS;

/** A fresh in-memory database with every migration applied and the fixtures seeded. */
export const createTestDb = async (): Promise<PgliteHandle> => {
    const handle = await openPglite();
    await seed(handle.db);
    return handle;
};

/** Replace every method of a service with a `vi.fn` that calls through to the original. */
type Spied<T> = {
    [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K];
};

const spy = <T extends object>(service: T): Spied<T> =>
    Object.fromEntries(
        Object.entries(service).map(([key, fn]) => [
            key,
            typeof fn === "function" ? vi.fn(fn) : fn,
        ]),
    ) as Spied<T>;

export type SpiedServices = { [K in keyof AdminServices]: Spied<AdminServices[K]> };

/**
 * The fake services with every method wrapped in a spy, for asserting side effects:
 *
 * ```ts
 * expect(services.discord.syncMember).toHaveBeenCalledWith(expect.objectContaining({ discordId }));
 * ```
 *
 * Override a method's result with `services.discord.syncMember.mockResolvedValueOnce(...)`.
 */
export const spyServices = (): SpiedServices => ({
    discord: spy(fakeDiscordGateway),
    revalidator: spy(fakeSiteRevalidator),
    storage: spy(fakeFileStorage),
});

/** Load the actor for a seeded member. Throws if they resolve to signed out (e.g. `retired`). */
export const actorFor = async (db: Database, member: SeedMemberKey): Promise<Actor> => {
    const actor = await loadActor(db, SEED_MEMBERS[member].id);
    if (!actor) throw new Error(`Seeded member ${member} has no actor (retired?)`);
    return actor;
};

/** Build an admin context directly, without a request. */
export const createTestContext = (opts: {
    db: Database;
    actor: Actor | null;
    services?: AdminServices;
}): AdminContext => ({
    db: opts.db,
    headers: new Headers(),
    actor: opts.actor,
    ...(opts.services ?? spyServices()),
});

/**
 * A caller for the admin router acting as `as`: a seeded member's key, an `Actor` (e.g. with extra
 * `grants`), or `null` for a signed-out request. Pass `services` to assert on side effects.
 */
export const callerAs = async (
    db: Database,
    as: SeedMemberKey | Actor | null,
    services?: AdminServices,
): Promise<ReturnType<typeof createCaller>> => {
    const actor = typeof as === "string" ? await actorFor(db, as) : as;
    return createCaller(createTestContext({ db, actor, services }));
};
