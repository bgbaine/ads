import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import ProdutoCard from "./components/ProdutoCard";
import { getProdutos } from "./utils/produtoUtils";

function Promocoes() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await getProdutos();
      if (data) {
        setProdutos(data);
      }
    };

    fetchProdutos();
  }, []);

  const listaProdutos = produtos
    .filter((produto) => produto.precoAntigo !== undefined)
    .map((produto) => <ProdutoCard key={produto.id} produto={produto} />);

  /* const listaProdutos = produtos.map((produto) => (
    <ProdutoCard key={produto.id} produto={produto} />
  )); */

  return (
    <>
      <Header />
      <section className="flex flex-col-reverse gap-7 lg:flex-row justify-between items-center px-14 py-7 lg:text-3xl">
        <h1 className="font-bold text-5xl">Promoções</h1>
      </section>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5">{listaProdutos}</div>
      </section>
      <Footer />
    </>
  );
}

export default Promocoes;
