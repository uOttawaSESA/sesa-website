import type { Member } from "@repo/db/types";

// TODO: To determine who has access
export function hasAccess(member: Member): boolean {
    if (member.teamKey !== "codirectors" || member.roleKey !== "lead") {
        return false;
    }
    return true;
}
