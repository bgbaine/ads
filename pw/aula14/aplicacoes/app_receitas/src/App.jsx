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
    <ReceitaItem
      key={receita.nome}
      receita={receita}
      receitas={receitas}
      setReceitas={setReceitas}
    />
  ));

  return (
    <>
      <Header />
      <body className="bg-slate-200">
        <div className="grid grid-cols-4 gap-10 py-10 px-10">
          {listarReceitas}
        </div>
      </body>
      <Footer />
    </>
  );
}

export default App;
