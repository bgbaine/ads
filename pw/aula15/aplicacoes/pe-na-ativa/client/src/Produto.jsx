import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { getProduto } from "./utils/produtoUtils";
import { calcularParcela } from "./utils/mathUtils";

function Produto() {
  const { id } = useParams();
  const [tamanho, setTamanho] = useState(null);
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      const data = await getProduto(id);
      if (data) {
        setProduto(data);
      }
    };

    fetchProduto();
  }, [id]);

  if (!produto) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <Header />
      <main className="flex flex-col lg:flex-row justify-center pt-4">
        <div>
          <img src={produto.fotos[0]} className="w-100" alt={produto.nome} />
          <img src={produto.fotos[1]} className="hidden" alt={produto.nome} />
          <img src={produto.fotos[2]} className="hidden" alt={produto.nome} />
          <h2 className="text-2xl font-semibold pt-2 pb-3 px-4">
            {produto.nome}
          </h2>
        </div>
        <div className="px-4">
          <h2 className="hidden lg:block">{produto.nome}</h2>
          <div className="flex gap-3">
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
          {produto.precoAntigo ? (
            <div className="flex items-center gap-2">
              {/* <p>de</p> */}
              <h4 className="text-xl line-through text-[#d3d3d3]">
                {produto.precoAntigo.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h4>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            {/* {produto.precoAntigo && <p>por</p>} */}
            <h2 className="text-4xl font-bold text-[#1c2bf9]">
              {produto.preco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
            <p className="self-end font-semibold">à vista no PIX</p>
          </div>
          <p className="pt-1 font-semibold">
            12x de {calcularParcela(produto)} sem juros
          </p>
          <div>
            <h3 className="text-md pt-3 pb-2">
              Tamanho: {tamanho ? tamanho : "Selecione um tamanho"}
            </h3>
            <div className="flex gap-3">
              {produto.tamanhos.map((tamanho) => (
                <h4
                  key={tamanho}
                  onClick={() => setTamanho(tamanho)}
                  className="text-sm font-semibold mb-2 rounded-2xl p-3 bg-slate-100 cursor-pointer"
                >
                  {tamanho}
                </h4>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4">
          <h3 className="text-2xl font-semibold pt-2 pb-3">Sobre o produto</h3>
          <p className="text-md text-justify">{produto.descricao}</p>
        </div>
        <div className="flex justify-center sticky bottom-0 my-2 z-10">
          <button className="bg-[#1c2bf9] text-white py-4 text-2xl w-full">
            Comprar Agora
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Produto;
