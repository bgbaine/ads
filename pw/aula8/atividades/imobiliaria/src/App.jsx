import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import './App.css';

function App() {
  const { register, handleSubmit, reset, setFocus, watch } = useForm();
  const [imagem, setImagem] = useState('');
  const [cor, setCor] = useState('');
  const [primeiraMensagem, setPrimeiraMensagem] = useState('');
  const [segundaMensagem, setSegundaMensagem] = useState('');
  const [terceiraMensagem, setTerceiraMensagem] = useState('');

  let nome = watch('nome');
  let salario = watch('salario');
  let imovel = watch('imovel');

  useEffect(() => {
    setFocus('nome');
  }, [setFocus]);

  const verificarSituacao = (data) => {
    if (!data.nome) {
      alert('Preencha o campo nome!');
      setFocus('nome');
      return;
    }
    
    if (!data.salario) {
      alert('Preencha o campo salário!');
      setFocus('salario');
      return;
    }

    if (!data.fiador && !data.outro && !data.fianca) {
      setImagem('nao-autorizado.png');
      setCor('vermelho');
      setPrimeiraMensagem(`Ops, ${nome}...`);
      setSegundaMensagem('Cadastro Não Autorizado');
      setTerceiraMensagem('Informe-se com nossos atendentes.');
    } else {
      setImagem('autorizado.avif');
      setCor('verde');
      setPrimeiraMensagem(`Muito Bem-vindo(a), ${nome}!`);
      setSegundaMensagem('Cadastro Pré-aprovado');
      
      const taxa = imovel === 'Imóvel Comercial' ? 0.5 : 0.3;
      const valor = salario * taxa;

      setTerceiraMensagem(`${imovel} de até R$ ${(valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})} mensais.`);
    }
  };

  const limparDados = () => {
    reset({
      nome: '',
      salario: '',
      imovel: 'Apto Residencial',
      fiador: false,
      outro: false,
      fianca: false,
    });
    setPrimeiraMensagem('');
    setSegundaMensagem('');
    setTerceiraMensagem('');
    setImagem('');
    setCor('');
  };

  return (
    <>
      <header>
        <img src="logo.jpg" alt="Logo" />
        <div>
          <h1>Imobiliária Avenida</h1>
          <h2>App: Pré-Cadastro de Inquilinos</h2>
        </div>
      </header>
      <main>
        <form 
          onSubmit={handleSubmit(verificarSituacao)}
          onReset={limparDados}
        >
          <label htmlFor="nome">Nome do Inquilino: </label>
          <br />
          <input
            type="text"
            id='nome'
            {...register('nome')}
          />
          <br /><br />
          <label htmlFor="salario">Salário Atual R$: </label>
          <br />
          <input 
            type="number"
            id='salario'
            {...register('salario')}
          />
          <br /><br />
          <label htmlFor="">Imóvel Desejado: </label>
          <br />
          <select
            id="imovel"
            {...register('imovel')}    
          >
            <option value="Apto Residencial">Apto Residencial</option>
            <option value="Casa Residencial">Casa Residencial</option>
            <option value="Imóvel Comercial">Imóvel Comercial</option>
          </select>
          <br /><br />
          <label htmlFor="garantias">Garantias: </label>
          <br />
          <input 
            type="checkbox"
            id="fiador"
            {...register('fiador')}
          /> 
          <label 
            htmlFor="fiador"
            className='fonte-normal'
          >
            Fiador
          </label>&nbsp;&nbsp;
          <input 
            type="checkbox"
            id="outro"
            {...register('outro')}
          /> 
          <label 
            htmlFor="outro"
            className='fonte-normal'
          >
            Outro Imóvel
          </label>&nbsp;&nbsp;
          <input 
            type="checkbox"
            id="fianca"
            {...register('fianca')}
          />
          <label
            htmlFor="fianca"
            className='fonte-normal'
          >
            Seguro Fiança
          </label>
          <br />
          <button type='submit'>Verificar Situação</button>
          &nbsp;&nbsp;
          <button type='reset'>Limpar Dados</button>
        </form>
        <div className='resposta'>
          {imagem && <img src={imagem} alt="Resposta" />}
          <div className={cor}>
            <h2>{primeiraMensagem}</h2>
            <h2>{segundaMensagem}</h2>
            <h2>{terceiraMensagem}</h2>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
