-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "user" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "items" JSONB[],

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "delivery_time" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'product',
    "brand_id" INTEGER NOT NULL,
    "special_sale" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" BIGSERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "adress" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_type" TEXT NOT NULL,
    "owned_items" JSONB[],

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);
