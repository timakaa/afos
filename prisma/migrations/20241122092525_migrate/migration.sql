-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "reviews" INTEGER NOT NULL DEFAULT 0;
