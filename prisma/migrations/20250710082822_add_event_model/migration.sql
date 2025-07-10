/*
  Warnings:

  - You are about to drop the column `title` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('Ongoing', 'Completed');

-- DropIndex
DROP INDEX "User_title_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'Ongoing',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
