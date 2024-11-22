/*
  Warnings:

  - You are about to drop the column `packId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Pack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PackToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PhotoToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PhotoToUserPack` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `defaultUrl` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nakedUrl` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_packId_fkey";

-- DropForeignKey
ALTER TABLE "UserPack" DROP CONSTRAINT "UserPack_packId_fkey";

-- DropForeignKey
ALTER TABLE "UserPack" DROP CONSTRAINT "UserPack_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PackToUser" DROP CONSTRAINT "_PackToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PackToUser" DROP CONSTRAINT "_PackToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToUser" DROP CONSTRAINT "_PhotoToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToUser" DROP CONSTRAINT "_PhotoToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToUserPack" DROP CONSTRAINT "_PhotoToUserPack_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToUserPack" DROP CONSTRAINT "_PhotoToUserPack_B_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "packId",
DROP COLUMN "url",
ADD COLUMN     "defaultUrl" TEXT NOT NULL,
ADD COLUMN     "nakedUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Pack";

-- DropTable
DROP TABLE "UserPack";

-- DropTable
DROP TABLE "_PackToUser";

-- DropTable
DROP TABLE "_PhotoToUser";

-- DropTable
DROP TABLE "_PhotoToUserPack";

-- CreateTable
CREATE TABLE "_UserBoughtPhotos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserRatedPhotos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserBoughtPhotos_AB_unique" ON "_UserBoughtPhotos"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBoughtPhotos_B_index" ON "_UserBoughtPhotos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserRatedPhotos_AB_unique" ON "_UserRatedPhotos"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRatedPhotos_B_index" ON "_UserRatedPhotos"("B");

-- AddForeignKey
ALTER TABLE "_UserBoughtPhotos" ADD CONSTRAINT "_UserBoughtPhotos_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBoughtPhotos" ADD CONSTRAINT "_UserBoughtPhotos_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRatedPhotos" ADD CONSTRAINT "_UserRatedPhotos_A_fkey" FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRatedPhotos" ADD CONSTRAINT "_UserRatedPhotos_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
