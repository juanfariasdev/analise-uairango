-- CreateTable
CREATE TABLE "estabelecimentos" (
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
    CONSTRAINT "estabelecimentos_taxa_id_fkey" FOREIGN KEY ("taxa_id") REFERENCES "taxas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "taxas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "valor" INTEGER
);

-- CreateTable
CREATE TABLE "formas_pagamento" (
    "id_categoria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estabelecimento_formas_pagamento" (
    "estabelecimento_id" INTEGER NOT NULL,
    "forma_pagamento_id" INTEGER NOT NULL,

    PRIMARY KEY ("estabelecimento_id", "forma_pagamento_id"),
    CONSTRAINT "estabelecimento_formas_pagamento_estabelecimento_id_fkey" FOREIGN KEY ("estabelecimento_id") REFERENCES "estabelecimentos" ("id_estabelecimento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "estabelecimento_formas_pagamento_forma_pagamento_id_fkey" FOREIGN KEY ("forma_pagamento_id") REFERENCES "formas_pagamento" ("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "estabelecimentos_id_estabelecimento_key" ON "estabelecimentos"("id_estabelecimento");

-- CreateIndex
CREATE UNIQUE INDEX "estabelecimentos_slug_key" ON "estabelecimentos"("slug");
