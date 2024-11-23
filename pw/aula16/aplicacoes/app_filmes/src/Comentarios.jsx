import { useParams } from "react-router-dom";
import { Titulo } from "./components/Titulo";
import { useEffect, useState } from "react";
import "./Comentarios.css";

function Comentarios() {
  const { filmeId } = useParams();
  const [filme, setFilme] = useState({});
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    async function getFilme() {
      const response = await fetch(`http://localhost:3000/filmes/${filmeId}`);
      const filmes2 = await response.json();
      setFilme(filmes2);
    }
    getFilme();

    async function getComentarios() {
      const response = await fetch(`http://localhost:3000/filmes/${filmeId}`);
      const comentarios2 = await response.json().comentarios;
      setComentarios(comentarios2);
    }
    getComentarios();
  }, []);

  const listarComentarios = () => {
    comentarios.map((comentario) => {
      return <p key={comentario}>{comentario}</p>
    });
  };

  return (
    <>
      <Titulo />
      <h1>Comentários sobre o Filme: {filme.titulo}</h1>

      <div className="comentarios">
        <img src={filme.foto} alt="Capa do Filme" />
        <div>
          <h2>Comentários e Avaliações dos Usuários</h2>
        </div>
        {listarComentarios()}
      </div>
    </>
  );
}

export default Comentarios;
