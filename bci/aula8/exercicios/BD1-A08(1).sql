DROP   DATABASE IF EXISTS aula08; -- Exclui o banco aula08, caso ele exista
CREATE DATABASE aula08; -- Cria o banco aula08
USE aula08; -- Acessa o banco aula08

/* 01 - Criar a modelagem física para o diagrama apresentado. 
Observe, atentamente, os tipos de dados de cada campo, 
as chaves primárias, as chaves estrangeiras e os campos obrigatórios.
*/
CREATE TABLE produto(
  codigo     INT AUTO_INCREMENT, 
  descricao  VARCHAR(45) NOT NULL,
  valor      DECIMAL(10,2),
  qtdEstoque INT, 
  PRIMARY KEY (codigo));

CREATE TABLE venda( 
  id        INT AUTO_INCREMENT,
  dataVenda DATE NOT NULL,
  nrNF      VARCHAR(45),
  PRIMARY KEY (id));

CREATE TABLE venda_itens(
  produto_codigo INT,
  venda_id   	   INT,
  qtdVenda 		   INT,
  PRIMARY KEY (produto_codigo, venda_id),
  FOREIGN KEY (produto_codigo) REFERENCES produto(codigo),
  FOREIGN KEY (venda_id)       REFERENCES venda(id));

/* 02 - Cadastrar 18 produtos */
INSERT INTO produto (descricao, valor, qtdEstoque) VALUES 
('Camiseta Polo', 49.99, 100),
('Calça Jeans', 89.99, 0),
('Vestido Floral', 69.99, 60),
('Moletom com Capuz', 79.99, 70),
('Sapato Social', 149.99, 40),
('Bolsa de Couro', 99.99, 90),
('Óculos de Sol', 59.99, 110),
('Jaqueta de Couro', 199.99, 30),
('Saia Plissada', 39.99, 80),
('Blusa de Tricô', 49.99, 70),
('Calçado Infantil', 29.99, 120),
('Blazer Feminino', 89.99, 50),
('Calça Social', 79.99, 60),
('Relógio de Pulso', 149.99, 40),
('Bermuda Esportiva', 34.99, 0),
('Meia Esportiva', 9.99, 150),
('Chapéu de Praia', 19.99, 100),
('Carteira de Couro', 39.99, 80);

/* 03 - Cadastrar 3 Vendas */
INSERT INTO venda (dataVenda, nrNF) VALUES 
("2024-05-20", "543B"),
("2024-05-20", "8567"),
("2024-05-21", "9823");

/* 04 - Cadastrar 10 itens de venda */
INSERT INTO venda_itens (produto_codigo, venda_id, qtdVenda) VALUES 
(4, 1, 10),
(1, 1, 5),
(3, 1, 6),
(2, 2, 9),
(4, 2, 10),
(1, 2, 5),
(3, 3, 6),
(2, 3, 9),
(1, 3, 6),
(9, 3, 9);

/* 05 - Listar todos os campos de todos os produtos 
em ordem alfabética (crescente) de descricao; */
SELECT *
FROM produto
ORDER BY descricao;

/* 06 - Listar descricao e qtdEstoque dos produtos 
com qtdEstoque menor do que 90 */
SELECT descricao, qtdEstoque
FROM Produto
WHERE qtdEstoque < 90;

/* 07 - Alterar para "Produto esgotado" o nome de 
todos os produtos com qtdEstoque menor ou igual a zero */
UPDATE produto
SET descricao = "Produto esgotado"
WHERE qtdEstoque <= 0;

SELECT * FROM produto; -- Verificando

/* 08 - Listar a dataVenda e nrNF de todas as vendas em ordem decrescente de dataVenda; */
SELECT dataVenda, nrNF
FROM venda
ORDER BY dataVenda DESC;

/* 09 - Alterar para "2024-04-22" a dataVenda de todas a vendas; */
UPDATE venda
SET dataVenda = "2024-04-22";

SELECT * FROM venda; -- Vericando

/* 10 - Listar todos os registros da tabela item, em ordem decrescente de qtdVenda. */
SELECT *
FROM venda_itens
ORDER BY qtdVenda DESC;

/* 11 – Liste os produtos que a descrição comece com a letra "C". */
SELECT *
FROM produto
WHERE descricao LIKE "C%";

/* 12 – Liste os produtos que contenham “ de ” na descrição; */
SELECT *
FROM produto
WHERE descricao LIKE "% de %";

/* 13 – Liste o valor da maior quantidade em estoque; */
SELECT MAX(qtdEstoque)
FROM produto;

/* 14 – Liste o valor médio da quantidade de produtos em estoque; */
SELECT AVG(qtdEstoque)
FROM produto;

/* 15 – Liste a quantidade total vendida (soma das quantidades vendidas de todos os produtos); */
SELECT SUM(qtdVenda)
FROM venda_itens;

/* 16 – Liste as diferentes quantidades em estoque; */
SELECT DISTINCT(qtdEstoque)
FROM produto;

/* 17 – Liste os diferentes valores de produto; */
SELECT DISTINCT(valor)
FROM produto;

/* 18 – Liste o valor do produto mais caro; */
SELECT MAX(valor)
FROM produto;

/* 19 – Liste o valor do produto mais barato; */
SELECT MIN(valor)
FROM produto;

/* 20 – Liste produtos que NÃO comecem com a letra "C". */
SELECT *
FROM produto
WHERE descricao NOT LIKE "C%";
