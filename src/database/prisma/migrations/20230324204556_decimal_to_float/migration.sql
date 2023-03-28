/*
  Warnings:

  - You are about to alter the column `percent` on the `PercentBreed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `femaleMaxWeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `femaleMinWeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `maleMaxWeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `maleMinWeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `maxHeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `minHeight` on the `Breed` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `height` on the `Dog` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `weight` on the `Dog` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PercentBreed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "breedId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "percent" REAL NOT NULL,
    CONSTRAINT "PercentBreed_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PercentBreed_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PercentBreed" ("breedId", "dogId", "id", "percent") SELECT "breedId", "dogId", "id", "percent" FROM "PercentBreed";
DROP TABLE "PercentBreed";
ALTER TABLE "new_PercentBreed" RENAME TO "PercentBreed";
CREATE TABLE "new_Breed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "minHeight" REAL NOT NULL,
    "maxHeight" REAL NOT NULL,
    "femaleMinWeight" REAL NOT NULL,
    "femaleMaxWeight" REAL NOT NULL,
    "maleMinWeight" REAL NOT NULL,
    "maleMaxWeight" REAL NOT NULL
);
INSERT INTO "new_Breed" ("femaleMaxWeight", "femaleMinWeight", "id", "maleMaxWeight", "maleMinWeight", "maxHeight", "minHeight", "name") SELECT "femaleMaxWeight", "femaleMinWeight", "id", "maleMaxWeight", "maleMinWeight", "maxHeight", "minHeight", "name" FROM "Breed";
DROP TABLE "Breed";
ALTER TABLE "new_Breed" RENAME TO "Breed";
CREATE TABLE "new_Dog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    CONSTRAINT "Dog_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Dog_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dog" ("fatherId", "gender", "height", "id", "motherId", "name", "weight") SELECT "fatherId", "gender", "height", "id", "motherId", "name", "weight" FROM "Dog";
DROP TABLE "Dog";
ALTER TABLE "new_Dog" RENAME TO "Dog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
