-- DropIndex
DROP INDEX "Script_audio_url_key";

-- AlterTable
ALTER TABLE "Script" ALTER COLUMN "audio_url" DROP NOT NULL,
ALTER COLUMN "audio_url" DROP DEFAULT,
ALTER COLUMN "audio_url" SET DATA TYPE TEXT;
