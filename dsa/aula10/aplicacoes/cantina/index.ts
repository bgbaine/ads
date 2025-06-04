import express from 'express'
import routesAlunos from './routes/alunos'
import routesProdutos from './routes/produtos'
import routesDepositos from './routes/depositos'
import routesVendas from './routes/vendas'

const app = express()
const port = 3000

app.use(express.json())

app.use("/alunos", routesAlunos)
app.use("/produtos", routesProdutos)
app.use("/depositos", routesDepositos)
app.use("/vendas", routesVendas)

app.get('/', (req, res) => {
  res.send('API: Controle de Vendas da Cantina')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})