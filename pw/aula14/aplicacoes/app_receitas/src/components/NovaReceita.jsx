import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function NovaReceita({ receitas, setReceitas, setOpen }) {
  const { register, handleSubmit, reset } = useForm();
  const [ingredientes, setIngredientes] = useState([]);
  const [instrucoes, setInstrucoes] = useState([]);
  const [ingredienteNovo, setIngredienteNovo] = useState("");
  const [instrucaoNova, setinstrucaoNova] = useState("");

  const adicionarReceita = (data) => {
    const novaReceita = {
      id: (+JSON.parse(localStorage.getItem("receitas")).length + 1).toString(),
      nome: data.nome,
      categoria: data.categoria,
      tempo: data.tempo,
      foto: data.foto,
      descricao: data.descricao,
      ingredientes: ingredientes,
      preparo: instrucoes,
      nota: 0,
    };

    const receitas2 = [novaReceita, ...receitas];
    setReceitas(receitas2);
    localStorage.setItem("receitas", JSON.stringify(receitas2));

    reset();
    setIngredientes([]);
    setInstrucoes([]);
    setOpen(false);

    toast.success("Receita adicionada com sucesso");
  };

  const adicionarIngrediente = () => {
    setIngredientes([...ingredientes, ingredienteNovo]);
    setIngredienteNovo("");
  };

  const adiconarInstrucao = () => {
    setInstrucoes([...instrucoes, instrucaoNova]);
    setinstrucaoNova("");
  };

  return (
    <form
      onSubmit={handleSubmit(adicionarReceita)}
      className="space-y-6 p-7 max-w-xl mx-auto"
    >
      <h2 className="text-4xl font-bold pb-6">Nova Receita</h2>

      <div className="flex flex-col">
        <label htmlFor="nome" className="text-lg font-semibold">
          Nome da Receita
        </label>
        <input
          className="border border-slate-500 rounded-lg p-2"
          type="text"
          id="nome"
          required
          placeholder="ex: Bolo de Cenoura"
          {...register("nome")}
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
          placeholder="ex: Bolo fofinho e molhadinho"
          {...register("descricao")}
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label htmlFor="categoria" className="text-lg font-semibold">
          Categoria
        </label>
        <select
          id="categoria"
          required
          className="border border-slate-500 rounded-lg p-2"
          {...register("categoria")}
        >
          <option value="Entrada">Entrada</option>
          <option value="Prato Principal">Prato Principal</option>
          <option value="Sobremesa">Sobremesa</option>
          <option value="Lanche">Lanche</option>
          <option value="Bebida">Bebida</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="tempo" className="text-lg font-semibold">
          Tempo de Preparo (em minutos)
        </label>
        <input
          className="border border-slate-500 rounded-lg p-2"
          type="number"
          id="tempo"
          required
          placeholder="ex: 60"
          {...register("tempo")}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="foto" className="text-lg font-semibold">
          URL da Foto
        </label>
        <input
          className="border border-slate-500 rounded-lg p-2"
          type="text"
          id="foto"
          required
          placeholder="ex: https://site.com/foto.jpg"
          {...register("foto")}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="ingrediente" className="text-lg font-semibold">
          Ingredientes
        </label>
        <ul className="list-disc pl-6">
          {ingredientes.map((ingrediente, index) => (
            <li key={index} className="text-lg">
              {ingrediente}
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-3">
          <input
            className="border border-slate-500 rounded-lg p-2 flex-1"
            type="text"
            id="ingrediente"
            value={ingredienteNovo}
            onChange={(e) => setIngredienteNovo(e.target.value)}
            placeholder="ex: 2 cenouras"
          />
          <button
            type="button"
            onClick={adicionarIngrediente}
            className="bg-yellow-300 text-red-800 border border-red-800 font-bold px-4 py-[0.6rem] rounded-lg"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="instrucao" className="text-lg font-semibold">
          Instruções
        </label>
        <ul className="list-decimal pl-6">
          {instrucoes.map((instrucao, index) => (
            <li key={index} className="text-lg">
              {instrucao}
            </li>
          ))}
        </ul>
        <textarea
          value={instrucaoNova}
          id="instrucao"
          onChange={(e) => setinstrucaoNova(e.target.value)}
          placeholder="ex: Bata as cenouras no liquidificador"
          rows={2}
          className="border border-slate-500 rounded-lg p-2"
        ></textarea>
        <button
          type="button"
          onClick={adiconarInstrucao}
          className="bg-yellow-300 text-red-800 border border-red-800 font-bold mt-4 px-4 py-[0.6rem] rounded-lg"
        >
          Adicionar
        </button>
      </div>

      <div className="flex space-x-4">
        <input
          className="bg-yellow-300 text-red-800 border border-red-800 font-bold p-3 rounded-lg cursor-pointer"
          type="submit"
          value="Incluir"
        />
        <input
          className="bg-red-800 text-yellow-300 border border-yellow-300 font-bold p-3 rounded-lg cursor-pointer"
          type="reset"
          value="Limpar"
          onClick={() => {
            reset();
            setIngredientes([]);
            setInstrucoes([]);
          }}
        />
      </div>
    </form>
  );
}

export default NovaReceita;
