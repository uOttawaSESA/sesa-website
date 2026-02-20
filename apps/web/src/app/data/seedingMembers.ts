// Temporary script to see the current Members
import { db } from "@repo/db";
import { members, teamRoleEnum } from "@repo/db/schema";
import { membersData } from "./Members";

type TeamRole = (typeof teamRoleEnum.enumValues)[number];

function normalizeTeam(team: string): TeamRole {
    if (team === "Advisors") return "Partnership"; //Temporary (while we reput their actual previous role)

    if (teamRoleEnum.enumValues.includes(team as TeamRole)) {
        return team as TeamRole;
    }

    throw new Error(`Invalid team value: ${team}`);
}

function isAdvisor(team: string): boolean {
    return team === "Advisors";
}

async function main() {
    await db.insert(members).values(
        membersData.map(m => ({
            name: m.name,
            team: normalizeTeam(m.team),
            role: m.role,
            imagePath: m.imgPath,

            email: m.email ?? null,
            linkedinUrl: m.linkedin ?? null,
            githubUrl: m.github ?? null,
            portfolioUrl: m.portfolio ?? null,

            isAdvisor: isAdvisor(m.team),
            isRetired: false,
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
