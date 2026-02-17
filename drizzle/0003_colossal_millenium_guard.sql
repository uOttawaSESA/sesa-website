DROP INDEX "resources_locale_idx";--> statement-breakpoint
DROP INDEX "resources_pricing_idx";--> statement-breakpoint
DROP INDEX "resources_tier_idx";--> statement-breakpoint
DROP INDEX "resources_created_at_idx";--> statement-breakpoint
DROP INDEX "resources_updated_at_idx";--> statement-breakpoint
CREATE INDEX "resources_accessibility_gin_idx" ON "resources" USING gin ("accessibility");--> statement-breakpoint
CREATE INDEX "resources_tier_id_idx" ON "resources" USING btree ("tier","id");--> statement-breakpoint
CREATE INDEX "resources_created_at_id_idx" ON "resources" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "resources_updated_at_id_idx" ON "resources" USING btree ("updated_at","id");--> statement-breakpoint
CREATE INDEX "resources_title_id_idx" ON "resources" USING btree ("title","id");