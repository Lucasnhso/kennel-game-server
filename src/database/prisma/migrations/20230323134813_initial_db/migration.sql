-- CreateTable
CREATE TABLE "Breed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "minHeight" DECIMAL NOT NULL,
    "maxHeight" DECIMAL NOT NULL,
    "femaleMinWeight" DECIMAL NOT NULL,
    "femaleMaxWeight" DECIMAL NOT NULL,
    "maleMinWeight" DECIMAL NOT NULL,
    "maleMaxWeight" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "PercentBreed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "breedId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,
    "percent" INTEGER NOT NULL,
    CONSTRAINT "PercentBreed_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PercentBreed_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "fatherId" INTEGER,
    "motherId" INTEGER,
    "height" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    "dogId" INTEGER NOT NULL,
    CONSTRAINT "Dog_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Dog_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Dog" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
