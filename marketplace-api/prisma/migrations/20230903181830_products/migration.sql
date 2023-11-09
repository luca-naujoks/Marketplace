/*
  Warnings:

  - Added the required column `Rating` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "Rating" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
