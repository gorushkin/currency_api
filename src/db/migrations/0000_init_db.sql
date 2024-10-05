CREATE TABLE `daily_cbrf_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text DEFAULT (CURRENT_DATE),
	`text_content` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `daily_oer_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text DEFAULT (CURRENT_DATE),
	`text_content` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `hourly_oer_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP),
	`text_content` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `daily_cbrf_entries_id_unique` ON `daily_cbrf_entries` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_cbrf_entries_date_unique` ON `daily_cbrf_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_cbrf_entries_dateIndex` ON `daily_cbrf_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_oer_entries_id_unique` ON `daily_oer_entries` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_oer_entries_date_unique` ON `daily_oer_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_oer_entries_dateIndex` ON `daily_oer_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `hourly_oer_entries_id_unique` ON `hourly_oer_entries` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `hourly_oer_entries_timestamp_unique` ON `hourly_oer_entries` (`timestamp`);