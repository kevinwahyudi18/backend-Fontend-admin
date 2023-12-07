-- DropForeignKey
ALTER TABLE "Warehouse" DROP CONSTRAINT "Warehouse_admin_id_fkey";

-- AlterTable
ALTER TABLE "Warehouse" ALTER COLUMN "admin_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Warehouse" ADD CONSTRAINT "Warehouse_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
