/*
  Warnings:

  - You are about to drop the `HashtagOnTweet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HashtagOnTweet" DROP CONSTRAINT "HashtagOnTweet_hashtagId_fkey";

-- DropForeignKey
ALTER TABLE "HashtagOnTweet" DROP CONSTRAINT "HashtagOnTweet_tweetId_fkey";

-- AlterTable
ALTER TABLE "Hashtag" ADD COLUMN     "hashtagCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "HashtagOnTweet";
