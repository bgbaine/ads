import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const EstrelasAvaliacao = ({ receita }) => {
  const [sobre, setSobre] = useState(0);
  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    if (receita) {
      setAvaliacao(receita.nota || 0);
    }
  }, [receita]);

  const capturarMouseSobre = (index) => {
    setSobre(index + 1);
  };

  const capturarMouseFora = () => {
    setSobre(0);
  };

  const avaliar = (index) => {
    const novaAvaliacao = index + 1;
    setAvaliacao(novaAvaliacao);

    const receitas = JSON.parse(localStorage.getItem("receitas") || "[]");

    const updatedReceitas = receitas.map((r) => {
      if (r.nome === receita.nome) {
        return { ...r, nota: novaAvaliacao };
      }
      return r;
    });

    localStorage.setItem("receitas", JSON.stringify(updatedReceitas));
  };

  return (
    <div className="flex items-center">
      <h4 className="text-[1.75rem] pr-4 font-semibold">Avalie a receita:</h4>
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={30}
            className={`cursor-pointer ${
              avaliacao > index || sobre > index
                ? "text-yellow-300"
                : "text-gray-300"
            }`}
            onMouseEnter={() => capturarMouseSobre(index)}
            onMouseLeave={capturarMouseFora}
            onClick={() => avaliar(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EstrelasAvaliacao;
