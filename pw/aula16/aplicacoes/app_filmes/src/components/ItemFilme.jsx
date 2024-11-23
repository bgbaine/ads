import { Link } from "react-router-dom";
import { Estrelas } from "./Estrelas";
import "./ItemFilme.css";

export function ItemFilme({ filme, filmes, setFilmes }) {
  function avaliaFilme() {
    const nome = prompt("Qual o seu nome?");
    if (nome == "") {
      alert("Você deve informar o nome...");
      return;
    }

    const comentario = prompt("Comentário para este filme?");
    if (comentario == "") {
      alert("Você deve informar o comentário...");
      return;
    }

    const nota = Number(prompt(`Nota para o filme ${filme.titulo}?`));
    if (nota < 1 || nota > 5 || isNaN(nota)) {
      alert("Informe uma nota válida entre 1 e 5");
      return;
    }

    const filmes2 = [...filmes];

    // obtém o índice (no vetor filmes) do filme atual (para alterar)
    const index = filmes2.findIndex((x) => x.id == filme.id);

    // altera o atributo no filme identificado
    filmes2[index].nomes.push(nome);
    filmes2[index].comentarios.push(comentario);
    filmes2[index].notas.push(nota);

    // altera a variável de estado e atualia (update) na API
    setFilmes(filmes2);

    fetch(`http://localhost:3000/filmes/${filme.id}`, {
      method: "PUT",
      body: JSON.stringify(filmes2[index]),
    });

    alert("Ok! Filme avaliado com sucesso!");
  }

  const calcularMedia = () => {
    let soma = 0;
    for (const nota of filme.notas) {
      soma += nota;
    }
    return soma / filme.notas.length;
  };

  return (
    <div className="grid-item">
      <img src={filme.foto} alt="Capa do Filme" />
      <div>
        <h3>{filme.titulo}</h3>
        <p className="genero-duracao">
          {filme.genero} - {filme.duracao} min.
        </p>
        <p className="sinopse">{filme.sinopse}</p>
        {filme.notas.length < 1 ? (
          <>
            <img src="./novo.png" alt="Novo" className="novo" />
            <button onClick={avaliaFilme}>Avaliar</button>
          </>
        ) : (
          <>
            <Estrelas num={calcularMedia()} />
            <button onClick={avaliaFilme}>Avaliar</button>&nbsp;&nbsp;&nbsp;
            <Link to={`comentarios/${filme.id}`}>Ver Comentários</Link>
          </>
        )}
      </div>
    </div>
  );
}
