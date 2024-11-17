export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};
