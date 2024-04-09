/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `InvoiceProduct` DROP FOREIGN KEY `InvoiceProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `InvoiceProduct` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` MODIFY `phone` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `InvoiceProduct` ADD CONSTRAINT `InvoiceProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
