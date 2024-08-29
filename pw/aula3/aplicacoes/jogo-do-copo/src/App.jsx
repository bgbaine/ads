import { useState } from 'react';
import './App.css'

function App() {
  const [mensagem, setMensagem] = useState('Clique sobre a imagem para fazer a sua aposta');

  return (
    <>
      <h1>Jogo do Copo</h1>
      <img onClick={() => escolherCopo('copo1')} src={`${copo1}`} alt="" />
      <img onClick={() => escolherCopo('copo2')} src={`${copo2}`} alt="" />
      <img onClick={() => escolherCopo('copo3')} src={`${copo3}`} alt="" />
      <hr />
      <h1>{mensagem}</h1>
    </>
  )
}

export default App
