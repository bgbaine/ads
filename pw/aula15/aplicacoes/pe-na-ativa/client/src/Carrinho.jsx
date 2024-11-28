import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import CarrinhoCard from "./components/CarrinhoCard";
import { getCarrinho } from "./utils/carrinhoUtils";
import { formatarPreco } from "./utils/produtoUtils";
import { useForm } from "react-hook-form";

function Carrinho() {
  const { register, watch } = useForm();
  const [carrinho, setCarrinho] = useState([]);
  const [produtoQuantidade, setProdutoQuantidade] = useState([]);
  const [produtoTotal, setProdutoTotal] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCarrinho = async () => {
      const data = await getCarrinho();
      if (data) {
        setCarrinho(data);
      }
    };

    fetchCarrinho();
  }, []);

  const listaProdutos = carrinho.map((produto) => (
    <CarrinhoCard key={produto.id} produto={produto} />
  ));

  const listaCarrinho = carrinho.map((produto, index) => (
    <tbody className="">
      <tr className="border-t">
        <td className="px-4 py-2 flex items-center">
          <img
            src={produto.fotos[0]}
            alt="Imagem do Produto"
            className="w-44"
          />
          <td>
            <h3>{produto.nome}</h3>
            <p>Tamanho {produto.tamanho}</p>
          </td>
        </td>
        <td className="px-4 py-2 text-center">
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="text-center w-10"
            name={produto.id}
            {...register(produto.id)}
          />
        </td>
        <td className="px-4 py-2 text-right">
          {produto.precoAntigo && (
            <>
              <span className="line-through">
                {formatarPreco(produto.precoAntigo)}
              </span>
              <br />
            </>
          )}
          {formatarPreco(produto.preco)}
        </td>
        <td className="px-4 py-2 text-right">
          {formatarPreco(produto.preco * watch(produto.id))}
        </td>
      </tr>
      {total}
    </tbody>
  ));

  console.log(watch("subtotal"));

  return (
    <>
      <Header />
      <section className="flex flex-col-reverse gap-7 lg:flex-row justify-between items-center px-14 py-7 lg:text-3xl">
        <h1 className="font-bold text-5xl">Checkout</h1>
      </section>
      <section className="flex justify-center">
        {/* <div className="grid grid-cols-1 lg:grid-cols-1">{listaProdutos}</div> */}
        <table className="">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Produtos</th>
              <th className="px-4 py-2 text-center">Quantidade</th>
              <th className="px-4 py-2 text-right">Valor Unitário</th>
              <th className="px-4 py-2 text-right">Valor Total</th>
            </tr>
          </thead>
          {listaCarrinho}
        </table>
      </section>
      <Footer />
    </>
  );
}

export default Carrinho;
