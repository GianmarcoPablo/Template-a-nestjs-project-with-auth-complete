/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Trend` table. All the data in the column will be lost.
  - You are about to drop the column `tweetCount` on the `Trend` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Trend` table. All the data in the column will be lost.
  - You are about to drop the `TrendTweet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hashtagId` to the `Trend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrendTweet" DROP CONSTRAINT "TrendTweet_trendId_fkey";

-- DropForeignKey
ALTER TABLE "TrendTweet" DROP CONSTRAINT "TrendTweet_tweetId_fkey";

-- DropIndex
DROP INDEX "Trend_name_key";

-- AlterTable
ALTER TABLE "Trend" DROP COLUMN "createdAt",
DROP COLUMN "tweetCount",
DROP COLUMN "updatedAt",
ADD COLUMN     "hashtagId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TrendTweet";

-- AddForeignKey
ALTER TABLE "Trend" ADD CONSTRAINT "Trend_hashtagId_fkey" FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
