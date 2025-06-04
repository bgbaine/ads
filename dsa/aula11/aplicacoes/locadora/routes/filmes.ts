/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: API para gerenciamento de filmes
 */

import prisma from "../prisma/prismaClient";
import { Router } from "express";
import { z } from "zod";

const router = Router();

const filmesSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  genero: z.string().min(1, "Gênero é obrigatório").optional(),
  anoLancamento: z
    .number()
    .int()
    .min(1900, "Ano de lançamento inválido")
    .optional(),
  duracao: z
    .number()
    .int()
    .min(1, "Duração deve ser maior que zero")
    .optional(),
  disponivel: z.boolean(),
});

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /filmes/disponiveis:
 *   get:
 *     summary: Lista apenas filmes disponíveis
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/disponiveis", async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany(
      {
        where: {
          disponivel: true,
        },
      }	
    );
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /filmes/indisponiveis:
 *   get:
 *     summary: Lista apenas filmes indisponíveis (locados)
 *     tags: [Filmes]
 *     responses:
 *       200:
 *         description: Lista de filmes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Filme'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/indisponiveis", async (req, res) => {
  try {
    const filmes = await prisma.filme.findMany(
      {
        where: {
          disponivel: false,
        },
      }	
    );
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /filmes:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Filmes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", async (req, res) => {
  try {
    const result = filmesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { titulo, genero, anoLancamento, duracao, disponivel } = result.data;

    const filme = await prisma.filme.create({
      data: {
        titulo,
        genero,
        anoLancamento,
        duracao,
        disponivel,
      },
    });

    res.status(201).json(filme);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /filmes/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FilmeInput'
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", async (req, res) => {
  try {
    const result = filmesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { titulo, genero, anoLancamento, duracao, disponivel } = result.data;
    const { id } = req.params;

    const filme = await prisma.filme.update({
      data: {
        titulo,
        genero,
        anoLancamento,
        duracao,
        disponivel,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(filme);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /filmes/{id}/disponibilidade:
 *   patch:
 *     summary: Alterna a disponibilidade de um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme para alternar disponibilidade
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponibilidade atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Filme'
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch("/:id/disponibilidade", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const filmeAtual = await prisma.filme.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!filmeAtual) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const filmeAtualizado = await prisma.filme.update({
      where: {
        id: Number(id),
      },
      data: {
        disponivel: !filmeAtual.disponivel,
      },
    });

    res.status(200).json(filmeAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar disponibilidade", detalhe: error });
  }
});

/**
 * @swagger
 * /filmes/{id}:
 *   delete:
 *     summary: Remove um filme
 *     tags: [Filmes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do filme a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 1
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.filme.delete({
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

/**
 * @swagger
 * components:
 *   schemas:
 *     FilmeModel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do filme
 *           example: 1
 *         titulo:
 *           type: string
 *           description: Título do filme
 *           example: "Matrix"
 *         genero:
 *           type: string
 *           description: Gênero do filme
 *           example: "Ficção Científica"
 *         anoLancamento:
 *           type: integer
 *           description: Ano de lançamento
 *           example: 1999
 *         duracao:
 *           type: integer
 *           description: Duração em minutos
 *           example: 136
 *         disponivel:
 *           type: boolean
 *           description: Disponibilidade do filme para locação
 *           example: true
 *     FilmeInput:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Título do filme
 *           example: "Matrix"
 *         genero:
 *           type: string
 *           description: Gênero do filme
 *           example: "Ficção Científica"
 *         anoLancamento:
 *           type: integer
 *           description: Ano de lançamento
 *           example: 1999
 *         duracao:
 *           type: integer
 *           description: Duração em minutos
 *           example: 136
 *         disponivel:
 *           type: boolean
 *           description: Disponibilidade do filme para locação
 *           example: true
 *       required:
 *         - titulo
 *         - disponivel
 */
