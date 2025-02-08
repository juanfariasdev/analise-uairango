// src/index.ts
import express, { Request, Response } from "express";
import prisma from "./lib/prismaClient";
import getLocais from "./routes/scrape/locais";
import getEstabelecimentos from "./routes/scrape/estabelecimentos";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/cidades", async (req: Request, res: Response) => {
  try {
    const cidades = await prisma.cidade.findMany();
    res.json(cidades);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/estabelecimentos", async (req: Request, res: Response) => {
  try {
    const estabelecimentos = await prisma.estabelecimento.findMany();
    res.json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/scrape/locais", getLocais);
app.get("/scrape/estabelecimentos", getEstabelecimentos);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
