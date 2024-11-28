import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import ProdutoCard from "./components/ProdutoCard";
import { getProdutos } from "./utils/produtoUtils";

function Categoria() {
  const { nomeCategoria } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await getProdutos();
      if (data) {
        setProdutos(data);
      }
    };

    fetchProdutos();
  }, [nomeCategoria]);

  const listaProdutos = produtos
    .filter((produto) =>
      produto.categorias
        .map((categoria) => categoria.toLowerCase())
        .includes(nomeCategoria)
    )
    .map((produto) => <ProdutoCard key={produto.id} produto={produto} />);

  const categories = ["corrida", "masculino", "feminino", "infantil"];

  return (
    <>
      <Header />
      <section className="flex flex-col-reverse gap-7 lg:flex-row justify-between items-center px-14 py-7 lg:text-3xl">
        <h1 className="font-bold text-5xl">
          {nomeCategoria.charAt(0).toUpperCase() + nomeCategoria.slice(1)}
        </h1>
        <div className="flex gap-1">
          {categories.map((category) => (
            <Link key={category} to={`/categoria/${category}`}>
              <h2
                className={`font-bold lg:font-normal bg-slate-100 lg:bg-transparent rounded-2xl p-3 hover:font-semibold ${
                  nomeCategoria === category
                    ? "font-bold lg:font-semibold"
                    : "font-semibold"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5">{listaProdutos}</div>
      </section>
      <Footer />
    </>
  );
}

export default Categoria;
