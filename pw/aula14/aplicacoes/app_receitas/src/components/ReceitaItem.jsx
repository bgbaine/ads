import { Link } from "react-router-dom";
import Estrelas from "./Estrelas";

function ReceitaItem({ receita, receitas, setReceitas }) {
  return (
    <div className="bg-white rounded-lg shadow-slate-500 shadow-md p-8 flex-row items-center w-96">
      <Link to={`/receita/${receita.id}`} className="block w-full">
        <img className="w-80 h-52 rounded-lg" src={receita.foto} alt="Foto da Receita" />
        <div>
          <h2 className="font-bold text-xl pt-4 pb-2">{receita.nome}</h2>
          {receita.nota > 0 && <Estrelas num={receita.nota} />}
          <p className="font-semibold text-lg">
            {receita.categoria} - {receita.tempo} min
          </p>
          <p className="pt-3 text-justify">{receita.descricao}</p>
        </div>
      </Link>
    </div>
  );
}

export default ReceitaItem;
