import { useEffect, useState } from "react";
import Header from "./components/Header";
import ReceitaItem from "./components/ReceitaItem";
import Footer from "./components/Footer";

function App() {
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("receitas")) {
      const receitas2 = JSON.parse(localStorage.getItem("receitas"));
      setReceitas(receitas2);
    }
  }, []);

  const listarReceitas = receitas.map((receita) => (
    <ReceitaItem key={receita.nome} receita={receita} />
  ));

  return (
    <>
      <Header />
      <main className="bg-slate-200">
        <section className="grid grid-cols-4 gap-10 py-10 px-10">
          {listarReceitas}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
