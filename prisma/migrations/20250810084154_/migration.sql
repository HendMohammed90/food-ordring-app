-- CreateEnum
CREATE TYPE "public"."ExtraIngredients" AS ENUM ('CHEESE', 'BACON', 'TOMATOES', 'ONIONS', 'PEPPERS', 'PEPPERONI', 'SAUSAGE', 'MUSHROOMS', 'OLIVES');

-- CreateTable
CREATE TABLE "public"."Extra" (
    "id" TEXT NOT NULL,
    "name" "public"."ExtraIngredients" NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
