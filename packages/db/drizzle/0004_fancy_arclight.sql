DROP TABLE IF EXISTS members CASCADE;

CREATE TYPE "public"."role_key_enum" AS ENUM('lead', 'member');--> statement-breakpoint
CREATE TYPE "public"."team_key_enum" AS ENUM('codirector', 'academic', 'communications', 'development', 'partnerships', 'logistics', 'advisor');--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"team_key" "team_key_enum" NOT NULL,
	"role_key" "role_key_enum" NOT NULL,
	"image_url" text NOT NULL,
	"email" text,
	"linkedin_url" text,
	"github_url" text,
	"portfolio_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"retired_at" timestamp with time zone,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "members_team_idx" ON "members" USING btree ("team_key");--> statement-breakpoint
CREATE INDEX "members_role_idx" ON "members" USING btree ("role_key");--> statement-breakpoint
CREATE INDEX "members_created_at_id_idx" ON "members" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "members_name_id_idx" ON "members" USING btree ("name","id");