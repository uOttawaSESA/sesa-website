DROP INDEX "resources_locale_gin_idx";--> statement-breakpoint
CREATE INDEX "resources_locale_idx" ON "resources" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "resources_locale_gin_idx" ON "resources" USING gin ("locale");