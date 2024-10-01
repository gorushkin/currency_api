CREATE TABLE `daily_cbrf_entries` (
	`date` text PRIMARY KEY NOT NULL,
	`text_content` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `daily_oer_entries` (
	`date` text PRIMARY KEY NOT NULL,
	`text_content` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `daily_cbrf_entries_date_unique` ON `daily_cbrf_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_cbrf_entries_dateIndex` ON `daily_cbrf_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_oer_entries_date_unique` ON `daily_oer_entries` (`date`);--> statement-breakpoint
CREATE UNIQUE INDEX `daily_oer_entries_dateIndex` ON `daily_oer_entries` (`date`);