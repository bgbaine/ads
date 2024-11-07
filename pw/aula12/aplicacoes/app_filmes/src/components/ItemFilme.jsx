import { Estrelas } from './Estrelas'
import './ItemFilme.css'

export function ItemFilme({filme, filmes, setFilmes}) {

  function avaliaFilme() {
    const nota = Number(prompt(`Nota para o filme ${filme.titulo}?`))
    if (nota < 1 || nota > 5 || isNaN(nota)) {
      alert("Informe uma nota válida entre 1 e 5")
      return
    }

    const comentario = prompt("Comentário para este filme?")
    if (comentario == "") {
      alert("Você deve informar o comentário...")
      return
    }

    const filmes2 = [...filmes]

    // obtém o índice (no vetor filmes) do filme atual (para alterar)
    const index = filmes2.findIndex(x => x.titulo == filme.titulo)

    // altera o atributo no filme identificado
    filmes2[index].nota = nota
    filmes2[index].comentario = comentario

    // altera a variável de estado e salva em localStorage
    setFilmes(filmes2)
    localStorage.setItem("filmes", JSON.stringify(filmes2))
    alert("Ok! Filme avaliado com sucesso!")
  }

  return (
    <div className='grid-item'>
      <img src={filme.foto} alt="Capa do Filme" />
      <div>
        <h3>{filme.titulo}</h3>
        <p className='genero-duracao'>{filme.genero} - {filme.duracao} min.</p>
        <p className='sinopse'>{filme.sinopse}</p>
        {filme.nota == 0 ?
        <>
          <img src="./novo.png" alt="Novo" className="novo"/>
          <button onClick={avaliaFilme}>Avaliar</button>
        </>
        :
        <>
          <Estrelas num={filme.nota} />
          <p className="comentario">{filme.comentario}</p>
        </>
        }
      </div>
    </div>
  )
}