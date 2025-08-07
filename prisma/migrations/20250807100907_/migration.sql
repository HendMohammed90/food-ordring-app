-- CreateEnum
CREATE TYPE "public"."ProductSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "public"."Size" (
    "id" TEXT NOT NULL,
    "name" "public"."ProductSize" NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Size" ADD CONSTRAINT "Size_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
