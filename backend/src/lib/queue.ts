import Queue from "bull";

// Configuração da fila
const estabelecimentosQueue = new Queue("estabelecimentos", {
  redis: {
    host: "127.0.0.1", // Altere conforme necessário
    port: 6379,
  },
});

export default estabelecimentosQueue;
