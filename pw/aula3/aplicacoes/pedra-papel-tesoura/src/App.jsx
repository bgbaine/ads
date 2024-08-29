import { useState } from 'react';
import './App.css'

function App() {
  const [figura, setFigura] = useState('');
  const [aposta, setAposta] = useState('');

  function mostraAposta(imagem) {
    setAposta('');
    setFigura(imagem);
  }

  function computadorAposta() {
    const opcoes = ['pedra', 'papel', 'tesoura'];
    setAposta(opcoes[Math.floor(Math.random() * opcoes.length)]);
  }

  return (
    <>
      <h1 className='cor-vermelha fonte-g1'>Jogo: Pedra, Papel e Tesoura</h1>
      <hr />
      <h2 className='cor-verde fonte-g2'>Clique sobre a imagem para fazer a sua aposta</h2>
      <img className='img-pequena ponteiro' onClick={() => mostraAposta('pedra')} src="./pedra.png" alt="Pedra" />
      <img className='img-pequena ponteiro' onClick={() => mostraAposta('papel')} src="./papel.png" alt="Papel" />
      <img className='img-pequena ponteiro' onClick={() => mostraAposta('tesoura')} src="./tesoura.png" alt="Tesoura" />
      {figura &&
        <> 
          <span className='cor-verde fonte-g2 margem-esq'>Sua Aposta é: </span>
          <img className='img-grande margem-esq' src={`./${figura}.png`} alt="Tesoura" />
        </>
      }

      <h2 className='cor-azul fonte-g2 margem-sup'>
        Clique em Desafiar PC para ver o Resultado da sua Aposta
        <button className='margem-esq ponteiro' onClick={computadorAposta}>Desafiar PC</button>
      </h2>

      <img className='img-pequena' src="./pedra.png" alt="Pedra" />
      <img className='img-pequena' src="./papel.png" alt="Papel" />
      <img className='img-pequena' src="./tesoura.png" alt="Tesoura" />
      {figura && aposta &&
        <>
          <span className='cor-azul fonte-g2 margem-esq'>Computador Apostou: </span>
          <img className='img-grande margem-esq' src={`./${aposta}.png`} alt="Tesoura" />
        </>
      }
      
      {figura && aposta && (
        figura === aposta
          ? <h2 className='cor-amarelo fonte-g2'>Empate! Tente Novamente</h2>
          : (figura === "pedra" && aposta === "tesoura") ||
            (figura === "papel" && aposta === "pedra") ||
            (figura === "tesoura" && aposta === "papel")
            ? <h2 className='cor-verde fonte-g2'>Show!! Você Venceu! Parabéns</h2>
            : <h2 className='cor-vermelha fonte-g2'>Show!! Você Perdeu! Parabéns</h2>
      )}
    </>
  )
}

export default App
