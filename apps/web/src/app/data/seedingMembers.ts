import { db } from "@repo/db";
import { members } from "@repo/db/schema";
import type { TeamKey } from "../types/Member";
import { members as membersData } from "./Members";

// type TeamEnum = (typeof teamKeyEnum.enumValues)[number];
type RoleEnum = "lead" | "member";

const teamNameMap: Record<string, TeamKey> = {
    "Co-directors": "codirectors",
    Academic: "academics",
    Communications: "communications",
    Development: "development",
    Partnership: "partnerships",
    Events: "logistics",
    Advisors: "advisors",
};

function normalizeTeam(team: string): TeamKey {
    const normalized = teamNameMap[team];
    if (!normalized) throw new Error(`Invalid team value: ${team}`);
    return normalized;
}

function advisorTimestamp(team: string): Date | null {
    return team === "Advisors" ? new Date() : null;
}

function normalizeRole(role: string): RoleEnum {
    return role.toLowerCase().includes("lead") ? "lead" : "member";
}
async function main() {
    await db.insert(members).values(
        membersData.map(m => ({
            name: m.name,
            teamKey: normalizeTeam(m.team),
            roleKey: normalizeRole(m.role),
            imageUrl: m.imgPath ?? "",
            email: m.email ?? null,
            linkedinUrl: m.linkedin ?? null,
            githubUrl: m.github ?? null,
            portfolioUrl: m.portfolio ?? null,
            becameAdvisorAt: advisorTimestamp(m.team),
            retiredAt: null,
        })),
    );

    console.log("Seeded team members");
}

main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => process.exit());
