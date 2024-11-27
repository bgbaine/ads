import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import ProdutoCard from "./components/ProdutoCard";
import { getProdutos } from "./utils/produtoUtils";

function App() {
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

  const listaProdutos = produtos.map((produto) => (
    <ProdutoCard key={produto.id} produto={produto} />
  ));

  return (
    <>
      <Header />
      <section className="flex flex-col-reverse gap-7 lg:flex-row justify-between items-center px-14 py-7 lg:text-3xl">
        <h1 className="font-bold text-5xl">Em alta</h1>
        <div className="flex gap-1">
          <Link to={"/categoria/corrida"}>
            <h2 className="font-bold lg:font-normal bg-slate-100 lg:bg-transparent rounded-2xl p-3 hover:font-semibold">
              Corrida
            </h2>
          </Link>
          <Link to={"/categoria/masculino"}>
            <h2 className="font-bold lg:font-normal bg-slate-100 lg:bg-transparent rounded-2xl p-3 hover:font-semibold">
              Masculino
            </h2>
          </Link>
          <Link to={"/categoria/feminino"}>
            <h2 className="font-bold lg:font-normal bg-slate-100 lg:bg-transparent rounded-2xl p-3 hover:font-semibold">
              Feminino
            </h2>
          </Link>
          <Link to={"/categoria/infantil"}>
            <h2 className="font-bold lg:font-normal bg-slate-100 lg:bg-transparent rounded-2xl p-3 hover:font-semibold">
              Infantil
            </h2>
          </Link>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-5">{listaProdutos}</div>
      </section>
      <Footer />
    </>
  );
}

export default App;
