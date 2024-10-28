
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
/* 2b. Listar as diferentes datas de lancamento de produtos: */

/* 2c. Listar os produtos com preço superior a 1000, mostrando apenas o nome e o preço, 
ordenados pelo nome em ordem alfabética: */

/* 2d. Listar os produtos que possuem mais de 50 unidades em estoque, 
mostrando o nome, a quantidade em estoque e a marca, ordenados alfabeticamente pelo nome do produto: */

/* 2e. Listar as marcas que comecem "A", ordenados alfabeticamente pelo nome: */

/* 2f. Listar os produtos que foram lançados a partir de junho de 2020, 
mostrando o nome e o preço, ordenados pelo preço em ordem decrescente: */

/* 2g. Listar os produtos que não possuem descrição, 
mostrando o nome e o preço, ordenados pelo preço em ordem crescente: */

/* 2h. Listar as diferentes categorias de produtos em ordem alfabética: */

