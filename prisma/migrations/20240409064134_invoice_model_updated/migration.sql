-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `discount` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `subtotal` INTEGER NOT NULL DEFAULT 1000,
    ADD COLUMN `total` INTEGER NOT NULL DEFAULT 900;
