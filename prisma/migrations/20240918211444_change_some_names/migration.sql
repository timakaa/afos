/*
  Warnings:

  - A unique constraint covering the columns `[blurId]` on the table `NakedPhoto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NakedPhoto_blurId_key" ON "NakedPhoto"("blurId");
