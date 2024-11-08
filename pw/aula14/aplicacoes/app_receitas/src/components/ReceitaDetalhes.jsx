import { useParams } from "react-router-dom";

function ReceitaDetalhes({ receitas }) {
  const { id } = useParams(); // Get the recipe ID from the URL
  const receita = receitas.find((r) => r.id === id); // Find the recipe by ID

  if (!receita) {
    return <p>Receita não encontrada.</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{receita.nome}</h1>
      <img src={receita.foto} alt={receita.nome} className="w-80" />
      <p className="text-lg">{receita.descricao}</p>
      <p>
        <strong>Categoria:</strong> {receita.categoria}
      </p>
      <p>
        <strong>Tempo:</strong> {receita.tempo} minutos
      </p>

      <h2 className="mt-5 text-xl font-semibold">Preparo:</h2>
      <ul className="list-disc pl-5">
        {receita.preparo.map((passo, index) => (
          <li key={index}>{passo}</li>
        ))}
      </ul>

      <p>
        <strong>Avaliação:</strong> {receita.nota}
      </p>
    </div>
  );
}

export default ReceitaDetalhes;
