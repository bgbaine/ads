import { useForm } from "react-hook-form";

export function NovoFilme({ filmes, setFilmes }) {
  const { register, handleSubmit } = useForm();

  function incluirFilme(data) {
    const novo = {
      titulo: data.titulo,
      genero: data.genero,
      duracao: data.duracao,
      foto: data.foto,
      sinopse: data.sinopse,
      nomes: [],
      notas: [],
      comentarios: [],
    };
    const filmes2 = [...filmes, novo];
    setFilmes(filmes2);

    fetch("http://localhost:3000/filmes", {
      method: "POST",
      body: JSON.stringify(novo),
    });
  }

  return (
    <>
      <h2>Formulário de Cadastro de Filmes</h2>
      <form onSubmit={handleSubmit(incluirFilme)}>
        <p>
          <label htmlFor="titulo">Título: </label>
          <input type="text" id="titulo" required {...register("titulo")} />
        </p>
        <p>
          <label htmlFor="genero">Gênero: </label>
          <input type="text" id="genero" required {...register("genero")} />
        </p>
        <p>
          <label htmlFor="foto">URL Foto: </label>
          <input type="text" id="foto" required {...register("foto")} />
        </p>
        <p>
          <label htmlFor="duracao">Duração: </label>
          <input type="number" id="duracao" required {...register("duracao")} />
        </p>
        <p>
          <label htmlFor="sinopse">Sinopse: </label>
          <textarea
            id="sinopse"
            required
            rows={3}
            {...register("sinopse")}
          ></textarea>
        </p>
        <input type="submit" value="Incluir" />
        <input type="reset" value="Limpar" />
      </form>
    </>
  );
}
