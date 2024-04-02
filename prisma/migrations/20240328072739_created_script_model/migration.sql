-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CHECKING', 'CHECKED');

-- CreateTable
CREATE TABLE "Script" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'CHECKING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);
