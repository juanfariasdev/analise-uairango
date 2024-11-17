https://www.uairango.com/api-v2/oauth/cardapio/4314


curl -X GET "https://www.uairango.com/api-v2/oauth/cardapio/4314" ^
    -H "Content-Type: application/json" 

interface Opcao {
    id_opcao: number;
    descricao: string;
    valorAtual: number;
    valor: number;
    valor2: number | null;
}

interface Produto {
    id_categoria: number;
    culinaria: string;
    id_produto: number;
    produto: string;
    foto: string | null;
    descricao: string;
    opcoes: Opcao[];
    promocao: number;
    orangefriday: number;
    itemEvento: number;
}

interface Categoria {
    id_categoria: number;
    descricao: string;
    inicio: string;
    fim: string;
    disponivel: boolean;
    meio_a_meio: any[]; // Lista de opções meio a meio (não foi especificado o conteúdo)
    inteira: Produto[];
}

interface Cardapio {
    [key: string]: Categoria;
}
