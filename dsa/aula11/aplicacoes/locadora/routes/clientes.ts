/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gerenciamento de clientes
 */

import prisma from "../prisma/prismaClient";
import { Router } from "express";
import { z } from "zod";

const router = Router();

const clientesSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  dataNascimento: z.string(),
});

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Lista apenas um cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser buscado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", async (req, res) => {
  try {
    const result = clientesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { nome, email, telefone, dataNascimento } = result.data;

    const cliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        telefone,
        dataNascimento,
      },
    });

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos enviados
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/:id", async (req, res) => {
  try {
    const result = clientesSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ erro: "Informe todos os campos corretamente" });
      return;
    }

    const { nome, email, telefone, dataNascimento } = result.data;
    const { id } = req.params;

    const cliente = await prisma.cliente.update({
      data: {
        nome,
        email,
        telefone,
        dataNascimento,
      },
      where: {
        id: Number(id),
      },
    });

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente e suas locações associadas
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
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

    await prisma.$transaction([
      prisma.locacao.deleteMany({
        where: { clienteId: Number(id) },
      }),
      prisma.cliente.delete({
        where: {
          id: Number(id),
        },
      }),
    ]);

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
 *     ClienteModel:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do cliente
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           description: Email do cliente
 *           example: "joao@email.com"
 *         telefone:
 *           type: string
 *           description: Telefone do cliente
 *           example: "5511912345678"
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento
 *           example: "1990-01-01T00:00:00Z"
 *     ClienteInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         telefone:
 *           type: string
 *           example: "5511912345678"
 *         dataNascimento:
 *           type: string
 *           format: date
 *           example: "1990-01-01T00:00:00Z"
 *       required:
 *         - nome
 *         - email
 *         - dataNascimento
 */
