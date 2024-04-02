/*
  Warnings:

  - A unique constraint covering the columns `[audio_url]` on the table `Script` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Script" ADD COLUMN     "audio_url" VARCHAR(255) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Script_audio_url_key" ON "Script"("audio_url");
