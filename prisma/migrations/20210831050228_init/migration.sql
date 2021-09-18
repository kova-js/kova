/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `medias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `medias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medias` ADD COLUMN `path` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `medias.path_unique` ON `medias`(`path`);
