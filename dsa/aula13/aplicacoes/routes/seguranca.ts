import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const router = Router()

router.get('/backup', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    const alunos = await prisma.aluno.findMany()
    const produtos = await prisma.produto.findMany()
    const depositos = await prisma.deposito.findMany()
    const vendas = await prisma.venda.findMany()
    const logs = await prisma.log.findMany()

    const dadosBackup = {
      usuarios,
      alunos,
      produtos,
      depositos,
      vendas,
      logs,
      dataBackup: new Date().toISOString()
    }

    const caminho = path.resolve(__dirname, '../../backup.json')
    fs.writeFileSync(caminho, JSON.stringify(dadosBackup, null, 2))

    res.json({ mensagem: 'Backup gerado com sucesso!', arquivo: 'backup.json' })
  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao gerar o backup.' })
  }
})

router.post('/restore', async (req, res) => {
  try {
    const caminho = path.resolve(__dirname, '../../backup.json')
    if (!fs.existsSync(caminho)) {
      return res.status(404).json({ erro: 'Arquivo de backup.json não encontrado.' })
    }

    const conteudo = fs.readFileSync(caminho, 'utf8')
    const dados = JSON.parse(conteudo)

    // 1. Deletar todos os registros (ordem reversa das relações)
    await prisma.venda.deleteMany()
    await prisma.deposito.deleteMany()
    await prisma.aluno.deleteMany()
    await prisma.produto.deleteMany()
    await prisma.log.deleteMany()
    await prisma.usuario.deleteMany()

    // 2. Inserir os dados (ordem correta para respeitar as chaves estrangeiras (FKs))
    for (const usuario of dados.usuarios) {
      await prisma.usuario.create({ data: usuario })
    }

    for (const produto of dados.produtos) {
      await prisma.produto.create({ data: produto })
    }

    for (const aluno of dados.alunos) {
      await prisma.aluno.create({ data: aluno })
    }

    for (const deposito of dados.depositos) {
      await prisma.deposito.create({ data: deposito })
    }

    for (const venda of dados.vendas) {
      await prisma.venda.create({ data: venda })
    }

    for (const log of dados.logs) {
      await prisma.log.create({ data: log })
    }

    res.json({ mensagem: 'Dados restaurados com sucesso a partir do backup' })

  } catch (erro) {
    console.error(erro)
    res.status(500).json({ erro: 'Erro ao restaurar os dados.' })
  }
})

export default router