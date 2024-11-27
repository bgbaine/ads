import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";

function ProdutoCard({ produto }) {
  return (
    <div className="border border-slate-300 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 m-4 bg-white">
      <Link to={`produto/${produto.id}`}>
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            className="w-64 lg:w-full rounded-lg object-cover"
            src={produto.foto}
            alt={produto.nome}
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-2">
            {produto.nome}
          </h3>
        </div>
      </Link>
      <h4 className="text-lg font-bold text-slate-300 mb-2 line-through">
        {produto.precoAntigo}
      </h4>
      <h4 className="text-lg font-bold text-green-600 mb-2">{produto.preco}</h4>
      <button>
        <LuShoppingCart
          className="bg-[#1c2bf9] text-white p-2 rounded-lg"
          size={50}
        />
      </button>
    </div>
  );
}

export default ProdutoCard;
