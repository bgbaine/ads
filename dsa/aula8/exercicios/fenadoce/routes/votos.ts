import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()

const router = Router()

const votoSchema = z.object({
  clienteId: z.number(),
  candidataId: z.number(),
  justificativa: z.string().optional()
})

router.get("/", async (req, res) => {
  try {
    const votos = await prisma.voto.findMany({
      include: {
        cliente: true,
        candidata: true
      }
    })
    res.status(200).json(votos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = votoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { clienteId, candidataId, justificativa } = valida.data

  try {
    const [voto, candidata] = await prisma.$transaction([
      prisma.voto.create({ 
        data: { clienteId, candidataId, justificativa } 
      }),
      prisma.candidata.update({
        where: { id: candidataId },
        data: { numVotos: { increment: 1 } }
      })])
    res.status(201).json({ voto, candidata })
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {

    const votoExcluido = await prisma.voto.findUnique({ where: { id: Number(id) } })

    const [voto, candidata] = await prisma.$transaction([
      prisma.voto.delete({ where: { id: Number(id) } }),
      prisma.candidata.update({
        where: { id: votoExcluido?.candidataId },
        data: { numVotos: { decrement: 1 } }
      })])

    res.status(200).json({ voto, candidata })
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

export default router
