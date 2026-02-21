ALTER TYPE "public"."team_role" ADD VALUE 'Advisor';--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN "became_advisor_at";