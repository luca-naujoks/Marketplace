/*
  Warnings:

  - Added the required column `type` to the `Retailers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Retailers" ADD COLUMN     "type" TEXT NOT NULL;
