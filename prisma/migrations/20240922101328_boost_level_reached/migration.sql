-- AlterTable
ALTER TABLE "Boost" ADD COLUMN     "maxLevelReached" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "level" SET DEFAULT 0;
