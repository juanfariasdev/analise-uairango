curl -X GET "https://www.uairango.com/api-v2/oauth/estabelecimento/horarios/4314" ^
-H "Content-Type: application/json"

interface HorariosEstabelecimento {
    dia: number;         // Representa o dia da semana (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
    inicio1: string;     // Hora de início da primeira faixa horária (HH:MM:SS)
    fim1: string;        // Hora de término da primeira faixa horária (HH:MM:SS)
    inicio2: string;     // Hora de início da segunda faixa horária (HH:MM:SS), caso exista
    fim2: string;        // Hora de término da segunda faixa horária (HH:MM:SS), caso exista
    hoje: number;        // Flag para indicar se o horário é para hoje (0 ou 1)
}

type HorariosResponse = HorariosEstabelecimento[];
