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

// export const getCarrinho
// export const getCarrinho
