-- A partir do script SQL a seguir, faça o solicitado:

-- Excluir o banco de dados (caso exista)
DROP DATABASE IF EXISTS aula10;

-- Criar o banco de dados
CREATE DATABASE aula10;

-- Usar o banco de dados
USE aula10;

-- Tabela Cliente
CREATE TABLE cliente (
  cpf VARCHAR(11) PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  telefone VARCHAR(15) NOT NULL
);

-- Tabela Produto
CREATE TABLE produto (
  codigo INT PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  quantidade_estoque INT NOT NULL
);

-- Tabela venda
CREATE TABLE venda (
  numero_nf INT PRIMARY KEY AUTO_INCREMENT,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  cliente_cpf VARCHAR(11),
  tipo_pagamento VARCHAR(50) NOT NULL,
  FOREIGN KEY (cliente_cpf) REFERENCES cliente(cpf)
);

-- Tabela Itens_venda
CREATE TABLE itens_venda (
  numero_nf INT,
  codigo_produto INT,
  quantidade INT NOT NULL,
  valor_venda DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (numero_nf, codigo_produto),
  FOREIGN KEY (numero_nf) REFERENCES venda(numero_nf),
  FOREIGN KEY (codigo_produto) REFERENCES produto(codigo)
);


-- Inserir dados na tabela Cliente
INSERT INTO cliente (cpf, nome, endereco, telefone)
VALUES 
  ('11111111111', 'José Jacinto da Silva', 'Rua das Piadas, 123', '(53) 1111-1111'),
  ('22222222222', 'Maria Marota da Costa', 'Avenida do Humor, 456', '(31) 3232-3232'),
  ('33333333333', 'Pedro Piadista Pereira', 'Travessa da Comédia, 789', '(33) 3333-3333'),
  ('44444444444', 'Ana Anedota Alves', 'Alameda das Gargalhadas, 321', '(44) 4444-4444'),
  ('55555555555', 'Carlos Cômico Costa', 'Praça do Riso, 654', '(55) 5555-5555'),
  ('66666666666', 'Rita Risada Rodrigues', 'Beco do Sorriso, 987', '(53) 6666-6666'),
  ('77777777777', 'Joaquim Jocoso Jesus', 'Largo do Chiste, 123', '(51) 7777-7777'),
  ('88888888888', 'Sandra Sarcástica Silva', 'Rua das Anedotas, 456', '(88) 8888-8888'),
  ('99999999999', 'Mário Maluco Martins', 'Avenida do Trocadilho, 789', '(99) 9999-9999'),
  ('10101010101', 'Teresa Trapalhona Trindade', 'Travessa da Paródia, 147', '(10) 1010-1010'),
  ('12121212121', 'Paulo Palhaço Pereira', 'Alameda da Gaita, 369', '(12) 1212-1212'),
  ('43434343434', 'Lúcia Louca Lopes', 'Praça da Bobagem, 258', '(43) 4343-4343'),
  ('14141414141', 'Fernando Farsante Ferreira', 'Beco da Zoação, 741', '(14) 1414-1414'),
  ('15151515151', 'Carmen Comediante Costa', 'Largo da Piada, 852', '(15) 1515-1515'),
  ('16161616161', 'Roberto Risonho Rodrigues', 'Rua do Troço, 963', '(16) 1616-1616'),
  ('17171717171', 'Gisele Gargalhada Gomes', 'Avenida do Riso, 741', '(17) 1717-1717'),
  ('18181818181', 'Hugo Hilariante Hernandes', 'Travessa da Brincadeira, 963', '(18) 1818-1818'),
  ('19191919191', 'Sônia Sorridente Silva', 'Alameda da Graça, 852', '(19) 1919-1919'),
  ('20202020202', 'Ricardo Risonho Rocha', 'Praça do Humor, 741', '(20) 2020-2020'),
  ('21212121212', 'Clara Comédia Costa', 'Beco da Diversão, 963', '(21) 2121-2121');

-- Inserir dados na tabela Produto
INSERT INTO produto (codigo, descricao, valor, quantidade_estoque)
VALUES 
  (1, 'Chapéu para fumar na chuva', 15.50, 100),
  (2, 'Nariz de Palhaço', 5.99, 200),
  (3, 'Peruca Colorida', 25.00, 50),
  (4, 'Bigode Falso', 3.75, 300),
  (5, 'Óculos de Nariz', 2.99, 150),
  (6, 'Gravata transparente', 8.00, 0),
  (7, 'Bola de Sapo', 12.50, 80),
  (8, 'Pato de Borracha', 6.99, 180),
  (9, 'Maracas de Brinquedo', 4.25, 250),
  (10, 'Cartola Mágica', 10.00, 100),
  (11, 'Apito de Palhaço', 1.99, 300),
  (12, 'Sapato Gigante', 20.50, 70),
  (13, 'Flor Mordida', 3.00, 200),
  (14, 'Máscara invisível', 7.50, 0),
  (15, 'Cachorro de Pelúcia', 18.99, 90),
  (16, 'Bateria de Brinquedo', 15.00, 0),
  (17, 'Trompete de Plástico', 5.99, 250),
  (18, 'Martelo de Brinquedo', 8.50, 0),
  (19, 'Serpentina Infinita', 2.25, 500),
  (20, 'Foguete de Brinquedo', 12.00, 80),
  (21, 'Balão Surpresa', 1.50, 300),
  (22, 'Espada de Balão', 4.99, 200),
  (23, 'Pipoca Explosiva', 6.00, 150),
  (24, 'Boneco Quebra-cabeça', 9.50, 120),
  (25, 'Pena de Pavão digital', 3.99, 250),
  (26, 'Tambor de Lata', 7.25, 180),
  (27, 'Máquina de Fumaça de Brinquedo', 22.00, 0),
  (28, 'Luvas de Malabares', 11.50, 90),
  (29, 'Varinha Mágica', 5.00, 200),
  (30, 'Cama Elástica Portátil', 30.00, 0);

-- Inserir dados na tabela venda
INSERT INTO venda (data, hora, cliente_cpf, tipo_pagamento)
VALUES 
  ('2024-03-25', '15:30:00', '11111111111', 'Cartão de Crédito'),
  ('2024-03-25', '16:45:00', '22222222222', 'Dinheiro'),
  ('2024-03-25', '14:20:00', '33333333333', 'Boleto'),
  ('2024-03-28', '18:10:00', '44444444444', 'Cartão de Débito'),
  ('2024-03-29', '12:55:00', '55555555555', 'PiX'),
  ('2024-03-30', '10:40:00', '66666666666', 'Dinheiro'),
  ('2024-04-02', '13:15:00', '77777777777', 'Boleto'),
  ('2024-04-02', '19:00:00', '88888888888', 'Cartão de Crédito'),
  ('2024-04-02', '16:30:00', '99999999999', 'Dinheiro'),
  ('2024-04-02', '11:20:00', '10101010101', 'Cartão de Débito'),
  ('2024-04-02', '14:45:00', '12121212121', 'Boleto'),
  ('2024-04-06', '17:55:00', '43434343434', 'PiX'),
  ('2024-04-07', '12:35:00', '14141414141', 'Dinheiro'),
  ('2024-04-08', '09:25:00', '15151515151', 'Cartão de Crédito'),
  ('2024-04-09', '20:15:00', '16161616161', 'Boleto'),
  ('2024-04-10', '15:05:00', '17171717171', 'Dinheiro'),
  ('2024-04-11', '13:50:00', '18181818181', 'PiX'),
  ('2024-04-12', '11:30:00', '19191919191', 'Cartão de Débito'),
  ('2024-04-13', '18:40:00', '20202020202', 'Dinheiro'),
  ('2024-04-14', '16:10:00', '21212121212', 'Boleto');

-- Inserir dados na tabela Itens_venda
INSERT INTO itens_venda (numero_nf, codigo_produto, quantidade, valor_venda)
VALUES 
  (1, 1, 2, 31.00),
  (1, 3, 1, 25.00),
  (1, 7, 3, 37.50),
  (1, 10, 2, 20.00),
  (2, 2, 3, 17.97),
  (2, 4, 2, 7.50),
  (2, 6, 1, 8.00),
  (2, 8, 2, 13.98),
  (3, 12, 1, 20.50),
  (3, 15, 2, 37.98),
  (4, 17, 3, 17.97),
  (4, 19, 2, 4.50),
  (4, 21, 1, 1.50),
  (5, 24, 2, 19.00),
  (5, 26, 1, 7.25),
  (5, 28, 3, 34.50),
  (5, 30, 2, 60.00),
  (6, 1, 2, 31.00),
  (6, 3, 1, 25.00),
  (6, 7, 3, 37.50),
  (6, 10, 2, 20.00);

