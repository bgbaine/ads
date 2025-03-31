import { Transporte } from "@prisma/client";

function validarDados(
  destino: string,
  transporte: Transporte,
  dataSaida: Date,
  preco: number,
  duracao: number,
  hotel: string,
  estrelas: number
) {
  if (
    !destino ||
    !transporte ||
    !dataSaida ||
    !preco ||
    !duracao ||
    !hotel ||
    !estrelas
  ) {
    return false;
  }

  if (!(transporte in Transporte)) {
    return false;
  }

  return true;
}

export default validarDados;
