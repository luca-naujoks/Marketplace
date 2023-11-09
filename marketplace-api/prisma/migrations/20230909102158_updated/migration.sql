/*
  Warnings:

  - You are about to drop the column `authorId` on the `Retailers` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Retailers` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Retailers` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Retailers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `picture` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Retailers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Retailers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Retailers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `Retailers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Retailers" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owned_items" TEXT[],
ADD COLUMN     "profile_picture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "profile_picture" TEXT NOT NULL;
