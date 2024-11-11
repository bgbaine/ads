import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NovaReceita from "./NovaReceita";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function Header({ receitas, setReceitas }) {
  const [consulta, setConsulta] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const abrirModal = () => {
    setOpen(true);
  };

  const redirecionarHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <header className="bg-red-800 text-yellow-400 py-10 px-5 flex items-center justify-around font-serif italic sticky top-0 shadow-slate-500 shadow-md">
      <Link to={"/"}>
        <div className="font-bold">
          <h1 className="text-6xl hover:text-yellow-200" onClick={redirecionarHome}>Delícias Avenida</h1>
        </div>
      </Link>
      <div className="flex items-center">
        <input
          className="rounded-md w-80 h-12 px-4 mr-4 text-black italic shadow-red-950 shadow-md"
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
      <button
        onClick={abrirModal}
        className="bg-yellow-300 p-5 text-red-800 rounded-lg font-bold shadow-red-950 shadow-lg"
      >
        Adicionar
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
      >
        <NovaReceita receitas={receitas} setReceitas={setReceitas} setOpen={setOpen} />
      </Modal>
    </header>
  );
}

export default Header;
