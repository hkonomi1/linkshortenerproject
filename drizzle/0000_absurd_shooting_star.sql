CREATE TABLE "links" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" varchar(12) NOT NULL,
	"url" text NOT NULL,
	"userId" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "links_user_id_idx" ON "links" USING btree ("userId");