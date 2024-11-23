import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function Header() {
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
    <header className="sticky top-0">
      <div className="bg-[#1c2bf9] text-white py-6 flex items-center lg:justify-between justify-between lg:px-10 px-6 shadow-slate-500 shadow-md">
        <h1
          className="text-4xl hover:text-blue-100 cursor-pointer"
          onClick={redirecionarHome}
        >
          Pé na Ativa
        </h1>
        <div className="flex items-center gap-8">
          <input
            className="rounded-3xl w-[35rem] h-12 px-6 mr-4 text-md text-black shadow-blue-900 shadow-md hidden lg:block"
            type="text"
            placeholder="O que você está procurando?"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            onKeyDown={ouvirClick}
          />
          <div className="bg-white rounded-r-3xl ml-[-5rem] hidden lg:block">
            <FaMagnifyingGlass
              size={20}
              className="cursor-pointer hover:text-blue-500 text-blue-700"
              onClick={pesquisar}
            />
          </div>
          <div className=" items-center gap-2 cursor-pointer hover:text-blue-100 hidden lg:flex">
            <h2 className="text-[1.35rem] font-light">Lista de desejos</h2>
            <FaRegHeart size={30} />
          </div>
        </div>
        <div className="flex items-center lg:gap-8 gap-2">
          <LuShoppingCart
            className="cursor-pointer hover:text-blue-100"
            size={35}
          />
          <GoPlus
            className="cursor-pointer hover:text-blue-100"
            onClick={abrirModal}
            size={45}
          />
        </div>
        <Modal open={open} onClose={() => setOpen(false)} center>
          <h2>ha</h2>
        </Modal>
      </div>
      <div className="flex pt-4 pr-5 justify-center items-center gap-8 lg:hidden">
        <input
          className="rounded-3xl w-[20rem] h-12 px-6 mr-4 text-md text-black shadow-blue-200 shadow-md"
          type="text"
          placeholder="O que você está procurando?"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          onKeyDown={ouvirClick}
        />
        <div className="bg-white rounded-r-3xl ml-[-5rem]">
          <FaMagnifyingGlass
            size={20}
            className="cursor-pointer hover:text-blue-500 text-blue-700"
            onClick={pesquisar}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
