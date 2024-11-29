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

/* export const adicionarAoCarrinho = async (id) => {
  // PUT
  const response = await fetch(`http://localhost:3000/carrinho`);

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data[0];
}; */

export const adicionarAoCarrinho = async (id, tamanho = "39") => {
  // Step 1: Fetch the current carrinho data (GET request)
  const response = await fetch("http://localhost:3000/carrinho");

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json(); // Consume the response body once

  // Step 2: Create the new item to add to carrinho
  const newItem = {
    id: id,
    tamanho: tamanho,
    quantidade: 1,
  };

  // Step 3: Insert the new item at the beginning of the array
  data.unshift(newItem);

  // Step 4: Send a PUT request to update the carrinho
  const updateResponse = await fetch(`http://localhost:3000/carrinho/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Send the updated data back to the server
  });

  if (!updateResponse.ok) {
    console.error("Houve um erro ao atualizar o carrinho");
    return;
  }
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
