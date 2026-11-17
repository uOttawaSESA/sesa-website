CREATE TYPE "public"."change_request_entity_type_enum" AS ENUM('member', 'event', 'resource');--> statement-breakpoint
CREATE TYPE "public"."change_request_operation_enum" AS ENUM('create', 'update');--> statement-breakpoint
CREATE TYPE "public"."change_request_status_enum" AS ENUM('pending', 'approved', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid,
	"before" jsonb,
	"after" jsonb,
	"change_request_id" uuid,
	"discord_delivered_at" timestamp with time zone,
	"discord_attempts" smallint DEFAULT 0 NOT NULL,
	"discord_last_error" text
);
--> statement-breakpoint
CREATE TABLE "change_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" "change_request_entity_type_enum" NOT NULL,
	"operation" "change_request_operation_enum" NOT NULL,
	"entity_id" uuid,
	"payload" jsonb NOT NULL,
	"status" "change_request_status_enum" DEFAULT 'pending' NOT NULL,
	"requester_id" uuid NOT NULL,
	"reviewer_id" uuid,
	"review_note" text,
	"resolved_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "change_requests_update_has_entity" CHECK ("change_requests"."operation" <> 'update' OR "change_requests"."entity_id" IS NOT NULL),
	CONSTRAINT "change_requests_resolved" CHECK (("change_requests"."status" = 'pending') = ("change_requests"."resolved_at" IS NULL)),
	CONSTRAINT "change_requests_reviewed" CHECK ("change_requests"."status" NOT IN ('approved', 'rejected') OR "change_requests"."reviewer_id" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "member_permissions" (
	"member_id" uuid NOT NULL,
	"action" text NOT NULL,
	"granted_by_id" uuid,
	"granted_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "member_permissions_member_id_action_pk" PRIMARY KEY("member_id","action")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "announce_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "announced_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "public_announcement_message_id" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "internal_attendance_message_id" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "public_scheduled_event_id" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "internal_scheduled_event_id" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "discord_id" text;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_actor_id_members_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_change_request_id_change_requests_id_fk" FOREIGN KEY ("change_request_id") REFERENCES "public"."change_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_requester_id_members_id_fk" FOREIGN KEY ("requester_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_reviewer_id_members_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_permissions" ADD CONSTRAINT "member_permissions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_permissions" ADD CONSTRAINT "member_permissions_granted_by_id_members_id_fk" FOREIGN KEY ("granted_by_id") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_log_created_at_id_idx" ON "audit_log" USING btree ("created_at","id");--> statement-breakpoint
CREATE INDEX "audit_log_entity_idx" ON "audit_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_log_actor_id_idx" ON "audit_log" USING btree ("actor_id");--> statement-breakpoint
CREATE INDEX "audit_log_undelivered_idx" ON "audit_log" USING btree ("created_at") WHERE "audit_log"."discord_delivered_at" is null;--> statement-breakpoint
CREATE INDEX "change_requests_pending_idx" ON "change_requests" USING btree ("entity_type","created_at") WHERE "change_requests"."status" = 'pending';--> statement-breakpoint
CREATE INDEX "change_requests_entity_idx" ON "change_requests" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "change_requests_requester_id_idx" ON "change_requests" USING btree ("requester_id");--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "account_provider_id_account_id_unique" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "events_announce_due_idx" ON "events" USING btree ("announce_at") WHERE "events"."announced_at" IS NULL AND "events"."deleted_at" IS NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_discord_id_unique" UNIQUE("discord_id");--> statement-breakpoint
-- Hand-written: events that exist before this migration are already public and were never
-- announced through the panel. Mark them live and announced so the go-live filter keeps showing
-- them and the scheduler does not post them to Discord.
UPDATE "events" SET "announce_at" = "created_at", "announced_at" = "created_at";
