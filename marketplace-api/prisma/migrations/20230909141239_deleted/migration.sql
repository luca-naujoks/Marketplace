/*
  Warnings:

  - You are about to drop the column `picture` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `Retailers` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "picture";

-- AlterTable
ALTER TABLE "Retailers" DROP COLUMN "profile_picture";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "profile_picture";
