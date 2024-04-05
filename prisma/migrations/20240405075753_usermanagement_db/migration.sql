/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `passwordresettoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `twofactorconfirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `twofactortoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtoken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `twofactorconfirmation` DROP FOREIGN KEY `TwoFactorConfirmation_userId_fkey`;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `booking`;

-- DropTable
DROP TABLE `hotel`;

-- DropTable
DROP TABLE `passwordresettoken`;

-- DropTable
DROP TABLE `room`;

-- DropTable
DROP TABLE `twofactorconfirmation`;

-- DropTable
DROP TABLE `twofactortoken`;

-- DropTable
DROP TABLE `verificationtoken`;

-- CreateTable
CREATE TABLE `Store` (
    `store_key` INTEGER NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`store_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_key` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesFact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_key` INTEGER NOT NULL,
    `product_key` INTEGER NOT NULL,
    `sales` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `profit` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SalesFact` ADD CONSTRAINT `SalesFact_store_key_fkey` FOREIGN KEY (`store_key`) REFERENCES `Store`(`store_key`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SalesFact` ADD CONSTRAINT `SalesFact_product_key_fkey` FOREIGN KEY (`product_key`) REFERENCES `Product`(`product_key`) ON DELETE CASCADE ON UPDATE CASCADE;
