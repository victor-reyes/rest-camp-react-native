PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_services` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`rest_area_id` text NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_services`("id", "name", "rest_area_id", "updated_at", "deleted") SELECT "id", "name", "rest_area_id", "updated_at", "deleted" FROM `services`;--> statement-breakpoint
DROP TABLE `services`;--> statement-breakpoint
ALTER TABLE `__new_services` RENAME TO `services`;--> statement-breakpoint
PRAGMA foreign_keys=ON;