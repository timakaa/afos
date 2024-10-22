/*
  Warnings:

  - You are about to drop the column `lastCoinsUpdateTimestamp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastEnergyUpdateTimestamp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastCoinsUpdateTimestamp",
DROP COLUMN "lastEnergyUpdateTimestamp";
