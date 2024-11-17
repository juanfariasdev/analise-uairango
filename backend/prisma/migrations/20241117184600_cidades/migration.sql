-- CreateTable
CREATE TABLE "cidades" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cidade" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "exibe" TEXT NOT NULL,
    "inauguracao" DATETIME NOT NULL,
    "inaugurou" BOOLEAN NOT NULL,
    "estado" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "gmt" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "cidades_id_cidade_key" ON "cidades"("id_cidade");

-- CreateIndex
CREATE UNIQUE INDEX "cidades_slug_key" ON "cidades"("slug");
