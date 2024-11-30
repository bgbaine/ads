import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { formatarPreco, getProduto } from "./utils/produtoUtils";
import { calcularParcela } from "./utils/produtoUtils";
import Carousel from "./components/Carousel";
import { adicionarAoCarrinho } from "./utils/carrinhoUtils";
import { Toaster } from "sonner";

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
      <main className="flex flex-col lg:flex-row justify-center pt-4 lg:gap-6 lg:pt-16 ">
        <div className="">
          <div className="lg:hidden">
            <Carousel fotos={produto.fotos} />
          </div>
          <div className="hidden lg:flex justify-center items-center">
            <div className="flex justify-between w-full lg:gap-2">
              <img
                src={produto.fotos[1]}
                className="w-[30rem] h-[30rem]"
                alt={produto.nome}
              />
              <img
                src={produto.fotos[0]}
                className="w-[30rem] h-[30rem]"
                alt={produto.nome}
              />
            </div>
          </div>
          <div className="lg:flex justify-center hidden pt-4">
            <img
              src={produto.fotos[2]}
              className="w-[61rem]"
              alt={produto.nome}
            />
          </div>
          <h2 className="lg:hidden text-2xl font-semibold pt-2 pb-3 px-4">
            {produto.nome}
          </h2>
        </div>
        <div className="px-4 lg:pt-4">
          {produto.precoAntigo && (
            <Link to={"/promocoes"}>
              <h4 className="text-sm font-semibold mb-2 rounded-2xl p-3 bg-[#1c2bf9] text-white hover:bg-blue-700">
                Black Friday 2024
              </h4>
            </Link>
          )}
          <h2 className="hidden lg:block text-3xl font-semibold pt-2 pb-3 w-96">
            {produto.nome}
          </h2>
          <div className="flex gap-3">
            {produto.categorias.map((categoria) => (
              <Link to={`/categoria/${categoria.toLowerCase()}`}>
                <h4
                  key={categoria}
                  className="text-sm font-semibold mb-2 rounded-2xl p-3 hover:bg-slate-50 bg-slate-100"
                >
                  {categoria}
                </h4>
              </Link>
            ))}
          </div>
          <div className="lg:pt-4 pt-2">
            {produto.precoAntigo ? (
              <div className="flex items-center gap-2">
                {/* <p>de</p> */}
                <h4 className="text-xl line-through text-[#d3d3d3]">
                  {formatarPreco(produto.precoAntigo)}
                </h4>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              {/* {produto.precoAntigo && <p>por</p>} */}
              <h2 className="text-4xl font-bold text-[#1c2bf9]">
                {formatarPreco(produto.preco)}
              </h2>
              <p className="self-end font-semibold">à vista no PIX</p>
            </div>
            <p className="pt-1 font-semibold">
              12x de {calcularParcela(produto)} sem juros
            </p>
          </div>

          <div className="lg:pt-4 lg:pb-8">
            <h3 className="text-md pt-3 pb-2">
              Tamanho: {tamanho ? tamanho : "Selecione um tamanho"}
            </h3>
            <div className="flex gap-3">
              {produto.tamanhos.map((tamanho) => (
                <h4
                  key={tamanho}
                  onClick={() => setTamanho(tamanho)}
                  className="text-sm font-semibold mb-2 rounded-2xl p-3 bg-slate-100 cursor-pointer hover:bg-slate-50"
                >
                  {tamanho}
                </h4>
              ))}
            </div>
          </div>
          <button
            onClick={() => adicionarAoCarrinho(produto.id, tamanho)}
            className="bg-[#1c2bf9] text-white py-4 text-2xl w-full rounded-xl hidden lg:block mb-8 hover:bg-blue-700 font-semibold"
          >
            Comprar Agora
          </button>
          <div>
            <p className="font-semibold lg:pb-2 pt-2">Frete e Entrega</p>
            <div className="flex">
              <input
                type="text"
                name=""
                id=""
                className="bg-slate-100 h-12 px-4"
              />
              <button className="bg-[#1c2bf9] text-white py-[0.6rem] font-semibold text-lg w-full rounded-r-xl lg:block mb-8 hover:bg-blue-700">
                Calcular
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <h3 className="text-2xl font-semibold pt-2 pb-3">
              Sobre o produto
            </h3>
            <p className="text-sm text-justify w-[23.75rem]">
              {produto.descricao}
            </p>
          </div>
        </div>
        <hr className="mt-3 pb-3" />
        <div className="px-4 lg:hidden">
          <h3 className="text-2xl font-semibold pt-2 pb-3">Sobre o produto</h3>
          <p className="text-md text-justify">{produto.descricao}</p>
        </div>
      </main>
      <Footer />
      <div className="flex justify-center sticky bottom-0 lg:hidden shadow-[0px_4px_20px_4px_rgba(0,0,0,0.7)]">
        <button
          onClick={() => adicionarAoCarrinho(produto.id, tamanho)}
          className="bg-[#1c2bf9] text-white py-4 text-2xl w-full font-semibold shadow-[0px_10px_10px_6px_rgba(0,0,0,0.8)]"
        >
          Comprar Agora
        </button>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default Produto;
