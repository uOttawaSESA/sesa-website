DROP INDEX "members_team_idx";--> statement-breakpoint
DROP INDEX "members_role_idx";--> statement-breakpoint
DROP INDEX "members_created_at_id_idx";--> statement-breakpoint
DROP INDEX "members_name_id_idx";--> statement-breakpoint
CREATE INDEX "active_members_sort_idx" ON "members" USING btree ("team_key","role_key","created_at") WHERE "members"."retired_at" is null;