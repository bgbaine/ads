import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProdutoCard from "./components/ProdutoCard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Pesquisa() {
  const location = useLocation();
  const paramsConsulta = new URLSearchParams(location.search);
  const consulta = paramsConsulta.get("query").toLowerCase();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const getProdutos = async () => {
      const response = await fetch("http://localhost:3000/produtos");

      if (!response.ok) {
        console.error("Houve um erro ao conectar com a API");
        return;
      }

      const data = await response.json();
      setProdutos(data);
    };
    getProdutos();
  }, []);

  const listaProdutos = produtos
    .filter(
      (produto) =>
        produto.nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(
            consulta
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          ) ||
        produto.categorias.some((categoria) =>
          categoria.toLowerCase().includes(consulta.toLowerCase())
        )
    )
    .map((produto) => <ProdutoCard key={produto.id} produto={produto} />);

  return (
    <>
      <Header />
      <main className="">
        {consulta ? (
          <p className="bg-white text-3xl p-8">
            Exibindo resultados para <strong>{consulta}</strong>
          </p>
        ) : (
          <p className="bg-white text-3xl p-8">
            Faça uma busca para encontrar o que deseja!
          </p>
        )}
        <section className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {listaProdutos.length > 0 ? (
              listaProdutos
            ) : (
              <p>Nenhum resultado encontrado!</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Pesquisa;
