CREATE TYPE "public"."team_role" AS ENUM('Co-directors', 'Academic', 'Communications', 'Development', 'Events', 'Partnership', 'Logistic');--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"team_key" "team_role" NOT NULL,
	"role_key" text NOT NULL,
	"image_url" text NOT NULL,
	"email" text,
	"linkedin_url" text,
	"github_url" text,
	"portfolio_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"retired_at" timestamp with time zone,
	"became_advisor_at" timestamp with time zone,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "role_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_key" text NOT NULL,
	"locale" text NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "role_translations_unique" UNIQUE("role_key","locale")
);
--> statement-breakpoint
CREATE INDEX "members_team_idx" ON "members" USING btree ("team_key");--> statement-breakpoint
CREATE INDEX "members_role_idx" ON "members" USING btree ("role_key");--> statement-breakpoint
CREATE INDEX "members_created_at_id_idx" ON "members" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "members_name_id_idx" ON "members" USING btree ("name","id");--> statement-breakpoint
CREATE INDEX "role_translations_role_key_idx" ON "role_translations" USING btree ("role_key");--> statement-breakpoint
CREATE INDEX "role_translations_locale_idx" ON "role_translations" USING btree ("locale");