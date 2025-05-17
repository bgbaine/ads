import { PrismaClient } from "@prisma/client";
import { Laboratorio } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const itensVendaSchema = z.object({
  quantidade: z.number(),
  preco: z.number(),
  produtoId: z.number(),
  vendaId: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const itensVenda = await prisma.itemVenda.findMany();
    res.status(200).json(itensVenda);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = itensVendaSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const { quantidade, preco, produtoId, vendaId } = req.body;

    const itemVenda = await prisma.itemVenda.create({
      data: {
        quantidade,
        preco,
        produtoId,
        vendaId,
      },
    });

    res.status(201).json(itemVenda);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = itensVendaSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const { id } = req.params;
    const { quantidade, preco, produtoId, vendaId } = req.body;

    const itemVenda = await prisma.itemVenda.update({
      data: {
        quantidade,
        preco,
        produtoId,
        vendaId,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(itemVenda);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const itemVenda = await prisma.itemVenda.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
export default router;
