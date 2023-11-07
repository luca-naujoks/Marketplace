/*
  Warnings:

  - You are about to drop the column `user` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `account` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "user",
ADD COLUMN     "account" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "tags" JSONB[];
