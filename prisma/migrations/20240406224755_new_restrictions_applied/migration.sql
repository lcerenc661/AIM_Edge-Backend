/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `invoiceImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'client') NOT NULL DEFAULT 'client';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
