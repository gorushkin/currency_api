CREATE TABLE `daily_entries` (
	`date` text PRIMARY KEY NOT NULL,
	`text_content` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
