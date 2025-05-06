CREATE TABLE `parkings` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`info` text,
	`status` text NOT NULL,
	`numberOfCarSpaces` integer,
	`numberOfTruckSpaces` integer
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`id` integer PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`parkingId` integer,
	FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`parkingId` integer,
	FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`id`) ON UPDATE no action ON DELETE no action
);
