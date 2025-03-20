import express from "express";
import alunosRouter from "./routes/alunos";

const app = express();
const port = 3001;

app.use(express.json());

app.use("/alunos", alunosRouter);

app.get("/", (req: any, res: any) => {
  res.send("API Avenida");
});

app.get("/sala", (req: any, res: any) => {
  res.send("Sala de aula");
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
