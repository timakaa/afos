/*
  Warnings:

  - You are about to drop the column `userPackId` on the `Photo` table. All the data in the column will be lost.
  - Changed the type of `createdAt` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lastCoinsUpdateTimestamp` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `lastEnergyUpdateTimestamp` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_userPackId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "userPackId",
ADD COLUMN     "packId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" INTEGER NOT NULL,
DROP COLUMN "lastCoinsUpdateTimestamp",
ADD COLUMN     "lastCoinsUpdateTimestamp" INTEGER NOT NULL,
DROP COLUMN "lastEnergyUpdateTimestamp",
ADD COLUMN     "lastEnergyUpdateTimestamp" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_PhotoToUserPack" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToUserPack_AB_unique" ON "_PhotoToUserPack"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToUserPack_B_index" ON "_PhotoToUserPack"("B");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToUserPack" ADD CONSTRAINT "_PhotoToUserPack_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToUserPack" ADD CONSTRAINT "_PhotoToUserPack_B_fkey" FOREIGN KEY ("B") REFERENCES "UserPack"("id") ON DELETE CASCADE ON UPDATE CASCADE;
