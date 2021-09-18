-- AlterTable
ALTER TABLE `views` ADD COLUMN `area` VARCHAR(191),
    ADD COLUMN `areaInfo` JSON NOT NULL;
