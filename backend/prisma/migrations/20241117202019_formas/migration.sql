/*
  Warnings:

  - You are about to drop the `estabelecimento_formas_pagamento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "estabelecimento_formas_pagamento";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_EstabelecimentoToFormaPagamento" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EstabelecimentoToFormaPagamento_A_fkey" FOREIGN KEY ("A") REFERENCES "estabelecimentos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EstabelecimentoToFormaPagamento_B_fkey" FOREIGN KEY ("B") REFERENCES "formas_pagamento" ("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EstabelecimentoToFormaPagamento_AB_unique" ON "_EstabelecimentoToFormaPagamento"("A", "B");

-- CreateIndex
CREATE INDEX "_EstabelecimentoToFormaPagamento_B_index" ON "_EstabelecimentoToFormaPagamento"("B");
