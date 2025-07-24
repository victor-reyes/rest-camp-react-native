CREATE TABLE `photos` (
	`url` text NOT NULL,
	`description` text,
	`rest_area_id` text NOT NULL,
	PRIMARY KEY(`url`, `rest_area_id`),
	FOREIGN KEY (`rest_area_id`) REFERENCES `rest_areas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rest_areas` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`description` text,
	`local_description` text,
	`status` text NOT NULL,
	`modified_time` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`name` text NOT NULL,
	`rest_area_id` text NOT NULL,
	PRIMARY KEY(`name`, `rest_area_id`),
	FOREIGN KEY (`rest_area_id`) REFERENCES `rest_areas`(`id`) ON UPDATE no action ON DELETE no action
);
