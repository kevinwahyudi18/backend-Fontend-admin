/*
  Warnings:

  - Added the required column `price` to the `Cart_Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart_Product" ADD COLUMN     "price" INTEGER NOT NULL;
