import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const router = Router()

router.get('/backup', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    const clientes = await prisma.cliente.findMany()
    const filmes = await prisma.filme.findMany()
    const locacoes = await prisma.locacao.findMany()
    const logs = await prisma.log.findMany()

    const dadosBackup = {
      usuarios,
      clientes,
      filmes,
      locacoes,
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

router.post('/restore', async (req: any, res: any) => {
  try {
    const caminho = path.resolve(__dirname, '../../backup.json')
    if (!fs.existsSync(caminho)) {
      return res.status(404).json({ erro: 'Arquivo de backup.json não encontrado.' })
    }

    const conteudo = fs.readFileSync(caminho, 'utf8')
    const dados = JSON.parse(conteudo)

    await prisma.cliente.deleteMany()
    await prisma.filme.deleteMany()
    await prisma.locacao.deleteMany()
    await prisma.log.deleteMany()
    await prisma.usuario.deleteMany()

    for (const usuario of dados.usuarios) {
      await prisma.usuario.create({ data: usuario })
    }

    for (const locacao of dados.locacoes) {
      await prisma.locacao.create({ data: locacao })
    }

    for (const cliente of dados.clientes) {
      await prisma.cliente.create({ data: cliente })
    }

    for (const filme of dados.filmes) {
      await prisma.filme.create({ data: filme })
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