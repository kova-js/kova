-- AlterTable
ALTER TABLE `categories` ADD COLUMN `article_count` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `followers` (
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `followerId`(`follower_id`),
    INDEX `followingId`(`following_id`),
    PRIMARY KEY (`follower_id`, `following_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `followers` ADD FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
