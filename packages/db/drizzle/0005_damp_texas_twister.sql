CREATE TABLE "role_translations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"role_key" text NOT NULL,
	"locale" text NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "role_translations_unique" UNIQUE("role_key","locale")
);
--> statement-breakpoint
ALTER TABLE "members_i18n" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "members_i18n" CASCADE;--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "team" TO "team_key";--> statement-breakpoint
ALTER TABLE "members" RENAME COLUMN "role" TO "role_key";--> statement-breakpoint
DROP INDEX "members_team_idx";--> statement-breakpoint
DROP INDEX "members_role_idx";--> statement-breakpoint
CREATE INDEX "role_translations_role_key_idx" ON "role_translations" USING btree ("role_key");--> statement-breakpoint
CREATE INDEX "role_translations_locale_idx" ON "role_translations" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "members_team_idx" ON "members" USING btree ("team_key");--> statement-breakpoint
CREATE INDEX "members_role_idx" ON "members" USING btree ("role_key");