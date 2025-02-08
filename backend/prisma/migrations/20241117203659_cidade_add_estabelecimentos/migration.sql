-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_estabelecimentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_estabelecimento" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "filtros" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "novo" INTEGER NOT NULL,
    "orangefriday" INTEGER NOT NULL,
    "evento" INTEGER NOT NULL,
    "pagOnline" INTEGER NOT NULL,
    "evento_label_cor" TEXT,
    "evento_border_label_cor" TEXT,
    "evento_label_texto" TEXT,
    "evento_icone_cor" TEXT,
    "evento_icone_url" TEXT,
    "aberto" INTEGER NOT NULL,
    "indisponivel" INTEGER NOT NULL,
    "aceita_cupom" INTEGER NOT NULL,
    "faz_delivery" INTEGER NOT NULL,
    "prazo_delivery" INTEGER NOT NULL,
    "prazo_delivery_max" INTEGER NOT NULL,
    "faz_retirada" INTEGER NOT NULL,
    "prazo_retirada" INTEGER NOT NULL,
    "prazo_retirada_max" INTEGER NOT NULL,
    "min_pedido" INTEGER NOT NULL,
    "tipo_taxa" INTEGER NOT NULL,
    "promocao" INTEGER NOT NULL,
    "formas_pagamento" TEXT NOT NULL,
    "estrelas" INTEGER NOT NULL,
    "favorito" INTEGER NOT NULL,
    "layout" INTEGER NOT NULL,
    "taxa_id" INTEGER NOT NULL,
    "cidadeId" TEXT,
    CONSTRAINT "estabelecimentos_taxa_id_fkey" FOREIGN KEY ("taxa_id") REFERENCES "taxas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "estabelecimentos_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "cidades" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_estabelecimentos" ("aberto", "aceita_cupom", "banner", "estrelas", "evento", "evento_border_label_cor", "evento_icone_cor", "evento_icone_url", "evento_label_cor", "evento_label_texto", "favorito", "faz_delivery", "faz_retirada", "filtros", "formas_pagamento", "id", "id_estabelecimento", "indisponivel", "layout", "logo", "min_pedido", "nome", "novo", "orangefriday", "pagOnline", "prazo_delivery", "prazo_delivery_max", "prazo_retirada", "prazo_retirada_max", "promocao", "slug", "taxa_id", "tipo_taxa") SELECT "aberto", "aceita_cupom", "banner", "estrelas", "evento", "evento_border_label_cor", "evento_icone_cor", "evento_icone_url", "evento_label_cor", "evento_label_texto", "favorito", "faz_delivery", "faz_retirada", "filtros", "formas_pagamento", "id", "id_estabelecimento", "indisponivel", "layout", "logo", "min_pedido", "nome", "novo", "orangefriday", "pagOnline", "prazo_delivery", "prazo_delivery_max", "prazo_retirada", "prazo_retirada_max", "promocao", "slug", "taxa_id", "tipo_taxa" FROM "estabelecimentos";
DROP TABLE "estabelecimentos";
ALTER TABLE "new_estabelecimentos" RENAME TO "estabelecimentos";
CREATE UNIQUE INDEX "estabelecimentos_id_estabelecimento_key" ON "estabelecimentos"("id_estabelecimento");
CREATE UNIQUE INDEX "estabelecimentos_slug_key" ON "estabelecimentos"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
