import { useForm } from "react-hook-form"
import { useState } from "react"
import './App.css'

function App() {
  const { register, handleSubmit, reset } = useForm()
  const [mensagem, setMensagem] = useState("")
  const [imagem, setImagem] = useState("")

  function sugerirVinho(data) {
    const nome = data.nome
    const idade = Number(data.idade)
    const prato = data.prato
    const saboresComplexos = data.saboresComplexos

    if (idade < 18) {
      setMensagem(`${nome}, você não deve beber vinho...`)
      setImagem("")
      return
    }
      
    if (saboresComplexos == "s" || prato == "picanha") {
      setMensagem(`${nome}, nossa sugestão: Vinho Tinto`)
      setImagem("tinto.jpg")
    } else if (prato == "peixe") {
      setMensagem(`${nome}, nossa sugestão: Vinho Rosé`)
      setImagem("rose.png")
    } else {
      setMensagem(`${nome}, nossa sugestão: Vinho Suave`)
      setImagem("suave.jpg")
    }
  }

  function limparForm() {
    setMensagem("")
    setImagem("")
    reset({
      nome: "",
      idade: "",
      prato: "",
      saboresComplexos: null
    })
  }

  return (
    <>
      <div className="container">
        <img src="./logo.png" alt="Logo do Restaurante" className='logo' />
        <div className='titulos'>
          <h1>Restaurante Avenida</h1>
          <h2>App: Sugestão de Vinhos</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(sugerirVinho)}
        onReset={limparForm}>
        <p>
          <label htmlFor="nome">Nome do Cliente:</label>
          <input type="text" id="nome" required {...register("nome")} />
        </p>
        <p>
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" required {...register("idade")} />
        </p>
        <p>
          <label htmlFor="prato">Prato Principal:</label>
          <select id="prato" {...register("prato")} required>
            <option value="">--selecione--</option>
            <option value="peixe">Peixe ao Molho de Camarão</option>
            <option value="picanha">Picanha ao Forno</option>
            <option value="strogonoff">Strogonoff de Frango</option>
            <option value="frango">Frango Grelhado</option>
          </select>
        </p>
        <p>
          <label htmlFor="sabores">Gosta de Sabores mais Complexos:</label>
          <input type="radio" id="sabores" value="s" {...register("saboresComplexos")} required /> Sim &nbsp;&nbsp;&nbsp;
          <input type="radio" id="sabores" value="n" {...register("saboresComplexos")} required /> Não
        </p>
        <input type="submit" value="Exibir Sugestão" className='btn' />&nbsp;&nbsp;
        <input type="reset" value="Limpar Dados" className='btn' />
      </form>

      <h2>{mensagem}</h2>
      {imagem && <img src={imagem} alt="vinho" className="imgVinho"/>}      
    </>
  )
}

export default App
