/*
  Warnings:

  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `token`,
    ADD COLUMN `updated_pwd_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
