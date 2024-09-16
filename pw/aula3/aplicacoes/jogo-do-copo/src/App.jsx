import { useState } from 'react';
import './App.css';

function App() {
  const [cups, setCups] = useState(['copo', 'copo', 'copo']);
  const [escolha, setEscolha] = useState(null);
  const [mensagem, setMensagem] = useState('Clique sobre a imagem para fazer a sua aposta');
  const [corMensagem, setCorMensagem] = useState('verde');

  function escolherCopo(index) {
    setEscolha(index);
    const escolhaPC = Math.floor(Math.random() * 3);

    const newCups = ['copo_vazio', 'copo_vazio', 'copo_vazio'];
    newCups[escolhaPC] = 'copo_certo';
    setCups(newCups);

    if (index === escolhaPC) {
      setMensagem('Parabéns, você acertou!');
      setCorMensagem('verde');
    } else {
      setMensagem('Que pena, você errou!');
      setCorMensagem('vermelha');
    }
  }

  function resetarJogo() {
    setCups(['copo', 'copo', 'copo']);
    setEscolha(null);
    setMensagem('Clique sobre a imagem para fazer a sua aposta');
    setCorMensagem('verde');
  }

  return (
    <>
      <h1>Jogo do Copo</h1>
      {cups.map((cup, index) => (
        <img 
          key={index}
          onClick={escolha === null ? () => escolherCopo(index) : undefined}
          src={`${cup}.png`} 
          alt={`Copo ${index + 1}`}
          style={escolha === null ? { cursor: 'pointer' } : undefined}
        />
      ))}
      <hr />
      <h1 className={`cor-${corMensagem}`}>
        {mensagem}
        {escolha !== null &&
          <button onClick={resetarJogo}>Jogar novamente?</button>
        }
      </h1>
    </>
  );
}

export default App;
