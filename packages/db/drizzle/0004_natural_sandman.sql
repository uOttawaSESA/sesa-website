CREATE TYPE "public"."team_role" AS ENUM('Co-directors', 'Academic', 'Communications', 'Development', 'Events', 'Partnership', 'Logistic');--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"team" "team_role" NOT NULL,
	"role" text NOT NULL,
	"image_path" text NOT NULL,
	"email" text,
	"linkedin_url" text,
	"github_url" text,
	"portfolio_url" text,
	"is_advisor" boolean DEFAULT false NOT NULL,
	"is_retired" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"retired_at" timestamp with time zone,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "members_i18n" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"member_id" uuid NOT NULL,
	"role" "team_role" NOT NULL,
	"locale" text NOT NULL,
	"label" text NOT NULL,
	CONSTRAINT "members_i18n_locale_member_id_unique" UNIQUE("locale","member_id")
);
--> statement-breakpoint
ALTER TABLE "members_i18n" ADD CONSTRAINT "members_i18n_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "members_team_idx" ON "members" USING btree ("team");--> statement-breakpoint
CREATE INDEX "members_role_idx" ON "members" USING btree ("role");--> statement-breakpoint
CREATE INDEX "members_is_advisor_idx" ON "members" USING btree ("is_advisor");--> statement-breakpoint
CREATE INDEX "members_is_retired_idx" ON "members" USING btree ("is_retired");--> statement-breakpoint
CREATE INDEX "members_created_at_id_idx" ON "members" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "members_name_id_idx" ON "members" USING btree ("name","id");--> statement-breakpoint
CREATE INDEX "members_i18n_member_id_idx" ON "members_i18n" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "members_i18n_locale_idx" ON "members_i18n" USING btree ("locale");