/*
  Warnings:

  - You are about to drop the column `subtotal` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `subtotal`,
    DROP COLUMN `total`;
