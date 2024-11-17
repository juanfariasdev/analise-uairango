/*
  Warnings:

  - You are about to drop the column `estado` on the `cidades` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Estado" (
    "uf" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cidade" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "exibe" TEXT NOT NULL,
    "inauguracao" DATETIME NOT NULL,
    "inaugurou" BOOLEAN NOT NULL,
    "gmt" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "cidades_uf_fkey" FOREIGN KEY ("uf") REFERENCES "Estado" ("uf") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_cidades" ("created_at", "exibe", "gmt", "id", "id_cidade", "inauguracao", "inaugurou", "nome", "quantidade", "slug", "status", "uf", "updated_at") SELECT "created_at", "exibe", "gmt", "id", "id_cidade", "inauguracao", "inaugurou", "nome", "quantidade", "slug", "status", "uf", "updated_at" FROM "cidades";
DROP TABLE "cidades";
ALTER TABLE "new_cidades" RENAME TO "cidades";
CREATE UNIQUE INDEX "cidades_id_cidade_key" ON "cidades"("id_cidade");
CREATE UNIQUE INDEX "cidades_slug_key" ON "cidades"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Estado_uf_key" ON "Estado"("uf");
