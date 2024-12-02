DROP DATABASE IF EXISTS simulado;
CREATE DATABASE IF NOT EXISTS simulado;
USE simulado;

CREATE TABLE cidade (
 id   INT AUTO_INCREMENT,
 nome VARCHAR(45) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE fornecedor (
 id          INT AUTO_INCREMENT,
 cidade_id   INT NOT NULL,
 razaoSocial VARCHAR(45) NOT NULL,
 email       VARCHAR(255) NULL,
 PRIMARY KEY (id),
 FOREIGN KEY (cidade_id) REFERENCES cidade(id)
);

CREATE TABLE produto (
 id            INT AUTO_INCREMENT,
 fornecedor_id INT NOT NULL,
 descricao     VARCHAR(45) NOT NULL,
 valor         DECIMAL(10,2) NULL,
 qtdEstoque    INT NULL,
 PRIMARY KEY (id),
 FOREIGN KEY (fornecedor_id) REFERENCES fornecedor (id)
);

INSERT INTO cidade(nome) VALUES('Pelotas');
INSERT INTO cidade(nome) VALUES('Arroio Grande');
INSERT INTO cidade(nome) VALUES('Camaquã');
INSERT INTO cidade(nome) VALUES('Morro Redondo');

INSERT INTO fornecedor(cidade_id, razaoSocial, email) VALUES(3, "Krolos", "krolos@uol.com.br");
INSERT INTO fornecedor(cidade_id, razaoSocial, email) VALUES(1, "Trecho", "trecho@outlook.com");
INSERT INTO fornecedor(cidade_id, razaoSocial, email) VALUES(4, "Estoqui", "estoqui@gmail.com");
INSERT INTO fornecedor(cidade_id, razaoSocial, email) VALUES(2, "Guanavara", "guanavara@bol.com.br");

INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Tequila", 90.58, 20);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(4, "Tequila Gold", 98.54, 30);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(3, "Vinho Bordeaux", 39.00, 30);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(1, "H2O", 9.27, 30);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(3, "Água Benta", 9.99, 40);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(1, "Água não Benta", 6.66, 40);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Limonada", 20, 20);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(4, "Toddynho", 5, 20);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(1, "BatGut", 2, 10);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(3, "Graspa", 28, 10);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Monster", 29, 30);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(4, "Blue Bull", 31, 30);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(3, "Água Lunar", 200, 25);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Suco de Vaca", 10, 25);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(1, "Lipton Tea", 25, 28);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Torresmo frito", 10, 42);
INSERT INTO produto(fornecedor_id, descricao, valor, qtdEstoque) VALUES(2, "Pasta de torresmo", 11, 3);

/* 00. Gere o diagrama Entidade Relacionamento do banco */

/* 01 - Elabore uma consulta que apresente os nomes dos fornecedores em ordem alfabética decrescente.
Resultado Esperado:
+------------+
| Fornecedor |
+------------+
| Trecho     |
| Krolos     |
| Guanavara  |
| Estoqui    |
+------------+ */
SELECT razaoSocial AS 'Fornecedor' 
FROM fornecedor
ORDER BY razaoSocial DESC;

/* 02 - Escreva uma consulta que traga a razão social do fornecedor juntamente com o nome da cidade. 
A listagem deve seguir a ordem alfabética crescente das cidades, 
seguida pela razão social em ordem alfabética decrescente.
Resultado Esperado:
+------------+---------------+
| Fornecedor | Cidade        |
+------------+---------------+
| Guanavara  | Arroio Grande |
| Krolos     | Camaquã       |
| Estoqui    | Morro Redondo |
| Trecho     | Pelotas       |
+------------+---------------+ */
SELECT fornecedor.razaoSocial AS 'Fornecedor', cidade.nome AS 'Cidade'
FROM fornecedor
INNER JOIN cidade ON fornecedor.cidade_id = cidade.id
ORDER BY cidade.nome, fornecedor.razaoSocial DESC;

/* 03 - Escreva uma consulta que apresente o somatório total da quantidade de produtos em estoque.
Resultado Esperado:
+---------+
| Qtd Tot |
+---------+
|     433 |
+---------+ */
SELECT SUM(qtdEstoque) AS "Qtd Tot"
FROM produto;

/* 04 - Elabore uma consulta que exiba a Razão Social do Fornecedor junto com a descrição de cada produto fornecido. 
A listagem deve seguir a ordem alfabética das Razões Sociais, seguida pela descrição do produto.
Resultado Esperado:
+------------+-------------------+
| Fornecedor | Produto           |
+------------+-------------------+
| Estoqui    | Água Benta        |
| Estoqui    | Água Lunar        |
| Estoqui    | Graspa            |
| Estoqui    | Vinho Bordeaux    |
| Guanavara  | Blue Bull         |
| Guanavara  | Tequila Gold      |
| Guanavara  | Toddynho          |
| Krolos     | Água não Benta    |
| Krolos     | BatGut            |
| Krolos     | H2O               |
| Krolos     | Lipton Tea        |
| Trecho     | Limonada          |
| Trecho     | Monster           |
| Trecho     | Pasta de torresmo |
| Trecho     | Suco de Vaca      |
| Trecho     | Tequila           |
| Trecho     | Torresmo frito    |
+------------+-------------------+*/
SELECT fornecedor.razaoSocial AS 'Fornecedor', produto.descricao AS 'Produto'
FROM fornecedor
INNER JOIN produto ON fornecedor.id = produto.fornecedor_id
ORDER BY fornecedor.razaoSocial, produto.descricao;

/* 05 - Escreva uma consulta que apresente a Razão Social do fornecedor 
juntamente com a soma da quantidade de produtos fornecidos por cada fornecedor. 
Os dados devem ser agrupados por fornecedor e apresentados em ordem alfabética.
Resultado Esperado:
+-------------+-----+
| razaoSocial | Qtd |
+-------------+-----+
| Estoqui     |   4 |
| Guanavara   |   3 |
| Krolos      |   4 |
| Trecho      |   6 |
+-------------+-----+ */
SELECT fornecedor.razaoSocial, COUNT(produto.id) AS Qtd
FROM fornecedor
INNER JOIN produto ON fornecedor.id = produto.fornecedor_id
GROUP BY fornecedor.razaoSocial
ORDER BY fornecedor.razaoSocial;

/* 06 - Utilizando (LIMIT 1 ou IN e MAX), escreva uma consulta que retorne 
o nome e o valor do produto mais caro.
Resultado Esperado:
+------------+--------+
| Produto    | valor  |
+------------+--------+
| Água Lunar | 200.00 |
+------------+--------+ */
SELECT descricao AS 'Produto', valor
FROM produto
ORDER BY valor DESC 
LIMIT 1;
-- OU 
SELECT descricao AS 'Produto', valor
FROM produto
WHERE valor IN (SELECT MAX(valor) FROM produto);

/* 07 - Elabore uma consulta que exiba o nome da cidade 
juntamente com a quantidade total de produtos em estoque 
para aquelas cidades que possuem mais de 110 produtos em estoque.

Resultado Esperado:
+---------------+---------+
| Cidade        | Qtd Tot |
+---------------+---------+
| Pelotas       |     140 |
| Morro Redondo |     210 |
+---------------+---------+ */
SELECT cidade.nome AS 'Cidade', SUM(produto.qtdEstoque) AS 'Qtd Tot'
FROM cidade
INNER JOIN fornecedor ON cidade.id = fornecedor.cidade_id
INNER JOIN produto ON fornecedor.id = produto.fornecedor_id
GROUP BY cidade.nome
HAVING SUM(produto.qtdEstoque) > 110;

/* 08 - Escreva uma consulta que atualize o valor de todos os produtos fornecidos por "Guanavara" para 25.00. */
UPDATE produto
SET valor = 25.00
WHERE fornecedor_id IN (SELECT id FROM fornecedor WHERE razaoSocial = 'Guanavara');

/* 09 - Elabore uma consulta que retorne a Razão Social do fornecedor que fornece o produto mais barato.
Resultado Esperado:
+------------+
| Fornecedor |
+------------+
| Krolos     |
+------------+ */
SELECT fornecedor.razaoSocial AS 'Fornecedor'
FROM fornecedor 
INNER JOIN produto ON fornecedor.id = produto.fornecedor_id
WHERE produto.valor = (SELECT MIN(valor) FROM produto);

/* 10 -  Escreva uma consulta que atualize a quantidade em estoque de todos os produtos 
fornecidos por "Estoqui" para o dobro da quantidade atual. */
UPDATE produto
SET qtdEstoque = qtdEstoque * 2
WHERE fornecedor_id IN (SELECT id FROM fornecedor WHERE razaoSocial = 'Estoqui');
