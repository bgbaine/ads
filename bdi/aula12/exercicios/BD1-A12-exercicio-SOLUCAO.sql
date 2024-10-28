
/* 
1a - Faça a modelagem lógica e física: Sistema de Biblioteca Virtual
Considere um sistema de biblioteca virtual que precisa ser modelado em um banco de dados. 
O sistema deve armazenar informações sobre livros, autores, usuários e empréstimos de livros.
Livros: Cada livro é identificado por um ISBN único e possui um título, uma editora, 
um ano de publicação e uma categoria (por exemplo, ficção, não-ficção, romance, etc.).
Autores: Cada autor é identificado por um código único 
e possui um nome completo, data de nascimento e país de origem.
Usuários: Cada usuário é identificado por um número de identificação único 
e possui um nome, endereço de e-mail e data de cadastro no sistema.
Empréstimos: Cada empréstimo é identificado por um número de registro único 
e está associado a um usuário e a um livro. 
Além disso, é registrado a data de empréstimo e a data de devolução prevista.
Lembre-se de definir as chaves primárias 
e os relacionamentos entre as tabelas no diagrama entidade-relacionamento.
*/
DROP DATABASE IF EXISTS biblioteca_virtual;
CREATE DATABASE biblioteca_virtual;
USE biblioteca_virtual;

CREATE TABLE pais (
  id   INT AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE categoria (
  id   INT AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE autor (
  id         INT AUTO_INCREMENT,
  nome       VARCHAR(255) NOT NULL,
  data_nasc  DATE,
  pais_id    INT,
  PRIMARY KEY (id),
  FOREIGN KEY (pais_id) REFERENCES pais(id)
);

CREATE TABLE livro (
  isbn        CHAR(13) PRIMARY KEY,
  titulo      VARCHAR(255) NOT NULL,
  editora     VARCHAR(100),
  ano         YEAR,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE autor_livro (
  autor_id   INT,
  livro_isbn CHAR(13),
  PRIMARY KEY (autor_id, livro_isbn),
  FOREIGN KEY (autor_id) REFERENCES autor(id),
  FOREIGN KEY (livro_isbn) REFERENCES livro(isbn)
);

CREATE TABLE usuario (
  id       INT AUTO_INCREMENT,
  nome     VARCHAR(255) NOT NULL,
  email    VARCHAR(100) UNIQUE NOT NULL,
  data_cad DATE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE emprestimo (
  registro        INT AUTO_INCREMENT,
  usuario_id      INT NOT NULL,
  livro_isbn      CHAR(13) NOT NULL,
  data_emprestimo DATE NOT NULL,
  data_devolucao  DATE,
  PRIMARY KEY (registro),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (livro_isbn) REFERENCES livro(isbn)
);



/*
1b - Faça a modelagem lógica e física: Sistema de Gestão do Clube de Esportes Esmeraldinos
O Clube de Esportes Esmeraldinos deseja desenvolver um sistema de gestão para organizar suas operações. 
O clube possui informações sobre diferentes modalidades esportivas, sócios, 
treinadores e inscrições em atividades esportivas.
Modalidades Esportivas: Cada modalidade possui um código identificador único, 
um nome e uma descrição detalhada.
Sócios: Cada sócio é identificado por um número de matrícula único 
e possui um nome, data de nascimento e data de adesão ao clube.
Treinadores: Cada treinador possui um identificador único, 
um nível de certificação, data de contratação e um salário.
Inscrições em Atividades: Cada inscrição possui um número único, está associada a um sócio, 
uma modalidade esportiva e um treinador responsável. 
Além disso, é registrada a data de início da participação.
*/

DROP DATABASE IF EXISTS esmeraldinos;
CREATE DATABASE esmeraldinos;
USE esmeraldinos;

CREATE TABLE modalidade (
  id            INT AUTO_INCREMENT,
  nome          VARCHAR(100) NOT NULL,
  descricao     TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE socio (
  matricula     INT AUTO_INCREMENT,
  nome          VARCHAR(255) NOT NULL,
  data_nasc     DATE,
  data_adesao   DATE NOT NULL,
  PRIMARY KEY (matricula)
);

CREATE TABLE treinador (
  id               INT AUTO_INCREMENT,
  nome             VARCHAR(255) NOT NULL,
  certificacao     VARCHAR(50),
  data_contratacao DATE,
  salario          DECIMAL(10, 2),
  PRIMARY KEY (id)
);

CREATE TABLE inscricao (
  id                INT AUTO_INCREMENT,
  socio_matricula   INT,
  modalidade_id     INT,
  treinador_id      INT,
  data_inicio       DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (socio_matricula) REFERENCES socio(matricula),
  FOREIGN KEY (modalidade_id)   REFERENCES modalidade(id),
  FOREIGN KEY (treinador_id)    REFERENCES treinador(id)
);


/* Lembre-se de definir as chaves primárias 
e os relacionamentos entre as tabelas no diagrama entidade-relacionamento. */


-- Execute o script SQL a seguir, faça o solicitado:

-- Excluir o banco de dados (caso exista)
DROP DATABASE IF EXISTS loja_eletronicos;

-- Criar o banco de dados
CREATE DATABASE loja_eletronicos;

-- Usar o banco de dados
USE loja_eletronicos;

-- Tabela Marca
CREATE TABLE marca (
  id INT AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- Tabela Categoria
CREATE TABLE categoria (
  id INT AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- Tabela Produto
CREATE TABLE produto (
  id INT AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2),
  quantidade_estoque INT,
  data_lancamento DATE,
  marca_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (marca_id) REFERENCES marca(id)
);

-- Tabela Produto_Categoria
CREATE TABLE produto_categoria (
  produto_id INT,
  categoria_id INT,
  PRIMARY KEY (produto_id, categoria_id),
  FOREIGN KEY (produto_id) REFERENCES produto(id),
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Inserir dados na tabela Marca
INSERT INTO marca (nome) VALUES 
  ('Samsung'),
  ('Apple'),
  ('Sony'),
  ('Microsoft'),
  ('LG'),
  ('Google'),
  ('Huawei'),
  ('Asus');

-- Inserir dados na tabela Categoria
INSERT INTO categoria (nome) VALUES 
  ('Smartphones'),
  ('Tablets'),
  ('Notebooks'),
  ('Televisores'),
  ('Consoles de Videogame'),
  ('Monitores'),
  ('Acessórios'),
  ('Periféricos');

-- Inserir dados na tabela Produto
INSERT INTO produto (nome, descricao, preco, quantidade_estoque, data_lancamento, marca_id) VALUES 
  ('Samsung Galaxy S20', 'Smartphone com câmera de alta resolução e tela de 120Hz.', 2999.99, 100, '2020-03-06', 1),
  ('Apple iPad Pro', 'Tablet potente com processador A14 Bionic e suporte a Apple Pencil.', 1099.99, 50, '2020-04-01', 2),
  ('Sony VAIO S', 'Notebook leve e potente com SSD de alta velocidade.', 1499.99, 80, '2019-09-15', 3),
  ('Xbox Series X', 'Console de videogame da nova geração com suporte a 4K e Ray Tracing.', 499.99, 120, '2020-11-10', 4),
  ('LG OLED CX', NULL, 1999.99, 60, '2020-07-20', 5),
  ('Google Pixel 5', 'Smartphone com sistema operacional Android e câmera de alta qualidade.', 799.99, 80, '2020-10-15', 6),
  ('Huawei MatePad Pro', 'Tablet com design premium e tela de alta resolução.', 899.99, 40, '2020-06-30', 7),
  ('Asus ZenBook', 'Notebook ultraleve e potente com processador Intel Core.', 1299.99, 60, '2020-02-20', 8),
  ('Google Chromecast', 'Dispositivo de streaming para transformar sua TV em smart TV.', 49.99, 150, '2020-05-05', 6),
  ('Asus ROG Strix XG27UQ', 'Monitor gamer com taxa de atualização de 144Hz e tecnologia FreeSync.', 699.99, 30, '2020-08-10', 8),
  ('Samsung Galaxy Note 10', NULL, 899.99, 0, NULL, 1),
  ('LG Gram 17Z90N', 'Notebook ultraleve com bateria de longa duração.', NULL, 30, NULL, 5),
  ('Microsoft Xbox One S', NULL, 299.99, NULL, NULL, 4);

-- Inserir dados na tabela Produto_Categoria (associação entre produtos e categorias)
INSERT INTO produto_categoria (produto_id, categoria_id) VALUES
  (1, 1),
  (2, 2),
  (3, 3), 
  (4, 5), 
  (5, 4), 
  (1, 4), 
  (3, 1),
  (6, 1),
  (7, 2),
  (8, 3), 
  (9, 2), 
  (10, 1);

-- Rode o script acima e responda conforme solicitado:

/* 2a. Listar os produtos ordenados pelo preço em ordem decrescente: */
SELECT nome, preco 
FROM produto 
ORDER BY preco DESC;

/* 2b. Listar as diferentes datas de lancamento de produtos: */
SELECT DISTINCT data_lancamento 
FROM produto 
ORDER BY data_lancamento;

/* 2c. Listar os produtos com preço superior a 1000, mostrando apenas o nome e o preço, 
ordenados pelo nome em ordem alfabética: */
SELECT nome, preco 
FROM produto 
WHERE preco > 1000 
ORDER BY nome ASC;

/* 2d. Listar os produtos que possuem mais de 50 unidades em estoque, 
mostrando o nome, a quantidade em estoque e a marca, ordenados alfabeticamente pelo nome do produto: */
SELECT p.nome, p.quantidade_estoque, m.nome AS marca 
FROM produto p 
JOIN marca m ON p.marca_id = m.id 
WHERE p.quantidade_estoque > 50 
ORDER BY p.nome ASC;

/* 2e. Listar as marcas que comecem "A", ordenados alfabeticamente pelo nome: */
SELECT nome 
FROM marca 
WHERE nome LIKE 'A%' 
ORDER BY nome ASC;

/* 2f. Listar os produtos que foram lançados a partir de junho de 2020, 
mostrando o nome e o preço, ordenados pelo preço em ordem decrescente: */
SELECT nome, preco 
FROM produto 
WHERE data_lancamento >= '2020-06-01' 
ORDER BY preco DESC;

/* 2g. Listar os produtos que não possuem descrição, 
mostrando o nome e o preço, ordenados pelo preço em ordem crescente: */
SELECT nome, preco 
FROM produto 
WHERE descricao IS NULL 
ORDER BY preco ASC;

/* 2h. Listar as diferentes categorias de produtos em ordem alfabética: */
SELECT nome 
FROM categoria 
ORDER BY nome ASC;
