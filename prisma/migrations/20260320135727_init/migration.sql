/*
  Warnings:

  - The primary key for the `rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `ID` column on the `rate` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[UUID]` on the table `rate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UUID` to the `rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rate" DROP CONSTRAINT "rate_pkey",
ADD COLUMN     "UUID" TEXT NOT NULL,
DROP COLUMN "ID",
ADD COLUMN     "ID" SERIAL NOT NULL,
ADD CONSTRAINT "rate_pkey" PRIMARY KEY ("ID");

-- CreateIndex
CREATE UNIQUE INDEX "rate_UUID_key" ON "rate"("UUID");
