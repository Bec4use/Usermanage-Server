/*
  Warnings:

  - You are about to alter the column `image` on the `users` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `LongText`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `image` LONGTEXT NULL;
