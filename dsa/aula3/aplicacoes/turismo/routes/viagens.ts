import { PrismaClient } from "@prisma/client";
import { Transporte } from "@prisma/client";
import validarDados from "../utils/validarDados";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const viagemSchema = z.object({
  id: z.number().optional(),
  destino: z.string().min(1, "Destino é obrigatório"),
  transporte: z.nativeEnum(Transporte),
  dataSaida: z.string().min(1, "Data de saída é obrigatória"),
  preco: z.number().min(0, "Preço deve ser maior que zero"),
  duracao: z.number().min(0, "Duração deve ser maior que zero"),
  hotel: z.string().optional(),
  estrelas: z.number().min(1).max(5).optional(),
});

router.get("/", async (req, res) => {
  try {
    const viagens = await prisma.viagem.findMany();
    res.status(200).json(viagens);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/resumo", async (req, res) => {
  try {
    const viagens = await prisma.viagem.findMany({
      select: {
        destino: true,
        preco: true,
        duracao: true,
      },
      orderBy: {
        destino: "asc",
      },
    });
    res.status(200).json(viagens);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/preco/media", async (req, res) => {
  try {
    const media = await prisma.viagem.aggregate({
      _avg: {
        preco: true,
      },
    });

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/preco/:preco", async (req, res) => {
  try {
    const { preco } = req.params;
    const precoFloat = parseFloat(preco);

    if (isNaN(precoFloat)) {
      res.status(400).json({ erro: "Preço inválido" });
      return;
    }

    const viagens = await prisma.viagem.findMany({
      where: {
        preco: {
          lte: precoFloat,
        },
      },
    });

    res.status(200).json(viagens);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/transporte/:transporte", async (req, res) => {
  try {
    const { transporte } = req.params;

    if (!(transporte in Transporte)) {
      res.status(400).json({ erro: "Transporte inválido" });
      return;
    }

    const viagens = await prisma.viagem.findMany({
      where: {
        transporte: transporte as Transporte,
      },
    });

    res.status(200).json(viagens);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/duracao/media", async (req, res) => {
  try {
    const media = await prisma.viagem.aggregate({
      _avg: {
        duracao: true,
      },
    });

    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = viagemSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const { destino, transporte, dataSaida, preco, duracao, hotel, estrelas } =
      result.data;

    const viagem = await prisma.viagem.create({
      data: {
        destino,
        transporte,
        dataSaida,
        preco,
        duracao,
        hotel,
        estrelas,
      },
    });

    res.status(201).json(viagem);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { destino, transporte, dataSaida, preco, duracao, hotel, estrelas } =
      req.body;

    if (
      !validarDados(
        destino,
        transporte,
        dataSaida,
        preco,
        duracao,
        hotel,
        estrelas
      )
    ) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
    }

    const viagem = await prisma.viagem.update({
      data: {
        destino,
        transporte,
        dataSaida,
        preco,
        duracao,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(viagem);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const viagem = await prisma.viagem.delete({
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
