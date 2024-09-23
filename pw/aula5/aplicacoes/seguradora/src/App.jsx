import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const { register, handleSubmit } = useForm();
  const limparForm = () => {
    setFocus('modelo');
    reset ({
      modelo: '',
      marca: ''
    })
    setReposta('');
    setCalculo('');
  }

  return (
      <>
        <div className='container'>
          <img src="" alt="" />
          <div className='titulos'>
            <h1>Avenida Seguros</h1>
            <hr />
            <h2>App Seguro de Veículos</h2>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit} onReset={limparForm}>
          <p>
            <label htmlFor="Modelo">Modelo do Veículo:</label>
            <input type="text" name="" id="modelo" required {...register("modelo")} />
          </p>
          <p>
            <label htmlFor="marca">Marca:</label>
            <select name="" id="marca" {...register("marca")}>
              <option value="">Chevrolet</option>
              <option value="">Fiat</option>
              <option value="">Volkswagen</option>
              <option value="">Renault</option>
              <option value="">Ford</option>
              <option value="">Nissan</option>
            </select>
          </p>
          <p>
            <label htmlFor="preco">Preço R$:</label>
            <input type="text" name="" id="preco" required {...register("preco")} />
          </p>
          <p>
            <label htmlFor="condutor">Principal Condutor:</label>
            <input type="radio" name="condutor" id="condutor" value="homem" {...register("condutor")} /> Homem
            <input type="radio" name="condutor" id="" value="mulher" {...register("condutor")} /> Mulher
          </p>
          <p>
            <label htmlFor="cliente">Cliente Avenida:</label>
            <input type="checkbox" name="" id="cliente" value="x" {...register("cliente")} /> É renovação?
          </p>
          <input type="submit" value="Simular Seguro" className='btn' />&nbsp;&nbsp;
          <input type="reset" value="Limpar Dados" className='btn' />&nbsp;&nbsp;
        </form>
      </>
  )
}

export default App
