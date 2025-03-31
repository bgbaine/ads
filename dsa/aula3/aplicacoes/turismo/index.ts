import express from "express";
import routesViagens from "./routes/viagens";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/viagens", routesViagens);

app.get("/", (req: any, res: any) => {
  res.send("API: Agencia de Turismo");
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
