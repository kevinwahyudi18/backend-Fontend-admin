-- CreateEnum
CREATE TYPE "Courier" AS ENUM ('jne', 'pos', 'tiki');

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "courier" "Courier",
ADD COLUMN     "shipping_cost" INTEGER,
ADD COLUMN     "total_payment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_price" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_weight" INTEGER NOT NULL DEFAULT 0;
