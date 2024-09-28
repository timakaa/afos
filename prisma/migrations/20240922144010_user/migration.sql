/*
  Warnings:

  - Added the required column `lastClick` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coinsPerClick" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "lastClick" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "luckyShotChance" DOUBLE PRECISION NOT NULL DEFAULT 0.1;
