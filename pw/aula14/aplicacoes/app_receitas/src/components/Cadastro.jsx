import { useState } from "react";
import Modal from "react-modal";

function Cadastro() {
  const [open, setOpen] = useState(false);

  const abrirModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={abrirModal}
        className="bg-yellow-300 p-5 text-red-800 rounded-lg font-bold"
      >
        Adicionar
      </button>
      <Modal isOpen={open}>
        <form action="">
          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" />
        </form>
      </Modal>
    </>
  );
}

export default Cadastro;
