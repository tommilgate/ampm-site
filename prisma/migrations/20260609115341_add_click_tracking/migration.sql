-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER,
    "kind" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Click_eventId_idx" ON "Click"("eventId");

-- CreateIndex
CREATE INDEX "Click_kind_idx" ON "Click"("kind");
