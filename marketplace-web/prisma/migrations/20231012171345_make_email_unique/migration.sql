/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");
