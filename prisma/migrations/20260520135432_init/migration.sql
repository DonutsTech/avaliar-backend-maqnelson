/*
  Warnings:

  - You are about to drop the column `UUID` on the `markwheels` table. All the data in the column will be lost.
  - You are about to drop the column `UUID` on the `rate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UUIDAPP]` on the table `markwheels` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UUIDAPP]` on the table `rate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UUIDAPP` to the `markwheels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ADDRESSCLI` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CANAL` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EMAILCLI` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FILIAL` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `INDICATOR` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MODALITY` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NAMEVEND` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OBSALL` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OBSREASON` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PHONECLI` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `REASON` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RESSED` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `STOKE` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAXA` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UUIDAPP` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALIDITY` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUE1YEAR` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUE2YEAR` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUE3YEAR` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUE4YEAR` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUEBY` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUENEG` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUERATE` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUESUG` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VALUEVIEW` to the `rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WHO` to the `rate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "markwheels_UUID_key";

-- DropIndex
DROP INDEX "rate_UUID_key";

-- AlterTable
ALTER TABLE "markwheels" DROP COLUMN "UUID",
ADD COLUMN     "UUIDAPP" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rate" DROP COLUMN "UUID",
ADD COLUMN     "ADDRESSCLI" TEXT NOT NULL,
ADD COLUMN     "CANAL" TEXT NOT NULL,
ADD COLUMN     "EMAILCLI" TEXT NOT NULL,
ADD COLUMN     "FILIAL" TEXT NOT NULL,
ADD COLUMN     "INDICATOR" BOOLEAN NOT NULL,
ADD COLUMN     "MODALITY" TEXT NOT NULL,
ADD COLUMN     "NAMEVEND" TEXT NOT NULL,
ADD COLUMN     "OBSALL" TEXT NOT NULL,
ADD COLUMN     "OBSREASON" TEXT NOT NULL,
ADD COLUMN     "PHONECLI" TEXT NOT NULL,
ADD COLUMN     "REASON" BOOLEAN NOT NULL,
ADD COLUMN     "RESSED" BOOLEAN NOT NULL,
ADD COLUMN     "STOKE" BOOLEAN NOT NULL,
ADD COLUMN     "TAXA" TEXT NOT NULL,
ADD COLUMN     "UUIDAPP" TEXT NOT NULL,
ADD COLUMN     "VALIDITY" TEXT NOT NULL,
ADD COLUMN     "VALUE1YEAR" TEXT NOT NULL,
ADD COLUMN     "VALUE2YEAR" TEXT NOT NULL,
ADD COLUMN     "VALUE3YEAR" TEXT NOT NULL,
ADD COLUMN     "VALUE4YEAR" TEXT NOT NULL,
ADD COLUMN     "VALUEBY" TEXT NOT NULL,
ADD COLUMN     "VALUENEG" TEXT NOT NULL,
ADD COLUMN     "VALUERATE" TEXT NOT NULL,
ADD COLUMN     "VALUESUG" TEXT NOT NULL,
ADD COLUMN     "VALUEVIEW" TEXT NOT NULL,
ADD COLUMN     "WHO" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "galeryrate" (
    "ID" SERIAL NOT NULL,
    "UUIDAPP" TEXT NOT NULL,
    "NAME" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "IDRATE" INTEGER NOT NULL,
    "CREATEDAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATEDAT" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galeryrate_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "galeryrate_UUIDAPP_key" ON "galeryrate"("UUIDAPP");

-- CreateIndex
CREATE UNIQUE INDEX "markwheels_UUIDAPP_key" ON "markwheels"("UUIDAPP");

-- CreateIndex
CREATE UNIQUE INDEX "rate_UUIDAPP_key" ON "rate"("UUIDAPP");

-- AddForeignKey
ALTER TABLE "galeryrate" ADD CONSTRAINT "galeryrate_IDRATE_fkey" FOREIGN KEY ("IDRATE") REFERENCES "rate"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
