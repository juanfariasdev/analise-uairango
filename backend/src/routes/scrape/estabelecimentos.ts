import { Request, Response } from "express";
import { fetchData } from "../../scraper"; // Função de busca com base na URL
import prisma from "../../lib/prismaClient"; // Prisma Client

interface Estabelecimento {
  id_estabelecimento: number;
  nome: string;
  logo: string;
  slug: string;
  filtros: string;
  banner: string;
  novo: number;
  orangefriday: number;
  evento: number;
  pagOnline: number;
  evento_label_cor: string | null;
  evento_border_label_cor: string | null;
  evento_label_texto: string | null;
  evento_icone_cor: string | null;
  evento_icone_url: string | null;
  aberto: number;
  indisponivel: number;
  aceita_cupom: number;
  faz_delivery: number;
  prazo_delivery: number;
  prazo_delivery_max: number;
  faz_retirada: number;
  prazo_retirada: number;
  prazo_retirada_max: number;
  min_pedido: number;
  tipo_taxa: number;
  promocao: number;
  formas_pagamento: string;
  estrelas: number;
  favorito: number;
  layout: number;
  taxa: Taxa;
  formasPagamento: FormaPagamento[];
}

interface Taxa {
  min: number;
  max: number;
  valor?: number; // 'valor' pode estar presente ou não dependendo do estabelecimento
}

interface FormaPagamento {
  id_categoria: number;
  nome: string;
}

// Função para buscar dados do estabelecimento e salvar no banco
const scrapeEstabelecimento = async (): Promise<void> => {
  try {
    const locais = await prisma.cidade.findMany();

    for (const local of locais) {
      // Fazer a requisição para buscar dados do estabelecimento
      const estabelecimentos = (await fetchData({
        endpoint: `estabelecimentos/slug/${local.slug}`,
        fetchProps: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            seed: 12,
            id_categoria: 0,
            status: false,
            filtros: {
              tipo: [""],
              buscaProduto: "",
              categorias: [""],
              ordenar: "",
            },
          }),
        },
      })) as Estabelecimento[];

      if (estabelecimentos) {
        await saveEstabelecimentos(estabelecimentos, local.id_cidade); // Agora ele espera salvar antes de continuar
      }
    }
  } catch (error) {
    console.error("Erro ao buscar ou salvar o estabelecimento:", error);
    throw new Error("Erro ao salvar o estabelecimento");
  }
};

const saveEstabelecimentos = async (
  estabelecimentos: Estabelecimento[],
  idCidade: string
) => {
  // Salvar no banco de dados usando Prisma
  try {
    for (const estabelecimento of estabelecimentos) {
      const payment: FormaPagamento[] = estabelecimento.formasPagamento.map(
        (form) => ({
          id_categoria: form.id_categoria,
          nome: form.nome,
        })
      );
      // Salvar as formas de pagamento associadas ao estabelecimento
      for (const forma of payment) {
        await prisma.formaPagamento.upsert({
          where: {
            id_categoria: forma.id_categoria,
          },
          update: {},
          create: {
            nome: forma.nome,
            id_categoria: forma.id_categoria,
          },
        });
      }

      await prisma.estabelecimento.upsert({
        where: { slug: estabelecimento.slug },
        update: {
          nome: estabelecimento.nome,
          logo: estabelecimento.logo,
          filtros: estabelecimento.filtros,
          banner: estabelecimento.banner,
          novo: estabelecimento.novo,
          orangefriday: estabelecimento.orangefriday,
          evento: estabelecimento.evento,
          pagOnline: estabelecimento.pagOnline,
          evento_label_cor: estabelecimento.evento_label_cor,
          evento_border_label_cor: estabelecimento.evento_border_label_cor,
          evento_label_texto: estabelecimento.evento_label_texto,
          evento_icone_cor: estabelecimento.evento_icone_cor,
          evento_icone_url: estabelecimento.evento_icone_url,
          aberto: estabelecimento.aberto,
          indisponivel: estabelecimento.indisponivel,
          aceita_cupom: estabelecimento.aceita_cupom,
          faz_delivery: estabelecimento.faz_delivery,
          prazo_delivery: estabelecimento.prazo_delivery,
          prazo_delivery_max: isNaN(Number(estabelecimento.prazo_delivery_max))
            ? 0
            : Number(estabelecimento.prazo_delivery_max),
          faz_retirada: estabelecimento.faz_retirada,
          prazo_retirada: estabelecimento.prazo_retirada,
          prazo_retirada_max: isNaN(Number(estabelecimento.prazo_retirada_max))
            ? 0
            : Number(estabelecimento.prazo_retirada_max),
          min_pedido: estabelecimento.min_pedido,
          tipo_taxa: estabelecimento.tipo_taxa,
          promocao: estabelecimento.promocao,
          formas_pagamento: String(estabelecimento.formas_pagamento),
          estrelas: estabelecimento.estrelas,
          favorito: estabelecimento.favorito,
          layout: estabelecimento.layout,
          Cidade: {
            connect: {
              id_cidade: idCidade,
            },
          },
          taxa: {
            update: {
              min: isNaN(Number(estabelecimento.taxa.min))
                ? 0
                : Number(estabelecimento.taxa.min), // Converte para 0 se não for número
              max: isNaN(Number(estabelecimento.taxa.max))
                ? 0
                : Number(estabelecimento.taxa.max), // Converte para 0 se não for número
              valor: isNaN(Number(estabelecimento.taxa.valor))
                ? 0
                : Number(estabelecimento.taxa.valor), // Converte para 0 se não for número ou undefined
            },
          },
        },
        create: {
          id_estabelecimento: estabelecimento.id_estabelecimento,
          nome: estabelecimento.nome,
          logo: estabelecimento.logo,
          slug: estabelecimento.slug,
          filtros: estabelecimento.filtros,
          banner: estabelecimento.banner,
          novo: estabelecimento.novo,
          orangefriday: estabelecimento.orangefriday,
          evento: estabelecimento.evento,
          pagOnline: estabelecimento.pagOnline,
          evento_label_cor: estabelecimento.evento_label_cor,
          evento_border_label_cor: estabelecimento.evento_border_label_cor,
          evento_label_texto: estabelecimento.evento_label_texto,
          evento_icone_cor: estabelecimento.evento_icone_cor,
          evento_icone_url: estabelecimento.evento_icone_url,
          aberto: estabelecimento.aberto,
          indisponivel: estabelecimento.indisponivel,
          aceita_cupom: estabelecimento.aceita_cupom,
          faz_delivery: estabelecimento.faz_delivery,
          prazo_delivery: estabelecimento.prazo_delivery,
          prazo_delivery_max: isNaN(Number(estabelecimento.prazo_delivery_max))
            ? 0
            : Number(estabelecimento.prazo_delivery_max),
          faz_retirada: estabelecimento.faz_retirada,
          prazo_retirada: estabelecimento.prazo_retirada,
          prazo_retirada_max: isNaN(Number(estabelecimento.prazo_retirada_max))
            ? 0
            : Number(estabelecimento.prazo_retirada_max),
          min_pedido: estabelecimento.min_pedido,
          tipo_taxa: estabelecimento.tipo_taxa,
          promocao: estabelecimento.promocao,
          formas_pagamento: String(estabelecimento.formas_pagamento),
          estrelas: estabelecimento.estrelas,
          favorito: estabelecimento.favorito,
          layout: estabelecimento.layout,
          Cidade: {
            connect: {
              id_cidade: idCidade,
            },
          },
          taxa: {
            create: {
              min: isNaN(Number(estabelecimento.taxa.min))
                ? 0
                : Number(estabelecimento.taxa.min), // Converte para 0 se não for número
              max: isNaN(Number(estabelecimento.taxa.max))
                ? 0
                : Number(estabelecimento.taxa.max), // Converte para 0 se não for número
              valor: isNaN(Number(estabelecimento.taxa.valor))
                ? 0
                : Number(estabelecimento.taxa.valor), // Converte para 0 se não for número ou undefined
            },
          },
          formasPagamento: {
            connect: payment,
          },
        },
      });
    }
  } catch (error) {
    console.error("Erro ao salvar estabelecimento:", error);
    throw new Error("Erro ao salvar estabelecimento");
  }
};

// Rota Express para buscar e salvar um estabelecimento pelo slug
const getEstabelecimentos = async (req: Request, res: Response) => {
  try {
    const estabelecimento = await scrapeEstabelecimento();
    res.status(200).json({ data: estabelecimento });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getEstabelecimentos;
