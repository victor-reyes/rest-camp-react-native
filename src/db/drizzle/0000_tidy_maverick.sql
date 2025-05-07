CREATE TABLE `parkings` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`description` text,
	`localDescription` text,
	`status` text NOT NULL,
	`numberOfCarSpaces` integer,
	`numberOfTruckSpaces` integer
);
--> statement-breakpoint
CREATE TABLE `photos` (
	`url` text NOT NULL,
	`description` text,
	`parkingId` text NOT NULL,
	PRIMARY KEY(`url`, `parkingId`),
	FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `services` (
	`name` text NOT NULL,
	`parkingId` text NOT NULL,
	PRIMARY KEY(`name`, `parkingId`),
	FOREIGN KEY (`parkingId`) REFERENCES `parkings`(`id`) ON UPDATE no action ON DELETE no action
);
