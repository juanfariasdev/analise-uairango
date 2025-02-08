// src/scrape/locais.ts
import { Request, Response } from "express";
import { fetchData } from "../../scraper";
import prisma from "../../lib/prismaClient";

interface Cidade {
  quantidade: string;
  id_cidade: string;
  nome: string;
  slug: string;
  status: string;
  exibe: string;
  inauguracao: string;
  inaugurou: string;
  estado: string; // O nome do estado
  uf: string; // A UF do estado
  gmt: string;
}

// Tipo para o objeto que contém os estados como chaves e listas de cidades como valores
interface DadosEstado {
  [estado: string]: Cidade[];
}

// Função para salvar os estados e as cidades no banco de dados
const saveLocais = async (locais: DadosEstado) => {
  try {
    // Percorrendo os dados de cada estado
    for (const [estadoNome, cidades] of Object.entries(locais)) {
      // Extraindo a UF do estado (supondo que o nome do estado é igual ao 'uf')
      const uf = cidades[0].uf; // Pegando o 'uf' da primeira cidade (supondo que todas as cidades têm a mesma UF)

      // Verificar se o estado já existe no banco de dados
      await prisma.estado.upsert({
        where: { uf: uf }, // Aqui, usamos o 'uf' como chave
        update: {}, // Não faz alterações se já existir
        create: {
          uf: uf, // A UF (Unidade Federativa)
          nome: estadoNome,
        },
      });

      // Salvar cidades associadas a esse estado
      await Promise.all(
        cidades.map(async (cidade) => {
          await prisma.cidade.upsert({
            where: { id_cidade: cidade.id_cidade },
            update: {
              nome: cidade.nome,
              slug: cidade.slug,
              status: cidade.status,
              exibe: cidade.exibe ? cidade.exibe : "",
              inauguracao: new Date(cidade.inauguracao),
              inaugurou: cidade.inaugurou === "true", // Converter para booleano
              uf: cidade.uf, // A UF da cidade, que é o estado relacionado
              gmt: cidade.gmt,
              quantidade: cidade.quantidade,
            },
            create: {
              id_cidade: cidade.id_cidade,
              nome: cidade.nome,
              slug: cidade.slug,
              status: cidade.status,
              exibe: cidade.exibe ? cidade.exibe : "",
              inauguracao: new Date(cidade.inauguracao),
              inaugurou: cidade.inaugurou === "true", // Converter para booleano
              uf: cidade.uf, // A UF da cidade, que é o estado relacionado
              gmt: cidade.gmt,
              quantidade: cidade.quantidade,
            },
          });
        })
      );
    }
  } catch (error) {
    console.error("Erro ao salvar locais:", error);
    throw new Error("Erro ao salvar locais no banco de dados");
  }
};

// Função para realizar a requisição HTTP e processar os dados
const scrapeLocais = async (): Promise<DadosEstado> => {
  try {
    // Requisição de dados usando a função fetchData
    const locais = (await fetchData({
      endpoint: "locais", // Endpoint da API
      fetchProps: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    })) as DadosEstado;

    // Salvar os locais no banco de dados
    await saveLocais(locais);

    return locais; // Retorna os dados como antes, se necessário
  } catch (error) {
    console.error("Erro ao buscar locais:", error);
    throw new Error("Erro ao buscar locais");
  }
};

// Rota Express para a URL /scrape/locais
const getLocais = async (req: Request, res: Response) => {
  try {
    // Chama a função scrapeLocais e salva os dados no banco
    const dadosEstado = await scrapeLocais();
    res.status(200).json({ data: dadosEstado });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getLocais;
