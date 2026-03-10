ALTER TABLE "members" ALTER COLUMN "team_key" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."team_key_enum";--> statement-breakpoint
CREATE TYPE "public"."team_key_enum" AS ENUM('codirectors', 'partnerships', 'logistics', 'communications', 'development', 'academics', 'advisors');--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "team_key" SET DATA TYPE "public"."team_key_enum" USING "team_key"::"public"."team_key_enum";