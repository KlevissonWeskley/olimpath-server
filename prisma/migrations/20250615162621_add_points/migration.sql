-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "DailyQuizProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DailyQuizProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyQuizProgress_userId_date_key" ON "DailyQuizProgress"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyQuizProgress" ADD CONSTRAINT "DailyQuizProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
