import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import './App.css'

function App() {
  const { register, handleSubmit, reset, setFocus } = useForm();
  const [compras, setCompras] = useState([]);
  const [total, setTotal] = useState(0);

  const cadastrar = (data) => {
    const compras2 = [...compras];
    compras2.push({descricao: data.descricao, preco: Number(data.preco)});
    setCompras(compras2);
    
    localStorage.setItem('compras', JSON.stringify(compras2));
    
    const total2 = total + Number(data.preco);
    setTotal(total2);

    localStorage.setItem('total', total2);

    toast.success("Produto cadastrado com sucesso!");

    setFocus('descricao');
    reset({
      descricao: '',
      preco: ''
    });
  }

  const limparLista = () => {
    if (confirm("Confirma a exclusao de todos os produtos da lista?")) {
      setCompras([]);
      localStorage.removeItem('compras');
      
      setTotal(0);
      localStorage.removeItem('total');
    }
    toast.success("Lista limpa com sucesso!");
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

      const total2 = Number(localStorage.getItem('total'));
      setTotal(total2);
    }
    setFocus('descricao');
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
          <div className='lista_btn'>
            <h3>Lista de Produtos</h3>
            <button onClick={limparLista}>Limpar Lista</button>
          </div>
            {listaCompras}
          <p className='listaTotal'>
            <span>Total</span>
            <span>{'R$ ' + total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
          </p>
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
