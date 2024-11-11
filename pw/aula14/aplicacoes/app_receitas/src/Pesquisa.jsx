import { useLocation } from "react-router-dom";
import ReceitaItem from "./components/ReceitaItem";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Pesquisa() {
  const location = useLocation();
  const paramsConsulta = new URLSearchParams(location.search);
  const consulta = paramsConsulta.get("query").toLowerCase();

  const receitas = JSON.parse(localStorage.getItem("receitas")) || [];

  const listarReceitas = receitas
    .filter(
      (receita) =>
        receita.nome.toLowerCase().includes(consulta) ||
        receita.categoria.toLowerCase().includes(consulta)
    )
    .map((receita) => <ReceitaItem key={receita.id} receita={receita} />);

  return (
    <>
      <Header />
      <main className="bg-slate-200">
        {consulta ? (
          <p className="bg-white text-3xl p-8">
            Exibindo resultados para <strong>{consulta}</strong>
          </p>
        ) : (
          <p className="bg-white text-3xl p-8">
            Faça uma busca para encontrar o que deseja!
          </p>
        )}
        <section className="grid grid-cols-4 gap-10 py-10 px-10">
          {listarReceitas.length > 0 ?
            listarReceitas :
            <p>
                Nenhum resultado encontrado!
            </p>  
        }
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Pesquisa;
