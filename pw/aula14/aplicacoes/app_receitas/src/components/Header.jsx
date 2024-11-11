import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Cadastro from "./Cadastro";

function Header() {
  const [consulta, setConsulta] = useState("");
  const navigate = useNavigate();

  const pesquisar = () => {
    if (consulta.trim()) {
      navigate(`/pesquisa?query=${consulta}`);
    }
  };

  const ouvirClick = (e) => {
    if (e.key == "Enter") {
      pesquisar();
    }
  };

  return (
    <header className="bg-red-800 text-yellow-400 py-10 px-5 flex items-center justify-around font-serif italic">
      <Link to={"/"}>
        <div className="font-bold">
          <h1 className="text-6xl hover:text-yellow-200">Delicias Avenida</h1>
        </div>
      </Link>
      <div className="flex items-center">
        <input
          className="rounded-md w-80 h-12 px-4 mr-4 text-black italic"
          type="search"
          placeholder="O que você deseja comer hoje?"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          onKeyDown={ouvirClick}
        />
        <FaMagnifyingGlass
          size={30}
          className="cursor-pointer hover:text-yellow-200"
          onClick={pesquisar}
        />
      </div>
      <Cadastro/>
    </header>
  );
}

export default Header;
