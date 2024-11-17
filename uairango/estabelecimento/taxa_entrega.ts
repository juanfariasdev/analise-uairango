curl -X GET "https://www.uairango.com/api-v2/oauth/taxaEntrega/4314" ^
-H "Content-Type: application/json"

interface TaxaEntrega {
    id_taxa: number;     // ID da taxa
    id_tipo_taxa: number; // ID do tipo de taxa (ex: 3 para "Taxa de entrega")
    nome: string;         // Nome da localidade ou área onde a taxa se aplica
    valor: number;        // Valor da taxa de entrega
}

type TaxasEntregaEstabelecimento = TaxaEntrega[];
