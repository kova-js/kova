/*
  Warnings:

  - Added the required column `alt` to the `medias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medias` ADD COLUMN `alt` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191),
    ADD COLUMN `filename` VARCHAR(191) NOT NULL;
