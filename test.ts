const fetchData = async () => {
  try {
    const url =
      "http://localhost:3001/consulta/?nomeFantasiaCNPJ=&razao_social=&cnae_fiscal=&municipio=4779&uf=MG";
    // Fazendo a requisição com fetch
    const response = await fetch(`${url}`);

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados buscados com sucesso:", data.length);
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error; // Relança o erro para ser tratado na chamada
  }
};

fetchData();
