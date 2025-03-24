import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const filmes = await prisma.filme.findMany();
  res.status(200).json(filmes);
});

router.post("/", async (req, res) => {
  const { titulo, genero, duracao, preco, sinopse = null } = req.body;

  if (!titulo || !genero || !duracao || !preco) {
    res.status(400).json({ erro: "Informe todos dados" });
    return;
  }

  const filme = await prisma.filme.create({
    data: { titulo, genero, duracao, preco, sinopse },
  });
  res.status(201).json(filme);
});

export default router;
