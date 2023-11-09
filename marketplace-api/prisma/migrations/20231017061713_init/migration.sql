/*
  Warnings:

  - You are about to drop the column `user` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `Retailers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `account` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "user",
ADD COLUMN     "account" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "tags" JSONB[],
ALTER COLUMN "brand_id" DROP DEFAULT,
ALTER COLUMN "special_sale" DROP DEFAULT;

-- DropTable
DROP TABLE "Retailers";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "adress" TEXT,
    "company_name" TEXT,
    "company_type" TEXT,
    "owned_items" JSONB[],

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");
