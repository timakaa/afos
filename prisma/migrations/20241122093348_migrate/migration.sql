/*
  Warnings:

  - The `rating` column on the `Photo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "ratingStore" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
