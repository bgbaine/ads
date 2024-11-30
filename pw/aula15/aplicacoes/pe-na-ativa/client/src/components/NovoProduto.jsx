import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { adicionarProduto } from "../utils/produtoUtils";

function NovoProduto({ setOpen }) {
  const { register, handleSubmit, reset, setFocus, setValue } = useForm();
  const [produtoNome, setProdutoNome] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaNova, setCategoriaNova] = useState("");
  const [tamanhos, setTamanhos] = useState([]);
  const [tamanhoNovo, setTamanhoNovo] = useState("");

  const enviarProduto = (data) => {
    if (categorias.length < 1) {
      toast.warning("Insira ao menos uma categoria!");
      return;
    }

    if (tamanhos.length < 1) {
      toast.warning("Insira ao menos um tamanho!");
      return;
    }

    const novoProduto = {
      nome: data.nome,
      categorias: categorias,
      preco: +data.precoOriginal,
    };

    if (data.precoPromocional) {
      novoProduto.precoAntigo = +data.precoPromocional;
    }

    novoProduto.fotos = [data.foto1, data.foto2, data.foto3];
    novoProduto.tamanhos = tamanhos;
    novoProduto.descricao = data.descricao;

    adicionarProduto(novoProduto);

    reset();
    setCategorias([]);
    setTamanhos([]);
    setTamanhoNovo("");
    setProdutoNome("");
    setOpen(false);

    toast.success("Produto adicionado com sucesso!");

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const adicionarCategoria = () => {
    if (categoriaNova === "") {
      toast.warning("Categoria não pode ser vazio!");
      return;
    }

    setCategorias([...categorias, categoriaNova]);
    setCategoriaNova("");
  };

  const adicionarTamanho = () => {
    if (tamanhoNovo === "") {
      toast.warning("Tamanho não pode ser vazio!");
      return;
    }

    setTamanhos([...tamanhos, tamanhoNovo]);
    setTamanhoNovo("");
  };

  const handleInputChange = (e) => {
    setProdutoNome(e.target.value);
    setValue("nome", e.target.value);
  };

  useEffect(() => {
    register("nome");
  }, [register]);

  return (
    <section className="w-72 lg:w-auto">
      <form
        onSubmit={handleSubmit(enviarProduto)}
        className="space-y-6 p-7 max-w-xl mx-auto"
      >
        <div className="flex flex-col">
          <h2 className="text-4xl font-bold pb-6">
            {produtoNome || "Novo Produto"}
          </h2>
          <label htmlFor="nome" className="text-lg font-semibold">
            Nome do Produto
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="text"
            id="nome"
            required
            placeholder="ex: Tênis de Corrida"
            maxLength={28}
            value={produtoNome}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="descricao" className="text-lg font-semibold">
            Descrição
          </label>
          <textarea
            id="descricao"
            required
            rows={2}
            className="border border-slate-500 rounded-lg p-2"
            placeholder="ex: Perfeito para todos os terrenos"
            maxLength={80}
            {...register("descricao")}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="precoOriginal" className="text-lg font-semibold">
            Preço Original
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="number"
            step="0.01"
            id="precoOriginal"
            required
            placeholder="ex: 300"
            min={1}
            max={10_000}
            {...register("precoOriginal")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="precoPromocional" className="text-lg font-semibold">
            Preço Promocional (opcional)
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="number"
            step="0.01"
            id="precoPromocional"
            placeholder="ex: 150"
            min={1}
            max={10_000}
            {...register("precoPromocional")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="foto1" className="text-lg font-semibold">
            URL da Foto 1
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="text"
            id="foto1"
            required
            placeholder="ex: https://site.com/foto.jpg"
            {...register("foto1")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="foto2" className="text-lg font-semibold">
            URL da Foto 2
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="text"
            id="foto2"
            required
            placeholder="ex: https://site.com/foto.jpg"
            {...register("foto2")}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="foto3" className="text-lg font-semibold">
            URL da Foto 3
          </label>
          <input
            className="border border-slate-500 rounded-lg p-2"
            type="text"
            id="foto3"
            required
            placeholder="ex: https://site.com/foto.jpg"
            {...register("foto3")}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="categoria" className="text-lg font-semibold">
            Categorias
          </label>
          <ul className="list-disc pl-6 pb-3">
            {categorias.map((categoria, index) => (
              <li key={index} className="text-lg">
                {categoria}
              </li>
            ))}
          </ul>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3">
            <input
              className="border border-slate-500 rounded-lg p-2 flex-1"
              type="text"
              id="categoria"
              value={categoriaNova}
              onChange={(e) => setCategoriaNova(e.target.value)}
              maxLength={75}
              placeholder="ex: Corrida"
            />
            <button
              type="button"
              onClick={adicionarCategoria}
              className="bg-[#1c2bf9] text-white hover:bg-blue-600 border border-[#1c2bf9] font-bold px-4 py-[0.6rem] rounded-lg mt-4 lg:mt-0"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="tamanho" className="text-lg font-semibold">
            Tamanhos
          </label>
          <ul className="list-disc pl-6 pb-3">
            {tamanhos.map((tamanho, index) => (
              <li key={index} className="text-lg">
                {tamanho}
              </li>
            ))}
          </ul>
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3">
            <input
              className="border border-slate-500 rounded-lg p-2 flex-1"
              type="number"
              id="tamanho"
              value={tamanhoNovo}
              onChange={(e) => setTamanhoNovo(+e.target.value)}
              maxLength={75}
              min={30}
              placeholder="ex: 40"
            />
            <button
              type="button"
              onClick={adicionarTamanho}
              className="bg-[#1c2bf9] text-white hover:bg-blue-600 border border-[#1c2bf9] font-bold px-4 py-[0.6rem] rounded-lg mt-4 lg:mt-0"
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <input
            className="bg-[#1c2bf9] text-white hover:bg-blue-600 border border-[#1c2bf9] font-bold p-3 rounded-lg cursor-pointer w-2/3"
            type="submit"
            value="Incluir"
          />
          <input
            className="bg-red-600 text-white hover:bg-red-500 border border-red-600 font-bold p-3 rounded-lg cursor-pointer w-1/3"
            type="reset"
            value="Limpar"
            onClick={() => {
              reset();
              setCategorias([]);
              setTamanhos([]);
              setProdutoNome("");
              setTamanhoNovo("");
              setFocus("nome");
            }}
          />
        </div>
      </form>
    </section>
  );
}

export default NovoProduto;
