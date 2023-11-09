/*
  Warnings:

  - The primary key for the `Retailers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Retailers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `owned_items` column on the `Retailers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Retailers" DROP CONSTRAINT "Retailers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "owned_items",
ADD COLUMN     "owned_items" JSONB[],
ADD CONSTRAINT "Retailers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "items" JSONB[],

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
