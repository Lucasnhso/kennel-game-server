/*
  Warnings:

  - You are about to alter the column `percent` on the `PercentBreed` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PercentBreed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "breedId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "percent" DECIMAL NOT NULL,
    CONSTRAINT "PercentBreed_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PercentBreed_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PercentBreed" ("breedId", "dogId", "id", "percent") SELECT "breedId", "dogId", "id", "percent" FROM "PercentBreed";
DROP TABLE "PercentBreed";
ALTER TABLE "new_PercentBreed" RENAME TO "PercentBreed";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
