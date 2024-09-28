-- CreateTable
CREATE TABLE "Refferal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Refferal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Refferal" ADD CONSTRAINT "Refferal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
