/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: API para gerenciamento de clientes
 */

import prisma from "../prisma/prismaClient";
import { Router } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";

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
 *                 $ref: '#/components/schemas/ClienteModel'
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
 *                 $ref: '#/components/schemas/ClienteModel'
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", async (req: any, res: any) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!cliente)
      return res.status(404).json({ erro: "Cliente não encontrado" });

    res.status(200).json(cliente);
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
 *               $ref: '#/components/schemas/ClienteModel'
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
 *               $ref: '#/components/schemas/ClienteModel'
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
 *     summary: Remove um cliente e suas locações associadas, alem de tornar os filmes disponíveis novamente
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

    await prisma.$transaction(async (tx) => {
      const locacoes = await tx.locacao.findMany({
        where: { clienteId: Number(id) },
        select: { filmeId: true },
      });

      const filmeIds = locacoes.map((l) => l.filmeId);

      await tx.filme.updateMany({
        where: { id: { in: filmeIds } },
        data: { disponivel: true },
      });

      await tx.locacao.deleteMany({
        where: { clienteId: Number(id) },
      });

      await tx.cliente.delete({
        where: { id: Number(id) },
      });
    });

    res.status(200).json(id);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

function gerarTabelaLocacoesHTML(cliente: any) {
  let html = `
    <html>
    <body style="font-family: Helvetica, Arial, sans-serif;">
    <h2>Locadora Avenida - Relatório de Locações</h2>
    <h3>Cliente: ${cliente.nome}</h3>
    <h3>Email: ${cliente.email}</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead style="background-color: rgb(195, 191, 191);">
        <tr>
          <th>Data da Locação</th>
          <th>Título do Filme</th>
          <th>Gênero</th>
          <th>Ano</th>
          <th>Duração (min)</th>
          <th>Data de Devolução</th>
          <th>Valor (R$)</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;

  for (const locacao of cliente.locacoes) {
    const dataLocacao = new Date(locacao.dataLocacao).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const dataDevolucao = locacao.dataDevolucao
      ? new Date(locacao.dataDevolucao).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Não devolvido";

    const valor = locacao.valor ? Number(locacao.valor) : 0;
    total += valor;

    html += `
      <tr>
        <td>${dataLocacao}</td>
        <td>${locacao.filme.titulo}</td>
        <td>${locacao.filme.genero || "-"}</td>
        <td>${locacao.filme.anoLancamento || "-"}</td>
        <td>${locacao.filme.duracao || "-"}</td>
        <td>${dataDevolucao}</td>
        <td style="text-align: right;">${valor.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</td>
      </tr>
    `;
  }

  html += `
      <tr style="font-weight: bold; background-color: rgb(235, 232, 232);">
        <td colspan="6" style="text-align: right;">Total:</td>
        <td style="text-align: right;">R$ ${total.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}</td>
      </tr>
    </tbody>
    </table>
    </body>
    </html>
  `;

  return html;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function enviaEmailLocacoes(cliente: any) {
  const mensagem = gerarTabelaLocacoesHTML(cliente);

  const info = await transporter.sendMail({
    from: "Locadora <locadora-avenida@no-reply.com>",
    to: cliente.email,
    subject: "Seu Relatório de Locações",
    text: "Segue seu relatório de locações.", // Corpo simples
    html: mensagem, // Corpo HTML
  });

  console.log("E-mail enviado:", info.messageId);
}

/**
 * @swagger
 * /clientes/enviar-relatorio/{id}:
 *   post:
 *     summary: Envia um relatório de locações por e-mail para o cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente que receberá o relatório por e-mail
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relatório enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 1
 *       404:
 *         description: Cliente não encontrado ou não possui locações
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/enviar-relatorio/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: {
        locacoes: {
          include: {
            filme: true,
          },
        },
      },
    });

    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    if (!cliente.locacoes || cliente.locacoes.length === 0) {
      return res.status(404).json({ erro: "Cliente não possui locações" });
    }

    await enviaEmailLocacoes(cliente);

    res.status(200).json({ mensagem: "Email enviado com sucesso", cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao enviar e-mail" });
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
