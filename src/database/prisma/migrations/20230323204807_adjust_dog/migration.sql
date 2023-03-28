/*
  Warnings:

  - You are about to drop the column `dogId` on the `Dog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "height" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    CONSTRAINT "Dog_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Dog_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dog" ("fatherId", "gender", "height", "id", "motherId", "name", "weight") SELECT "fatherId", "gender", "height", "id", "motherId", "name", "weight" FROM "Dog";
DROP TABLE "Dog";
ALTER TABLE "new_Dog" RENAME TO "Dog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
