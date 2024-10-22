/*
  Warnings:

  - Made the column `lastCoinsUpdateTimestamp` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastEnergyUpdateTimestamp` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastCoinsUpdateTimestamp" SET NOT NULL,
ALTER COLUMN "lastEnergyUpdateTimestamp" SET NOT NULL;
