import { Link } from "react-router-dom";
import { calcularParcela, formatarPreco } from "../utils/produtoUtils";

function ProdutoCard({ produto }) {
  return (
    <Link to={`/produto/${produto.id}`}>
      <div className="border border-slate-300 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4 m-4 bg-white lg:h-[34rem]">
        {/* <Link to={`/produto/${produto.id}`}> */}
        <div className="flex flex-col items-center justify-center mb-2">
          <img
            className="w-64 lg:w-full rounded-lg object-cover"
            src={produto.fotos[0]}
            alt={produto.nome}
          />
          {produto.precoAntigo && (
            <h4 className="text-sm font-semibold rounded-[0.2rem] px-4 py-1 mt-[-2rem] w-[15.9rem] lg:w-[15.5rem] bg-[#1c2bf9] text-white">
              Black Friday 2024
            </h4>
          )}
          <h3 className="text-xl font-semibold text-gray-800 mt-2">
            {produto.nome}
          </h3>
        </div>
        {/* </Link> */}
        <div className="flex gap-3 justify-center">
          {produto.categorias.map((categoria) => (
            <Link to={`/categoria/${categoria.toLowerCase()}`}>
              <h4
                key={categoria}
                className="text-sm font-semibold mb-2 rounded-2xl p-3 bg-slate-100"
              >
                {categoria}
              </h4>
            </Link>
          ))}
        </div>
        <div className="pt-2">
          {produto.precoAntigo ? (
            <div className="flex items-center gap-2">
              {/* <p>de</p> */}
              <h4 className="text-lg line-through text-[#d3d3d3]">
                {formatarPreco(produto.precoAntigo)}
              </h4>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            {/* {produto.precoAntigo && <p>por</p>} */}
            <h2 className="text-3xl font-bold text-[#1c2bf9]">
              {formatarPreco(produto.preco)}
            </h2>
            <p className="self-end font-semibold">à vista no PIX</p>
          </div>
          <p className="pt-1 font-semibold">
            12x de {calcularParcela(produto)} sem juros
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProdutoCard;
