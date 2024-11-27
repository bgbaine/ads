export const calcularParcela = (produto) => {
  const valorParcela = produto.preco / 12;
  return valorParcela.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};
