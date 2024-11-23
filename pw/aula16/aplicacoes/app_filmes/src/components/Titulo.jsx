import { Link } from "react-router-dom";
import "./Titulo.css";

export function Titulo() {
  return (
    <header>
      <div className="div-titulo">
        <img src="/pipoca.png" alt="Cinema e Pipoca" />
        <div>
          <h1>App Controle de Filmes</h1>
          <h2>Cadastro e Avaliação Pessoal de Filmes</h2>
        </div>
      </div>
      <div className="div-links">
        <p>
          <Link className="links" to="/">Principal</Link>
        </p>
        <p>
          <Link className="links" to="/pesquisa">Pesquisa</Link>
        </p>
      </div>
    </header>
  );
}
