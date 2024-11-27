import { useParams } from "react-router-dom";
import { Titulo } from "./components/Titulo";
import { useEffect, useState } from "react";
import { Estrelas } from "./components/Estrelas";
import "./Comentarios.css";

function Comentarios() {
  const { filmeId } = useParams();
  const [filme, setFilme] = useState({});

  useEffect(() => {
    async function getFilme() {
      const response = await fetch(`http://localhost:3000/filmes/${filmeId}`);
      const filmes2 = await response.json();
      setFilme(filmes2);
    }
    getFilme();
  }, [filmeId]);

  const listaComentarios = filme.comentarios?.map((comentario, index) => (
    <tr key={comentario}>
      <td>{filme.nomes[index]}</td>
      <td>{comentario}</td>
      <td>
        <Estrelas num={filme.notas[index]} />
      </td>
    </tr>
  ));

  return (
    <>
      <Titulo />
      <h1>Comentários sobre o Filme: {filme.titulo}</h1>

      <div className="comentarios">
        <img src={filme.foto} alt="Capa do Filme" />
        <div>
          <h2>Comentários e Avaliações dos Usuários</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Usuario</th>
                <th>Comentario sobre o filme</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>{listaComentarios}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Comentarios;
