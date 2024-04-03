/*
  Warnings:

  - The values [CHECKED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Script` table. All the data in the column will be lost.
  - Added the required column `edited_caption` to the `Script` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_caption` to the `Script` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('CHECKING', 'CHECKED_OK', 'CHECKED_EDITED');
ALTER TABLE "Script" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Script" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Script" ALTER COLUMN "status" SET DEFAULT 'CHECKING';
COMMIT;

-- AlterTable
ALTER TABLE "Script" DROP COLUMN "description",
ADD COLUMN     "edited_caption" TEXT NOT NULL,
ADD COLUMN     "original_caption" TEXT NOT NULL;
