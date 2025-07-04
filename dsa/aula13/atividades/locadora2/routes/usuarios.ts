import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const router = Router();

const usuarioSchema = z.object({
  nome: z
    .string()
    .min(10, { message: "Nome deve possuir, no mínimo, 10 caracteres" }),
  email: z
    .string()
    .email()
    .min(10, { message: "E-mail, no mínimo, 10 caracteres" }),
  senha: z.string(),
});

const redefinirSenhaSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
});

const redefinirSenhaValidaSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  senha: z.string(),
  codigo: z.string().length(6, { message: "Código deve ter 6 caracteres" }),
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

function validaSenha(senha: string) {
  const mensagens: string[] = [];

  if (senha.length < 8) {
    mensagens.push("Erro... senha deve possuir, no mínimo, 8 caracteres");
  }

  let pequenas = 0;
  let grandes = 0;
  let numeros = 0;
  let simbolos = 0;

  for (const letra of senha) {
    if (/[a-z]/.test(letra)) pequenas++;
    else if (/[A-Z]/.test(letra)) grandes++;
    else if (/[0-9]/.test(letra)) numeros++;
    else simbolos++;
  }

  if (pequenas == 0)
    mensagens.push("Erro... senha deve possuir letra(s) minúscula(s)");

  if (grandes == 0)
    mensagens.push("Erro... senha deve possuir letra(s) maiúscula(s)");

  if (numeros == 0) mensagens.push("Erro... senha deve possuir número(s)");

  if (simbolos == 0) mensagens.push("Erro... senha deve possuir símbolo(s)");

  return mensagens;
}

router.post("/", async (req, res) => {
  const valida = usuarioSchema.safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }

  const { nome, email, senha } = valida.data;

  const mensagensErro = validaSenha(senha);

  if (mensagensErro.length > 0) {
    res.status(400).json({ erro: mensagensErro.join("; ") });
    return;
  }

  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(senha, salt);

  try {
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: hash },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error });
  }
});

function gerarEmailRedefinicaoHTML(usuario: any, codigo: string) {
  const html = `
    <html>
      <body style="font-family: Helvetica, Arial, sans-serif; line-height: 1.6;">
        <h2>Locadora Avenida - Recuperação de Senha</h2>
        <p>Olá, <strong>${usuario.nome}</strong>.</p>
        <p>Recebemos uma solicitação para redefinir sua senha.</p>
        <p><strong>Este é o seu código de verificação:</strong></p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #2c3e50;">
          ${codigo}
        </div>
        <p>Este código é válido por 15 minutos.</p>
        <p>Se você não solicitou a redefinição de senha, ignore este e-mail.</p>
        <br>
        <p>Atenciosamente,</p>
        <p><strong>Equipe Locadora Avenida</strong></p>
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

async function enviaEmailRedefinicao(usuario: any, codigo: string) {
  const mensagem = gerarEmailRedefinicaoHTML(usuario, codigo);

  const info = await transporter.sendMail({
    from: "Locadora <locadora-avenida@no-reply.com>",
    to: usuario.email,
    subject: "Recuperação de Senha",
    text: "Segue seu token para redefinicao de senha.", // Corpo simples
    html: mensagem, // Corpo HTML
  });

  console.log("E-mail enviado:", info.messageId);
}

router.post("/redefinirsenha", async (req: any, res: any) => {
  const valida = redefinirSenhaSchema.safeParse(req.body);

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error });
  }

  const { email } = valida.data;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res
        .status(400)
        .json({ erro: "Usuário não encontrado com este e-mail" });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.usuario.update({
      where: { email },
      data: {
        codigoRecuperacao: codigo,
      },
    });

    const descricao = `Soliticao de redefinicao de senha`;
    const complemento = `Usuario: #${usuario.id}`;

    const log = await prisma.log.create({
      data: { descricao, complemento, usuarioId: usuario.id },
    });

    await enviaEmailRedefinicao(usuario, codigo);

    res.status(200).json({
      mensagem: "Código de recuperação enviado para o e-mail",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar solicitação" });
  }
});

router.post("/redefinirsenha/validar", async (req: any, res: any) => {
  const valida = redefinirSenhaValidaSchema.safeParse(req.body);

  if (!valida.success) {
    return res.status(400).json({ erro: valida.error });
  }

  const { email, senha, codigo } = valida.data;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res
        .status(400)
        .json({ erro: "Usuário não encontrado com este e-mail" });
    }

    if (usuario.codigoRecuperacao !== codigo) {
      return res.status(400).json({ erro: "Código de recuperação inválido" });
    }

    const mensagensErro = validaSenha(senha);

    if (mensagensErro.length > 0) {
      res.status(400).json({ erro: mensagensErro.join("; ") });
      return;
    }

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(senha, salt);

    await prisma.usuario.update({
      where: { email },
      data: {
        senha: hash,
        codigoRecuperacao: null,
      },
    });

    const descricao = `Senha redefinida`;
    const complemento = `Usuario: #${usuario.id}`;

    const log = await prisma.log.create({
      data: { descricao, complemento, usuarioId: usuario.id },
    });

    res.status(200).json({
      mensagem: "Senha alterada com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar solicitação" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.delete({
      where: { id },
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const valida = usuarioSchema.safeParse(req.body);
  if (!valida.success) {
    res.status(400).json({ erro: valida.error });
    return;
  }

  const { nome, email, senha } = valida.data;

  try {
    const usuario = await prisma.usuario.update({
      where: { id },
      data: { nome, email, senha },
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
