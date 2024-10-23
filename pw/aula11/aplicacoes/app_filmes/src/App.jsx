import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import "react-responsive-modal/styles.css";
import "./App.css";

function App() {
  const [filmes, setFilmes] = useState([]);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, setFocus } = useForm();

  useEffect(() => {
    if (localStorage.getItem("filmes")) {
      const filmes2 = JSON.parse(localStorage.getItem("filmes"));
      setFilmes(filmes2);
    }
  }, []);

  const removerFilme = (titulo) => {
    if (confirm(`Deseja realmente remover o filme ${titulo}?`)) {
      const filmes2 = filmes.filter((filme) => filme.titulo !== titulo);
      setFilmes(filmes2);
      localStorage.setItem("filmes", JSON.stringify(filmes2));
      toast.error(" Filme removido com sucesso!");
    }
  };

  const listarFilmes = filmes.map((filme) => (
    <div key={filme.titulo} className="grid-item">
      <img src={filme.foto} alt="Capa do Filme" />
      <div>
        <h3>{filme.titulo}</h3>
        <p className="genero-duracao">
          {filme.genero} - {filme.duracao} min.
        </p>
        <p className="sinopse">{filme.sinopse}</p>
        <button
          className="remover-btn"
          onClick={() => removerFilme(filme.titulo)}
        >
          Remover filme
        </button>
      </div>
    </div>
  ));

  const abrirForm = () => {
    setOpen(true);
    setFocus("titulo");

    reset({
      titulo: "",
      genero: "",
      duracao: "",
      foto: "",
      sinopse: "",
    });
  };

  const incluirFilme = (data) => {
    const novoFilme = {
      titulo: data.titulo,
      genero: data.genero,
      duracao: data.duracao,
      foto: data.foto,
      sinopse: data.sinopse,
      nota: 0,
      comentario: "",
    };

    const filmes2 = [novoFilme, ...filmes];
    setFilmes(filmes2);
    localStorage.setItem("filmes", JSON.stringify(filmes2));

    toast.success("Filme cadastrado com sucesso!");
    setOpen(false);
  };

  return (
    <>
      <header>
        <img src="./pipoca.png" alt="Cinema e Pipoca" />
        <div>
          <h1>App Controle de Filmes</h1>
          <h2>Cadastro e Avaliacao de Pessoal e Filmes</h2>
        </div>
      </header>
      <main>
        <div className="h2-btn">
          <h2>Cadastro de Filmes</h2>
          <button onClick={abrirForm}>Adicionar</button>
        </div>
        <div className="grid-filmes">{listarFilmes}</div>
      </main>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2 id="modal-titulo">Inclusao de Filmes</h2>
        <form onSubmit={handleSubmit(incluirFilme)}>
          <p>
            <label htmlFor="titulo">Título</label>
            <input type="text" id="titulo" required {...register("titulo")} />
          </p>
          <p>
            <label htmlFor="genero">Gênero</label>
            <input type="text" id="genero" required {...register("genero")} />
          </p>
          <p>
            <label htmlFor="duracao">Duração (min)</label>
            <input
              type="number"
              id="duracao"
              required
              {...register("duracao")}
            />
          </p>
          <p>
            <label htmlFor="foto">URL da Foto</label>
            <input type="url" id="foto" required {...register("foto")} />
          </p>
          <p>
            <label htmlFor="sinopse">Sinopse</label>
            <textarea
              id="sinopse"
              required
              {...register("sinopse")}
              rows={3}
            ></textarea>
          </p>
          <div className="form-btn">
            <input type="reset" value="Limpar" />
            &nbsp;&nbsp;
            <input type="submit" value="Cadastrar" />
          </div>
        </form>
      </Modal>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
