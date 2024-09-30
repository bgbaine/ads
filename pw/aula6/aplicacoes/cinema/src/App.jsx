import { useForm } from "react-hook-form"
import "./App.css"

function App() {
  const { register, watch } = useForm({
    defaultValues: {
      titulo: "malvado.png",
      num: 1
    }
  })

  function calculaTotal() {
    let total 
    if (watch("titulo") == "fantasmas_3d.png") {
      total = watch("num") * 15
    } else {
      total = watch("num") * 12
    }    
    if (watch("pipoca_gr")) {
      total = total + 10
    }    
    if (watch("pipoca_fam")) {
      total = total + 15
    }    
    return total
  }

  return (
    <>
      <div className="titulo">
        <img src="./logo.png" alt="Cinema" className="logo" />
        <div>
          <h1>Cine Pipoca: Sua diversão em família</h1>
          <h2>Venda online de ingressos dos filmes em cartaz</h2>
        </div>
      </div>
      <div className="container">
        <h2>Escolha o filme, nº ingressos e pipoca</h2>
        <img src={watch("titulo")} alt="Filme" className="filme" />
        <p>
          <label htmlFor="titulo">Título do Filme: </label>
          <select id="titulo" {...register("titulo")} >
            <option value="malvado.png">Meu Malvado Favorito 4</option>
            <option value="fantasmas.png">Os Fantasmas Ainda se Divertem</option>
            <option value="fantasmas_3d.png">Os Fantasmas Ainda se Divertem - 3D</option>
            <option value="golpe.png">Golpe da Sorte em Paris</option>
            <option value="ping.jpg">A Menina e o Dragão</option>
          </select>
        </p>
        <p>
          <label htmlFor="num">Nº de Ingressos: </label>
          <select id="num" {...register("num")} >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </p>
        <p>
          Pipoca: &nbsp;&nbsp;
          <input type="checkbox" htmlFor="pipoca_gr" {...register("pipoca_gr")} />
          <label htmlFor="pipoca_gr">Grande</label> &nbsp;&nbsp;
          <input type="checkbox" htmlFor="pipoca_fam" {...register("pipoca_fam")} />
          <label htmlFor="pipoca_fam">Família</label>
        </p>
        <h2>Valor Total R$: {calculaTotal().toLocaleString("pt-br", {
          minimumFractionDigits: 2
        })}</h2>
      </div>
    </>
  )
}

export default App
