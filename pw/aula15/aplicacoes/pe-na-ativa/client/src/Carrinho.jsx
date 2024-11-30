import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import CarrinhoCard from "./components/CarrinhoCard";
import { getCarrinho, limparCarrinho, removerDoCarrinho } from "./utils/carrinhoUtils";
import { formatarPreco } from "./utils/produtoUtils";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Toaster, toast } from "sonner";

function Carrinho() {
  const { register, watch, setValue } = useForm();
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCarrinho = async () => {
      const data = await getCarrinho();
      if (data) {
        setCarrinho(data);
      }
    };

    fetchCarrinho();
  }, []);

  const atualizarQuantidade = (produtoId, quantidade) => {
    const quantidadeAtual = parseInt(watch(produtoId)) || 1;
    const quantidadeNova = quantidadeAtual + quantidade;
    if (quantidadeNova > 0 && quantidadeNova <= 20) {
      setValue(produtoId, quantidadeNova);
      const carrinhoAtualizado = carrinho.map((produto) =>
        produto.id === produtoId
          ? { ...produto, quantidade: quantidadeNova }
          : produto
      );
      setCarrinho(carrinhoAtualizado);
    }
  };

  const calcularProdutoTotal = (produtoId, preco) => {
    const quantidade = parseInt(watch(produtoId)) || 1;
    return preco * quantidade;
  };

  useEffect(() => {
    let totalCarrinho = 0;
    carrinho.forEach((produto) => {
      totalCarrinho += calcularProdutoTotal(produto.id, produto.preco);
    });
    setTotal(totalCarrinho);
  }, [carrinho, watch()]);

  const finalizarCompra = () => {
    limparCarrinho();
    
    setTimeout(() => {
      window.location.href = 'http://localhost:5173/';
    }, 3000);
  };

  const listaCarrinho = carrinho.map((produto, index) => (
    <tbody key={produto.id}>
      <tr className="border-t hover:bg-slate-100 lg:table-row hidden">
        <td className="pr-8">
          <IoMdClose
            size={40}
            className="cursor-pointer text-red-600"
            onClick={() => removerDoCarrinho(produto.id, setCarrinho)}
          />
        </td>
        <Link to={`/produto/${produto.id}`}>
          <td className="lg:px-4 lg:py-2 flex items-center">
            <img
              src={produto.fotos[0]}
              alt="Imagem do Produto"
              className="lg:w-44 w-32"
            />
            <td className="pl-8">
              <h3 className="w-36 leading-5 lg:w-auto lg:text-3xl font-semibold">
                {produto.nome}
              </h3>
              <p>Tamanho {produto.tamanho}</p>
            </td>
          </td>
        </Link>
        <td className="px-4 py-2 text-center pl-28">
          <td className="lg:flex lg:items-center hidden">
            <FaMinus
              className="cursor-pointer"
              onClick={() => atualizarQuantidade(produto.id, -1)}
              size={25}
            />
            <input
              type="number"
              defaultValue={produto.quantidade}
              min={1}
              max={20}
              className="text-center w-10 text-2xl font-semibold bg-slate-100 mx-3 rounded-lg p-2"
              name={produto.id}
              {...register(produto.id)}
            />
            <FaPlus
              className="cursor-pointer"
              onClick={() => atualizarQuantidade(produto.id, 1)}
              size={25}
            />
          </td>
        </td>
        <td className="px-4 py-2 text-right clear-start leading-4">
          {produto.precoAntigo && (
            <>
              <span className="line-through text-md text-slate-300">
                {formatarPreco(produto.precoAntigo)}
              </span>
              <br />
            </>
          )}
          <p className="text-xl font-semibold">
            {formatarPreco(produto.preco)}
          </p>
        </td>
        <td className="px-4 py-2 text-right">
          <p className="text-2xl font-bold">
            {formatarPreco(calcularProdutoTotal(produto.id, produto.preco))}
          </p>
        </td>
      </tr>
      <div className="lg:hidden pb-8">
        <div className="flex justify-end pr-4">
          <IoMdClose
            size={70}
            className="cursor-pointer pt-4 mb-[-5rem] z-10 text-red-600"
            onClick={() => removerDoCarrinho(produto.id, setCarrinho)}
          />
        </div>
        <Link to={`/produto/${produto.id}`}>
          <img src={produto.fotos[0]} alt="Imagem do Produto" className="z-1" />
        </Link>
        <div className="px-5">
          <Link to={`/produto/${produto.id}`}>
            <h3 className="text-2xl font-semibold pt-4">{produto.nome}</h3>
            <p className="text-sm text-slate-400">Tamanho {produto.tamanho}</p>
          </Link>
          <div className="flex items-center justify-between leading-5 pt-3">
            <div>
              {produto.precoAntigo && (
                <h3 className="text-sm line-through text-slate-300">
                  {formatarPreco(produto.precoAntigo)}
                </h3>
              )}
              <h3 className="text-md font-semibold">
                {formatarPreco(produto.preco)}
              </h3>
            </div>
            <div className="flex items-center gap-0">
              <FaMinus
                className="cursor-pointer"
                onClick={() => atualizarQuantidade(produto.id, -1)}
                size={10}
              />
              <input
                type="number"
                defaultValue={produto.quantidade}
                min={1}
                max={20}
                className="text-center w-10 text-lg font-semibold bg-slate-100 mx-3 rounded-lg p-1"
                name={produto.id}
                {...register(produto.id)}
              />
              <FaPlus
                className="cursor-pointer"
                onClick={() => atualizarQuantidade(produto.id, 1)}
                size={10}
              />
            </div>
            <div className="">
              <p className="text-2xl font-bold">
                {formatarPreco(calcularProdutoTotal(produto.id, produto.preco))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </tbody>
  ));

  return (
    <>
      <Toaster position="top-right" richColors />
      <Header />

      <section className="flex flex-col-reverse gap-7 lg:flex-row justify-between items-center px-14 py-7 lg:text-3xl">
        <h1 className="font-bold text-5xl pb-2">Checkout</h1>
      </section>
      {carrinho.length > 0 ? (
        <>
          <section className="lg:flex lg:justify-center">
            <table className="">{listaCarrinho}</table>
          </section>
          <section className="lg:flex lg:justify-between lg:items-center lg:px-44 lg:py-7 px-5">
            <div>
              <p className="font-semibold lg:pb-2 pt-2">Frete e Entrega</p>
              <div className="flex">
                <input
                  type="text"
                  name=""
                  id=""
                  className="bg-slate-100 h-12 px-4"
                />
                <button className="bg-[#1c2bf9] text-white px-4 py-[0.6rem] font-semibold text-lg w-full rounded-r-xl lg:block mb-8 hover:bg-blue-700">
                  Calcular
                </button>
              </div>
            </div>
            <hr />
            <div className="text-3xl font-bold flex-col items-center gap-8">
              <p className="text-3xl font-bold pt-4 pb-4">
                <span className="font-normal">Total:</span>{" "}
                {formatarPreco(total)}
              </p>
              <button
                className="bg-[#1c2bf9] text-white px-4 py-[0.6rem] font-semibold text-lg w-full rounded-xl lg:block mb-8 hover:bg-blue-700"
                onClick={finalizarCompra}
              >
                Finalizar Compra
              </button>
            </div>
          </section>
        </>
      ) : (
        <section className="flex justify-center items-center text-center min-h-80">
          <h2 className="lg:text-4xl text-3xl px-10 lg:px-0 lg:leading-10 leading-[2.5rem] font-semibold lg:block hidden">
            Ops! Parece que o carrinho está de férias. <br />
            <span>Vamos adicionar uns itens e fazer ele trabalhar?</span>
          </h2>
          <h2 className="lg:text-4xl text-3xl px-2 lg:px-0 lg:leading-10 leading-[3rem] font-semibold lg:hidden">
            Ops! Carrinho vazio... <br />
            Que tal adicionar alguns itens?
          </h2>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Carrinho;
