/*
  Warnings:

  - You are about to drop the column `userId` on the `Refferal` table. All the data in the column will be lost.
  - Added the required column `refferedById` to the `Refferal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Refferal" DROP CONSTRAINT "Refferal_userId_fkey";

-- AlterTable
ALTER TABLE "Refferal" DROP COLUMN "userId",
ADD COLUMN     "refferedById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Refferal" ADD CONSTRAINT "Refferal_refferedById_fkey" FOREIGN KEY ("refferedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
