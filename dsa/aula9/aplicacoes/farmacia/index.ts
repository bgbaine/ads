import express from "express";
import routesVendas from "./routes/vendas";
import routesItensVenda from "./routes/itensVenda";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/vendas", routesVendas);
app.use("/itensVenda", routesItensVenda);

app.get("/", (req: any, res: any) => {
  res.send("API: Farmacia Avenida");
});

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`);
});
