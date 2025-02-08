// src/index.ts
import express, { Request, Response } from "express";
import prisma from "./lib/prismaClient";
import getLocais from "./routes/scrape/locais";
import getEstabelecimentos from "./routes/scrape/estabelecimentos";
import { Cidade, Estabelecimento, FormaPagamento, Taxa } from "@prisma/client";
import { formatDate } from "./lib/dateFormat";

import { Parser } from "json2csv";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/cidades", async (req: Request, res: Response) => {
  try {
    const cidades = await prisma.cidade.findMany();
    res.json(cidades);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

type EstabelecimentoComCidades = Estabelecimento & {
  Cidade?: Cidade;
  taxa?: Taxa;
  formasPagamento: FormaPagamento[];
};

function cleanData(data: EstabelecimentoComCidades[]) {
  return data.map((item) => {
    return {
      estabelecimento: item.nome,
      logo: item.logo,
      slug: item.slug,
      categorias: item.filtros
        ? item.filtros.split(",").map((c) => c.trim())
        : [],
      banners: item.banner ? item.banner.split(",").map((b) => b.trim()) : [],
      novo: Boolean(item.novo),
      orange_friday: Boolean(item.orangefriday),
      evento: {
        ativo: Boolean(item.evento),
        cor_label: item.evento_label_cor || null,
        cor_borda_label: item.evento_border_label_cor || null,
        texto_label: item.evento_label_texto || null,
        cor_icone: item.evento_icone_cor || null,
        icone_url: item.evento_icone_url || null,
      },
      aberto: Boolean(item.aberto),
      indisponivel: Boolean(item.indisponivel),
      aceita_cupom: Boolean(item.aceita_cupom),
      faz_delivery: Boolean(item.faz_delivery),
      tempo_delivery: {
        min: item.prazo_delivery,
        max: item.prazo_delivery_max,
      },
      faz_retirada: Boolean(item.faz_retirada),
      tempo_retirada: {
        min: item.prazo_retirada,
        max: item.prazo_retirada_max,
      },
      valor_minimo_pedido: item.min_pedido,
      tipo_taxa: item.tipo_taxa,
      tem_promocao: Boolean(item.promocao),
      formas_pagamento: item.formasPagamento
        ? item.formasPagamento.map((item) => item.nome)
        : [],
      avaliacao: {
        estrelas: item.estrelas,
        favorito: Boolean(item.favorito),
      },
      layout: item.layout,
      cidade: item.Cidade
        ? {
            nome: item.Cidade.nome,
            slug: item.Cidade.slug,
            estado: item.Cidade.uf,
            status: Boolean(Number(item.Cidade.status)),
            inauguracao: formatDate(item.Cidade.inauguracao),
            quantidade_estabelecimento: Number(item.Cidade.quantidade),
          }
        : null,
      taxa_entrega: item.taxa
        ? {
            min: item.taxa.min,
            max: item.taxa.max,
            valor: item.taxa.valor,
          }
        : null,
    };
  });
}
app.get("/estabelecimentos", async (req: Request, res: Response) => {
  try {
    const estabelecimentos = await prisma.estabelecimento.findMany({
      include: {
        Cidade: true,
        taxa: true,
        formasPagamento: true,
      },
      // take: 1, // Limiting the number of results to 10
    });

    //Limpeza

    const data = cleanData(estabelecimentos as EstabelecimentoComCidades[]);
    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.header(
      "Content-Disposition",
      "attachment; filename=estabelecimentos.csv"
    );
    res.send(csv);

    // res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/scrape/locais", getLocais);
app.get("/scrape/estabelecimentos", getEstabelecimentos);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
