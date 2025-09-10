CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"type" text NOT NULL,
	"location" text NOT NULL,
	"image_url" text NOT NULL,
	"details_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events_i18n" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"event_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_alt" text NOT NULL,
	CONSTRAINT "events_i18n_locale_event_id_unique" UNIQUE("locale","event_id")
);
--> statement-breakpoint
CREATE TABLE "resources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"source" text NOT NULL,
	"tier" smallint NOT NULL,
	"locale" text[] NOT NULL,
	"accessibility" text[] NOT NULL,
	"category" text NOT NULL,
	"course" text,
	"pricing" text NOT NULL,
	"format" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events_i18n" ADD CONSTRAINT "events_i18n_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_start_time_idx" ON "events" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "events_end_time_idx" ON "events" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "events_i18n_event_id_idx" ON "events_i18n" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "events_i18n_locale_idx" ON "events_i18n" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "resources_locale_idx" ON "resources" USING btree ("locale");--> statement-breakpoint
CREATE INDEX "resources_locale_gin_idx" ON "resources" USING gin ("locale");--> statement-breakpoint
CREATE INDEX "resources_category_idx" ON "resources" USING btree ("category");--> statement-breakpoint
CREATE INDEX "resources_course_idx" ON "resources" USING btree ("course");--> statement-breakpoint
CREATE INDEX "resources_pricing_idx" ON "resources" USING btree ("pricing");--> statement-breakpoint
CREATE INDEX "resources_format_idx" ON "resources" USING btree ("format");--> statement-breakpoint
CREATE INDEX "resources_tier_idx" ON "resources" USING btree ("tier");--> statement-breakpoint
CREATE INDEX "resources_created_at_idx" ON "resources" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "resources_updated_at_idx" ON "resources" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "resources_title_trgm_idx" ON "resources" USING gin ("title" gin_trgm_ops);