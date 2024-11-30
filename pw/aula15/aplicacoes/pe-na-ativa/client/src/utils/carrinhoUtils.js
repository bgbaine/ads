import { getProduto } from "./produtoUtils";
import { Toaster, toast } from "sonner";

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

export const adicionarAoCarrinho = async (id, tamanho) => {
  if (!tamanho) {
    toast.error("Informe o tamanho do produto!", {duration:2000});
    return;
  }
  const carrinho = await getCarrinho();

  const produtoExistente = carrinho.find(
    (produto) => produto.id === id && produto.tamanho == tamanho
  );

  if (produtoExistente) {
    produtoExistente.quantidade += 1;

    const produtoAtualizado = {
      id: produtoExistente.id,
      tamanho: produtoExistente.tamanho,
      quantidade: produtoExistente.quantidade,
    };

    fetch(`http://localhost:3000/carrinho/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoAtualizado),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Produto adicionado ao carrinho com sucesso:", data);
      })
      .catch((error) => {
        console.error("Erro ao adicionar o produto ao carrinho:", error);
      });
    toast.success(`Produto adicionado ao carrinho!`);
  } else {
    const novoProduto = {
      id: id,
      tamanho: tamanho,
      quantidade: 1,
    };

    fetch(`http://localhost:3000/carrinho/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Produto adicionado ao carrinho:", data);
      })
      .catch((error) => {
        console.error("Erro ao adicionar o produto ao carrinho:", error);
      });
    toast.success(`Produto adicionado ao carrinho!`);
  }
  setTimeout(() => {
    window.location.href = "http://localhost:5173/carrinho";
  }, 1500);
};

export const removerDoCarrinho = async (id, setCarrinho) => {
  const response = await fetch(`http://localhost:3000/carrinho/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  setCarrinho(await getCarrinho());
  toast.success(`Produto removido do carrinho!`, {duration:1500});
};

export const limparCarrinho = async () => {
  const carrinho = await getCarrinho();

  for (const produto of carrinho) {
    await fetch(`http://localhost:3000/carrinho/${produto.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  toast.success("Pedido realizado com sucesso!");
};
