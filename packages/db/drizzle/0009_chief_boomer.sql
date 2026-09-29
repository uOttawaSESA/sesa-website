CREATE TYPE "public"."action_enum" AS ENUM('CREATE', 'UPDATE', 'DELETE');--> statement-breakpoint
CREATE TYPE "public"."entity_type_enum" AS ENUM('member', 'event', 'resource');--> statement-breakpoint
CREATE TYPE "public"."permission_enum" AS ENUM('VIEW_MEMBER', 'CREATE_MEMBER', 'EDIT_MEMBER', 'DELETE_MEMBER', 'APPROVE_MEMBER_CHANGE', 'VIEW_EVENT', 'CREATE_EVENT', 'EDIT_EVENT', 'DELETE_EVENT', 'DRAFT_EVENT', 'PUBLISH_EVENT', 'CANCEL_EVENT_ANNOUNCEMENT', 'EDIT_EVENT_LOCATION', 'VIEW_RESOURCE', 'CREATE_RESOURCE', 'EDIT_RESOURCE', 'DELETE_RESOURCE', 'DRAFT_RESOURCE', 'GRANT_PERMISSIONS', 'VIEW_AUDIT_LOG');--> statement-breakpoint
CREATE TYPE "public"."status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "change_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entity_type" "entity_type_enum" NOT NULL,
	"entity_id" uuid,
	"action" "action_enum" NOT NULL,
	"status" "status_enum" DEFAULT 'PENDING' NOT NULL,
	"proposed_data" jsonb NOT NULL,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_permissions" (
	"member_id" uuid NOT NULL,
	"permission" "permission_enum" NOT NULL,
	CONSTRAINT "member_permissions_member_id_permission_pk" PRIMARY KEY("member_id","permission")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"team_key" "team_key_enum" NOT NULL,
	"role_key" "role_key_enum" NOT NULL,
	"permission" "permission_enum" NOT NULL,
	CONSTRAINT "role_permissions_team_key_role_key_permission_pk" PRIMARY KEY("team_key","role_key","permission")
);
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "has_access" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "change_requests" ADD CONSTRAINT "change_requests_created_by_members_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_permissions" ADD CONSTRAINT "member_permissions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;