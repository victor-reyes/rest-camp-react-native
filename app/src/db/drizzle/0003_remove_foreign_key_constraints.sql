PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_photos` (
	`url` text NOT NULL,
	`thumbnail_url` text NOT NULL,
	`description` text,
	`rest_area_id` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`url`, `rest_area_id`)
);
--> statement-breakpoint
INSERT INTO `__new_photos`("url", "thumbnail_url", "description", "rest_area_id", "updated_at") SELECT "url", "thumbnail_url", "description", "rest_area_id", "updated_at" FROM `photos`;--> statement-breakpoint
DROP TABLE `photos`;--> statement-breakpoint
ALTER TABLE `__new_photos` RENAME TO `photos`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_services` (
	`name` text NOT NULL,
	`rest_area_id` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`name`, `rest_area_id`)
);
--> statement-breakpoint
INSERT INTO `__new_services`("name", "rest_area_id", "updated_at") SELECT "name", "rest_area_id", "updated_at" FROM `services`;--> statement-breakpoint
DROP TABLE `services`;--> statement-breakpoint
ALTER TABLE `__new_services` RENAME TO `services`;