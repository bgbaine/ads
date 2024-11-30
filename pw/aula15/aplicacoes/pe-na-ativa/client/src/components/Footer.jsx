function Footer() {
  const redirecionarHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#1c2bf9] text-white py-10 flex flex-col justify-center items-center mt-20">
      <h1
        className="text-3xl font-semibold text-white cursor-pointer hover:text-blue-100"
        onClick={redirecionarHome}
      >
        Pé na Ativa
      </h1>
      <p className="mt-2 text-sm text-white">
        © 2024 Pé na Ativa. Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
