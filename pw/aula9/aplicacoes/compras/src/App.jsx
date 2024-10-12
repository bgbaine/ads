/* 
  limpar campos
  calcular e exiber total de compras
  instalar sooner
  criar botao limpar lista, solicitar confirmacao e remover
  jogar o foco na descricao, no inicio e apos cada inclusao
*/

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const { register, handleSubmit, reset } = useForm();
  const [compras, setCompras] = useState([]);

  const cadastrar = (data) => {
    const compras2 = [...compras];
    compras2.push({descricao: data.descricao, preco: Number(data.preco)});
    setCompras(compras2);
    
    localStorage.setItem('compras', JSON.stringify(compras2));
    reset({
      descricao: '',
      preco: ''
    });
  }

  const listaCompras = compras.map(compra => (
    <p className='lista' key={compra.descricao}>
      <span>{compra.descricao}</span>
      <span>R$ {compra.preco.toLocaleString("pt-br", {minimumFractionDigits: 2})}</span>
    </p>
  ));

  useEffect(() => {
    if (localStorage.getItem('compras')) {
      const compras2 = JSON.parse(localStorage.getItem('compras'));
      setCompras(compras2);
    }
  }, []);

  return (
    <>
      <header>
        <img src="logo.png" alt="Logo" />
        <div>
          <h1>Lista de Compras</h1>
          <h2>Controle Pessoal de Compras do Supermecado</h2>
        </div>
      </header>
      <main>
        <img src="supermercado.jpg" alt="" />
        <div>
          <h3>Formulario de Cadastro de Produtos</h3>
          <form
            onSubmit={handleSubmit(cadastrar)}
          >
            <p>
              <label htmlFor="descricao">Descricao: </label>
              <input 
                type="text"
                name=""
                id="descricao"
                required
                {...register('descricao')}  
              />
            </p>
            <p>
              <label htmlFor="preco">Preco R$: </label>
              <input 
                type="number"
                name="" 
                id="preco"
                step="0.10"
                required 
                {...register('preco')}  
              />
            </p>
            <p>
              <input type="submit" name="" id="cadastrar" value="Cadastrar" />
            </p>
          </form>
          <hr />
          <h3>Lista dos Produtos Cadastrados</h3>
          {listaCompras}
        </div>
      </main>
    </>
  )
}

export default App
