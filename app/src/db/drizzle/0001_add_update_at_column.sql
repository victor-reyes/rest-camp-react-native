DELETE FROM `rest_areas`;--> statement-breakpoint
DELETE FROM `photos`;--> statement-breakpoint
DELETE FROM `services`;--> statement-breakpoint
ALTER TABLE `rest_areas` RENAME COLUMN "modified_time" TO "updated_at";--> statement-breakpoint
ALTER TABLE `photos` ADD `updated_at` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `services` ADD `updated_at` integer NOT NULL;