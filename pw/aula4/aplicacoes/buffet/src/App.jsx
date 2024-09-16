import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();
  const [ resposta, setReposta ] = useState();
  const [ calculo, setCalculo ] = useState();

  useEffect(() => {
    setFocus('nome');
  }), [];

  const calculaPrato = (data) => {
    setReposta(`${data.nome}, voce serviu um prato com ${data.peso} gr.`);
    const total = (Number(data.peso) / 1_000) * 72;
    setCalculo(`Total do Prato R$: ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
  }

  const limpaDados = () => {
    setFocus('nome');
    reset ({
      nome: '',
      peso: ''
    })
    setReposta('');
    setCalculo('');
  }

  return (
    <div className='cor-destaque'>
      <h1>Restaurante Avenida</h1>
      <h2>Calculo dos Valores das Refeicoes</h2>
      <img className='figura' src="images.jpg" alt="" />
      <form
        onSubmit={handleSubmit(calculaPrato)}
        onReset={limpaDados}
      >
        <p>
          <label htmlFor="nome">Nome do Cliente: </label>
          <input 
            className='campos'
            type="text"
            id='nome'
            required
            {...register("nome")}
          />
        </p>
        <p>
          <label htmlFor="peso">Peso do Prato (gr): </label>
          <input 
            className='campos'
            type="number"
            id='peso'
            required
            {...register("peso")}  
          />
        </p>
        <input className='btn btn-submit' type="submit" value="Calcular" />
        <input className='btn btn-reset' type="reset" value="Limpar" />
      </form>
      <h2>{resposta}</h2>
      <h2>{calculo}</h2>
    </div>
  )
}

export default App
