/*
  Warnings:

  - You are about to drop the column `coinsPerClick` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastClick` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `luckyShotChance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Boost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NakedPhoto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coinsBalance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boost" DROP CONSTRAINT "Boost_userId_fkey";

-- DropForeignKey
ALTER TABLE "NakedPhoto" DROP CONSTRAINT "NakedPhoto_blurId_fkey";

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "userPackId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "coinsPerClick",
DROP COLUMN "lastClick",
DROP COLUMN "luckyShotChance",
ADD COLUMN     "coinsBalance" INTEGER NOT NULL,
ADD COLUMN     "energy" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "energyLimitIndex" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastCoinsUpdateTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastEnergyUpdateTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "multitapLevelIndex" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Boost";

-- DropTable
DROP TABLE "NakedPhoto";

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_userPackId_fkey" FOREIGN KEY ("userPackId") REFERENCES "UserPack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
