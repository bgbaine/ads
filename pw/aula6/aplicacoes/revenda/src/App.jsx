import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const { register, watch } = useForm(
    {
      defaultValues: {
        modelo: 'argo.webp'
      }
    });
  
    function calculaPreco() {
      let preco;
      switch (watch("modelo")) {
        case "argo.webp":
          preco = 73_990;
          break;
        case "strada.webp":
          preco = 80_000;
          break;
        case "toro.webp":
          preco = 100_000;
          break;
        default:
          preco = 0;
      }
      if (watch("alarme")) {
        preco += 1_200;
      }
      if (watch("vidros")) {
        preco += 2_000;
      }
      return preco;
    }

  return (
    <>
      <header>
        <img src="./fiat-logo.png" alt="Logo da Fiat" />
        <div>
          <h1>Revenda Avenida</h1>
          <h2>Promocao de Aniversario - 25 anos</h2>
        </div>
      </header>
      <main>
        <div>
          <h2>Modelos em Promocao</h2>
          <p>
            <input 
              type="radio" 
              name="modelo" 
              id="argo"
              {...register("modelo")}
              value="argo.webp"
            />
            <label htmlFor="argo">Fiat Argo</label>
          </p>
          <p>
            <input 
              type="radio"
              name="modelo"
              id="strada"
              {...register("modelo")}
              value="strada.webp" />
            <label htmlFor="strada">Fiat Strada</label>
          </p>
          <p>
            <input
              type="radio"
              name="modelo"
              id="toro"
              {...register("modelo")}
              value="toro.webp"
            />
            <label htmlFor="toro">Fiat Toro</label>
          </p>
        </div>
        <div>
          <img src={watch("modelo")} alt="Carro" />
        </div>
        <div>
          <h2>Selecione os opcionais</h2>
          <p>
            <input 
              type="checkbox"
              name=""
              id="alarme"
              {...register("alarme")}
            />
            <label htmlFor="alarme">Alarme</label>
          </p>
          <p>
            <input
              type="checkbox"
              name=""
              id="vidros"
              {...register("vidros")}  
            />
            <label htmlFor="vidros">Vidros Eletricos</label>
          </p>
        </div>
      </main>
      <footer>
        <h2>
          Preco do Veiculo R$:
          {
            " "
          }
          {
            calculaPreco().toLocaleString('pt-br', {minimumFractionDigits: 2})
          }
        </h2>
        <h2><i>* Consulte as opcoes de financiamento</i></h2>
      </footer>
    </>
  )
}

export default App
