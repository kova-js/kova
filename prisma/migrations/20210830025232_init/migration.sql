/*
  Warnings:

  - Made the column `token` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `token` VARCHAR(191) NOT NULL;
