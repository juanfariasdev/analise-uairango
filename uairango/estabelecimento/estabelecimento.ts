curl -X GET "https://www.uairango.com/api-v2/oauth/estabelecimento/slug/opcao-e-sabores" ^
-H "Content-Type: application/json" 

interface Estabelecimento {
    id_estabelecimento: number;
    nome: string;
    logo: string;
    slug: string;
    filtros: string;
    banner: string[];
    novo: number;
    aberto: number;
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
    estrelas: number;
    favorito: number;
    layout: number;
    taxa: {
        min: number;
        max: number;
    };
    num_avaliacoes: number;
    criterio1: number;
    criterio2: number;
    criterio3: number;
    criterio4: number;
}
