/**
 * @swagger
 * tags:
 *   name: Locações
 *   description: API para gerenciamento de locações de filmes
 */

import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const locacoesSchema = z.object({
  clienteId: z.number().int().min(1, "ID do cliente é obrigatório"),
  filmeId: z.number().int().min(1, "ID do filme é obrigatório"),
  dataLocacao: z.string(),
  dataDevolucao: z.string().optional(),
  valor: z.number().min(0, "Valor deve ser maior ou igual a zero").optional(),
});

/**
 * @swagger
 * /locacoes:
 *   get:
 *     summary: Lista todas as locações
 *     tags: [Locações]
 *     responses:
 *       200:
 *         description: Lista de locações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Locacao'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", async (req, res) => {
  try {
    const locacoes = await prisma.locacao.findMany();
    res.status(200).json(locacoes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes:
 *   post:
 *     summary: Cria uma nova locação e marca o filme como indisponível
 *     tags: [Locações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocacaoInput'
 *     responses:
 *       201:
 *         description: Locação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Locacao'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", async (req, res) => {
  try {
    const result = locacoesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { clienteId, filmeId, dataLocacao, dataDevolucao, valor } =
      result.data;

    const [_, locacao] = await prisma.$transaction([
      prisma.filme.update({
        where: { id: filmeId },
        data: { disponivel: false },
      }),
      prisma.locacao.create({
        data: {
          clienteId,
          filmeId,
          dataLocacao,
          dataDevolucao,
          valor,
        },
      }),
    ]);

    res.status(201).json(locacao);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes/{id}:
 *   patch:
 *     summary: Finaliza uma locação e marca o filme como disponível
 *     tags: [Locações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da locação a ser finalizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocacaoInput'
 *     responses:
 *       200:
 *         description: Locação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Locacao'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.patch("/:id", async (req, res) => {
  try {
    const result = locacoesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { filmeId } = result.data;
    const { id } = req.params;

    const [locacao, _] = await prisma.$transaction([
      prisma.locacao.update({
        where: { id: Number(id) },
        data: { dataDevolucao: new Date() },
      }),
      prisma.filme.update({
        where: { id: filmeId },
        data: { disponivel: true },
      }),
    ]);

    res.status(200).json(locacao);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes/{id}:
 *   delete:
 *     summary: Remove uma locação
 *     tags: [Locações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da locação a ser removida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Locação removida com sucesso
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

    await prisma.locacao.delete({
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
 *     Locacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da locação
 *           example: 1
 *         clienteId:
 *           type: integer
 *           description: ID do cliente
 *           example: 3
 *         filmeId:
 *           type: integer
 *           description: ID do filme
 *           example: 5
 *         dataLocacao:
 *           type: string
 *           format: date
 *           description: Data da locação
 *           example: "2025-06-01"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           description: Data da devolução
 *           example: "2025-06-10"
 *         valor:
 *           type: number
 *           description: Valor da locação
 *           example: 14.90
 *     LocacaoInput:
 *       type: object
 *       properties:
 *         clienteId:
 *           type: integer
 *           example: 3
 *         filmeId:
 *           type: integer
 *           example: 5
 *         dataLocacao:
 *           type: string
 *           format: date
 *           example: "2025-06-01"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           example: "2025-06-10"
 *         valor:
 *           type: number
 *           example: 14.90
 *       required:
 *         - clienteId
 *         - filmeId
 *         - dataLocacao
 */
