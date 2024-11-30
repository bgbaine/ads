export const getProdutos = async () => {
  const response = await fetch("http://localhost:3000/produtos");

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data;
};

export const getProduto = async (id) => {
  const response = await fetch(`http://localhost:3000/produtos?id=${id}`);

  if (!response.ok) {
    console.error("Houve um erro ao conectar com a API");
    return;
  }

  const data = await response.json();
  return data[0];
};

export const adicionarProduto = async (produto) => {
  const data = await getProdutos(); // Fetch all existing products

  // Delete all existing products first
  for (const item of data) {
    await fetch(`http://localhost:3000/produtos/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Add the new product at the beginning and reinsert all products
  const updatedData = [produto, ...data]; // New product is at the front

  // Insert each product back into the list via POST (note: this is done individually per product)
  for (const item of updatedData) {
    await fetch(`http://localhost:3000/produtos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item), // Insert each product
    });
  }
};

export const calcularParcela = (produto) => {
  const valorParcela = produto.preco / 12;
  return valorParcela.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatarPreco = (preco) => {
  return preco.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
