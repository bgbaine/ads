import { Router } from "express";

const router = Router();

const alunos = [
  {
    id: 1,
    nome: "Juliana Mattos",
    curso: "ADS",
  },
  {
    id: 2,
    nome: "Pedro Costa",
    curso: "Marketing",
  },
  {
    id: 3,
    nome: "Silvana de Castro",
    curso: "PMM",
  },
];

router.get("/", (req, res) => {
  res.status(200).json(alunos);
});

router.post("/", (req, res) => {
  const { nome, curso } = req.body;
  alunos.push({
    id: alunos.length + 1,
    nome,
    curso,
  });
  res.status(201).json({ msg: "Aluno inserido", id: alunos.length });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).send(id);

  const index = alunos.findIndex((aluno) => aluno.id == Number(id));

  if (index == -1) {
    res.status(404).json({ msg: "Erro: Nao encontrado" });
  } else {
    alunos.splice(index, 1);
    res.status(200).json({ msg: "Aluno excluido" });
  }
});

export default router;
