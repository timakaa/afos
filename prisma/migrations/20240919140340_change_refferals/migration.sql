/*
  Warnings:

  - You are about to drop the `Refferal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Refferal" DROP CONSTRAINT "Refferal_refferedById_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referredById" INTEGER;

-- DropTable
DROP TABLE "Refferal";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
