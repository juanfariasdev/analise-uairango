// src/utils/fetchData.ts

export const fetchData = async ({
  endpoint,
  fetchProps,
}: {
  endpoint: string;
  fetchProps?: RequestInit;
}) => {
  try {
    const url = process.env.URL_UAIRANGO;

    if (!url) {
      throw new Error(
        "URL_UAIRANGO is not defined in the environment variables"
      );
    }

    // Fazendo a requisição com fetch
    const response = await fetch(`${url}/${endpoint}`, fetchProps);

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error; // Relança o erro para ser tratado na chamada
  }
};
