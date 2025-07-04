/**
 * @swagger
 * tags:
 *   name: Locações
 *   description: API para gerenciamento de locações de filmes
 */

import prisma from "../prisma/prismaClient";
import { Router } from "express";
import { z } from "zod";

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
 *                 $ref: '#/components/schemas/LocacaoModel'
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
 * /locacoes/abertas:
 *   get:
 *     summary: Lista apenas as locações abertas
 *     tags: [Locações]
 *     responses:
 *       200:
 *         description: Lista de locações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocacaoModel'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/abertas", async (req, res) => {
  try {
    const locacoes = await prisma.locacao.findMany({
      where: {
        dataDevolucao: null,
      },
    });
    res.status(200).json(locacoes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes/fechadas:
 *   get:
 *     summary: Lista apenas locações fechadas
 *     tags: [Locações]
 *     responses:
 *       200:
 *         description: Lista de locações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocacaoModel'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/fechadas", async (req: any, res: any) => {
  try {
    const locacoes = await prisma.locacao.findMany({
      where: {
        dataDevolucao: {
          not: null,
        },
      },
    });

    res.status(200).json(locacoes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes/{id}:
 *   get:
 *     summary: Lista uma locações específica por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da locação a ser finalizada
 *         schema:
 *           type: integer
 *     tags: [Locações]
 *     responses:
 *       200:
 *         description: Locação retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocacaoModel'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", async (req: any, res: any) => {
  try {
    const locacao = await prisma.locacao.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!locacao)
      return res.status(404).json({ erro: "Locação não encontrada" });

    res.status(200).json(locacao);
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
 *               $ref: '#/components/schemas/LocacaoModel'
 *       400:
 *         description: Filme não disponível
 *       404:
 *         description: Filme/Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", async (req: any, res: any) => {
  try {
    const result = locacoesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { clienteId, filmeId, dataLocacao, dataDevolucao, valor } =
      result.data;

    const cliente = await prisma.cliente.findUnique({
      where: { id: clienteId },
    });

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    const filme = await prisma.filme.findUnique({
      where: { id: filmeId },
      select: { disponivel: true },
    });

    if (!filme) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    if (filme.disponivel === false) {
      return res
        .status(400)
        .json({ erro: "Filme não está disponível para locação" });
    }

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
 *     summary: Finaliza uma locação (adiciona data de devolução) e marca o filme como disponível
 *     tags: [Locações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da locação a ser finalizada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Locação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LocacaoModel'
 *       400:
 *        description: Dados inválidos enviados
 *       404:
 *         description: Locação não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.patch("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const locacao = await prisma.locacao.findUnique({
      where: { id: Number(id) },
    });

    if (!locacao) {
      return res.status(404).json({ erro: "Locação não encontrada" });
    }

    const filmeId = locacao.filmeId;

    const [updatedLocacao, _] = await prisma.$transaction([
      prisma.locacao.update({
        where: { id: Number(id) },
        data: { dataDevolucao: new Date() },
      }),
      prisma.filme.update({
        where: { id: filmeId },
        data: { disponivel: true },
      }),
    ]);

    res.status(200).json(updatedLocacao);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /locacoes/{id}:
 *   delete:
 *     summary: Remove uma locação e marca o filme locado como disponível
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
router.delete("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const locacao = await prisma.locacao.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!locacao) {
      return res.status(404).json({ erro: "Locação não encontrada" });
    }

    await prisma.$transaction([
      prisma.locacao.delete({
        where: {
          id: Number(id),
        },
      }),
      prisma.filme.update({
        where: {
          id: locacao.filmeId,
        },
        data: {
          disponivel: true,
        },
      }),
    ]);

    res
      .status(200)
      .json({ mensagem: "Locação removida e filme disponibilizado", id });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover locação", detalhe: error });
  }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     LocacaoModel:
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
 *           example: "2025-06-01T00:00:00Z"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           description: Data da devolução
 *           example: "2025-06-10T00:00:00Z"
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
 *           example: "2025-06-01T00:00:00Z"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           example: "2025-06-10T00:00:00Z"
 *         valor:
 *           type: number
 *           example: 14.90
 *       required:
 *         - clienteId
 *         - filmeId
 *         - dataLocacao
 */
