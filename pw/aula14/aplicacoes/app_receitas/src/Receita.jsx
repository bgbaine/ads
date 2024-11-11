import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EstrelasAvaliacao from "./components/EstrelasAvaliacao";

function Receita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    const receitas = JSON.parse(localStorage.getItem("receitas")) || [];
    const receita2 = receitas.find((receita) => receita.id === id);
    setReceita(receita2);
  }, [id]);

  if (!receita) {
    return <div>Receita não encontrada</div>;
  }

  return (
    <>
      <Header />
      <main className="bg-slate-200 flex flex-col justify-center items-center">
        <section className="bg-white m-8 px-40 py-16 rounded-lg shadow-slate-500 shadow-md">
          <h1 className="text-5xl font-bold pt-4 pb-2">{receita.nome}</h1>
          <div className="flex flex-col items-center">
            <img
              className="w-[60rem] rounded-lg pt-8"
              src={receita.foto}
              alt="Foto da Receita"
            />
            <p className="font-bold text-3xl pt-4 pb-2">
              Tempo de Preparo: {receita.tempo} min
            </p>
          </div>
          <p className="pt-3 text-justify text-xl w-[70rem]">
            {receita.descricao_completa}
          </p>
          <div>
            <h3 className="font-semibold text-2xl pt-4">Ingredientes</h3>
            <ul className="list-disc pl-8 pt-3">
              {receita.ingredientes.map((ingrediente) => (
                <li className="text-lg">{ingrediente}</li>
              ))}
            </ul>
            <h3 className="font-semibold text-2xl pt-4 pb-5">Instruções</h3>
            <ol className="list-decimal pl-8">
              {receita.preparo.map((preparo) => (
                <li className="text-lg">{preparo}</li>
              ))}
            </ol>
          </div>
          <div className="flex items-center pt-8">
            <EstrelasAvaliacao receita={receita} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Receita;
