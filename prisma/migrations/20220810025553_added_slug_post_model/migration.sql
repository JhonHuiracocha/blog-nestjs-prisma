/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Post_title_key` ON `post`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `slug` VARCHAR(255) NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Post_slug_key` ON `Post`(`slug`);
