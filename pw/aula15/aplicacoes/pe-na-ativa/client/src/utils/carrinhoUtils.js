import { getProduto } from "./produtoUtils";

export const getCarrinho = async () => {
  const response = await fetch("http://localhost:3000/carrinho");

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();

  const carrinho = [];

  for (const produto of data) {
    const produtoIncompleto = await getProduto(produto.id);

    const produtoCompleto = {
      ...produtoIncompleto,
      tamanho: +produto.tamanho,
      quantidade: produto.quantidade,
    };

    carrinho.push(produtoCompleto);
  }

  return carrinho;
};

export const adicionarAoCarrinho = async (id) => {
  // PUT
  const response = await fetch(`http://localhost:3000/carrinho`);

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data[0];
};

export const removerDoCarrinho = async (id) => {
  // DELETE
  const response = await fetch(`http://localhost:3000/carrinho`);

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data[0];
};

export const limparCarrinho = async (id) => {
  const response = await fetch(`http://localhost:3000/carrinho`);

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data[0];
};
