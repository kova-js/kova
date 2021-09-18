-- AlterTable
ALTER TABLE `categories` ADD COLUMN `meta` JSON;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `meta` JSON;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar` VARCHAR(191);
