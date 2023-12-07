/*
  Warnings:

  - You are about to drop the column `wight` on the `Product_Detail` table. All the data in the column will be lost.
  - Added the required column `weight` to the `Product_Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product_Detail" DROP COLUMN "wight",
ADD COLUMN     "weight" INTEGER NOT NULL;
