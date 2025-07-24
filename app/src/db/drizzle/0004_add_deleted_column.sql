ALTER TABLE `photos` ADD `deleted` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `rest_areas` ADD `deleted` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `services` ADD `deleted` integer DEFAULT false NOT NULL;