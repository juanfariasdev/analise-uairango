curl -X GET "https://www.uairango.com/api-v2/oauth/formas_pagamento/4314" ^
-H "Content-Type: application/json"

interface FormaPagamento {
    id_categoria: number;   // ID da categoria de pagamento
    id_forma: number;       // ID único da forma de pagamento
    tipo: string;           // Nome do tipo de pagamento (ex: "Dinheiro", "Visa Crédito")
    img: string;            // Caminho da imagem do tipo de pagamento
}

interface FormasPagamento {
    "Pagar na entrega": FormaPagamento[];
    "Pagar na retirada": FormaPagamento[];
    "Pagar pelo aplicativo": FormaPagamento[];
}
