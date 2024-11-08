import { FaStar } from "react-icons/fa";

function Estrelas({ num }) {
  const estrelas = [];

  for (let i = 0; i < num; i++) {
    estrelas.push(<FaStar size={28} className="text-yellow-300" />);
  }
  return <div className="flex pb-3">{estrelas}</div>;
}

export default Estrelas;
