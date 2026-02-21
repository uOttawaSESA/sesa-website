import { db } from "@repo/db";
import { members, teamRoleEnum } from "@repo/db/schema";
import { membersData } from "./Members";

type TeamRole = (typeof teamRoleEnum.enumValues)[number];

function normalizeTeam(team: string): TeamRole {
    if (team === "Advisors") return "Advisor";

    if (teamRoleEnum.enumValues.includes(team as TeamRole)) {
        return team as TeamRole;
    }

    throw new Error(`Invalid team value: ${team}`);
}

function advisorTimestamp(team: string): Date | null {
    return team === "Advisors" ? new Date() : null;
}

async function main() {
    await db.insert(members).values(
        membersData.map(m => ({
            name: m.name,
            teamKey: normalizeTeam(m.team),
            roleKey: m.role,

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
