import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const vendasSchema = z.object({
  data: z.string(),
  total: z.number(),
  clientId: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const vendas = await prisma.venda.findMany();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = vendasSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const { data, total, clienteId } = req.body;

    const venda = await prisma.venda.create({
      data: {
        data,
        total,
        clienteId,
      },
    });

    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = vendasSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const { id } = req.params;
    const { data, total, clienteId } = req.body;

    const venda = await prisma.venda.update({
      data: {
        data,
        total,
        clienteId,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(venda);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const venda = await prisma.venda.delete({
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
