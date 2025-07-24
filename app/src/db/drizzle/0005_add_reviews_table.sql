DELETE FROM `rest_areas`;--> statement-breakpoint
DELETE FROM `photos`;--> statement-breakpoint
DELETE FROM `services`;--> statement-breakpoint

CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`rest_area_id` text NOT NULL,
	`owner_id` text NOT NULL,
	`score` integer NOT NULL,
	`recension` text,
	`updated_at` integer NOT NULL,
	`deleted` integer NOT NULL
);
