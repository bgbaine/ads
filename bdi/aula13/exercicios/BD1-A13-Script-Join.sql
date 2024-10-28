DROP DATABASE IF EXISTS aula13;
CREATE DATABASE IF NOT EXISTS aula13;
USE aula13;

CREATE TABLE a (
  id    INT(11),
  valor CHAR(30)
);

CREATE TABLE b (
  id    INT(11),
  valor CHAR(30)
);

INSERT INTO a VALUES(1, "FOX");
INSERT INTO a VALUES(2, "COP");
INSERT INTO a VALUES(3, "TAXI");
INSERT INTO a VALUES(6, "WASHINGTON");
INSERT INTO a VALUES(7, "DELL");
INSERT INTO a VALUES(5, "ARIZONA");
INSERT INTO a VALUES(4, "LINCOLN");
INSERT INTO a VALUES(10, "LUCENT");

INSERT INTO b VALUES(1, "TROT");
INSERT INTO b VALUES(2, "CAR");
INSERT INTO b VALUES(3, "CAB");
INSERT INTO b VALUES(6, "MONUMENT");
INSERT INTO b VALUES(7, "PC");
INSERT INTO b VALUES(8, "MICROSOFT");
INSERT INTO b VALUES(9, "APPEL");
INSERT INTO b VALUES(11, "SCOTCH");

SELECT * FROM a;

SELECT * FROM b;

-- INNER JOIN
SELECT *
FROM a
INNER JOIN b ON a.id = b.id;

SELECT *
FROM a,
     b 
WHERE a.id = b.id;

-- LEFT JOIN
SELECT *
FROM a
LEFT JOIN b ON a.id = b.id;

-- RIGHT JOIN
SELECT *
FROM a
RIGHT JOIN b ON a.id = b.id;

-- OUTER JOIN
SELECT *
FROM a
LEFT JOIN b ON a.id = b.id
UNION
SELECT *
FROM a
RIGHT JOIN b ON a.id = b.id;

-- LEFT EXCLUDING JOIN
SELECT *
FROM a
LEFT JOIN b ON a.id = b.id
WHERE b.id IS NULL;

-- RIGHT EXCLUDING JOIN
SELECT *
FROM a
RIGHT JOIN b ON a.id = b.id
WHERE a.id IS NULL;

-- OUTER EXCLUDING JOIN
SELECT *
FROM a
LEFT JOIN b ON a.id = b.id
WHERE b.id IS NULL
UNION
SELECT *
FROM a
RIGHT JOIN b ON a.id = b.id
WHERE a.id IS NULL;



-- Crie as tabelas conforme solicitado
CREATE TABLE cli (
  codigo INT(11) AUTO_INCREMENT,
  nome   CHAR(30),
  PRIMARY KEY (codigo)
);

CREATE TABLE pedido (
  nr      INT(11),
  cliente INT(11),
  valor   DECIMAL(9,2),
  PRIMARY KEY (nr)
);

INSERT INTO cli (nome) VALUES("José");
INSERT INTO cli (nome) VALUES("Elísio");
INSERT INTO cli (nome) VALUES("Roberto");
INSERT INTO cli (nome) VALUES("Guilherme");

INSERT INTO pedido (nr, cliente, valor) VALUES(1, 2, 100.50);
INSERT INTO pedido (nr, cliente, valor) VALUES(2, 2, 120.00);
INSERT INTO pedido (nr, cliente, valor) VALUES(3, 1, 20.00);
INSERT INTO pedido (nr, cliente, valor) VALUES(4, 3, 60.00);
INSERT INTO pedido (nr, cliente, valor) VALUES(5, 3, 110.00);

-- INNER JOINT
SELECT pedido.nr, 
       cli.nome, 
       pedido.valor
FROM cli
INNER JOIN pedido ON (cli.codigo = pedido.cliente);

-- LEFT JOIN
SELECT pedido.nr, 
       cli.nome, 
       pedido.valor
FROM cli
LEFT JOIN pedido ON (cli.codigo = pedido.cliente);

-- LEFT EXCLUDING JOIN
SELECT pedido.nr, 
       cli.nome, 
       pedido.valor
FROM cli
LEFT JOIN pedido ON (cli.codigo = pedido.cliente)
WHERE pedido.nr IS NULL;

-- Lance mais alguns clientes
INSERT INTO cli (nome) VALUES("Elaine");
INSERT INTO cli (nome) VALUES("Maria");
INSERT INTO cli (nome) VALUES("Thais");

SELECT pedido.nr, 
       cli.nome, 
       pedido.valor
FROM cli
LEFT JOIN pedido ON (cli.codigo = pedido.cliente);

-- Abaixo vemos exemplos de uso do COUNT();
SELECT COUNT(pedido.valor)
FROM cli
LEFT JOIN pedido ON (cli.codigo = pedido.cliente);

SELECT COUNT(*)
FROM cli
LEFT JOIN pedido ON (cli.codigo = pedido.cliente);

-- Alias
SELECT c.nome, 
       p.nr, 
      p.valor
FROM pedido p
INNER JOIN cli c ON (p.cliente = c.codigo);

-- Exercícios
-- Criar a tabela proprietarios e a tabela carros;

CREATE TABLE proprietarios(
  rg   CHAR(16),
  nome VARCHAR(40),
  PRIMARY KEY(rg)
);

CREATE TABLE carros(
  renavam    CHAR(12),
  modelo     VARCHAR(20),
  marca      VARCHAR(20),
  cor        VARCHAR(10),
  proprietario_rg CHAR(16),
  PRIMARY KEY(renavam)
);

-- Insira os seguintes valores para proprietários
INSERT INTO proprietarios VALUES("123456789", "João da Silva");
INSERT INTO proprietarios VALUES("654123987", "Maria de Oliveira");
INSERT INTO proprietarios VALUES("987654321", "José de Souza");

-- Insira os seguintes valores para carros
INSERT INTO carros VALUES("123456789123", "Fiesta", "Ford", "Prata", "123456789");
INSERT INTO carros VALUES("123456789124", "Palio", "Fiat", "Vermelho", "123456789");
INSERT INTO carros VALUES("123456789125", "Corsa", "Chevrolet", "Amarelo", "987654321");
INSERT INTO carros VALUES("123456789126", "Gol", "Volkswagen", "Branco", "987654321");

SELECT * FROM proprietarios;

SELECT * FROM carros;

-- 3 - Listar o Renavam, modelo, marca, cor e nome do proprietário de todos os carros.
SELECT c.renavam, 
       c.modelo, 
       c.marca, 
       c.cor, 
       p.nome
FROM proprietarios p
LEFT JOIN carros c ON p.rg = c.proprietario_rg;

-- 1 - Exiba quantos carros tem cada proprietário.
SELECT p.nome           AS Proprietário,
       COUNT(c.renavam) AS qtd_veículos
FROM proprietarios p
LEFT JOIN carros c ON p.rg = c.proprietario_rg
GROUP BY p.nome;

-- 2 - Exibir quantos carros tem cada proprietário que possui carros, ou seja, quem não possui nenhum carro não deve ser exibido.
SELECT p.nome           AS Proprietário,
       COUNT(c.renavam) AS qtd_veículos
FROM proprietarios p
INNER JOIN carros c ON p.rg = c.proprietario_rg
GROUP BY p.nome;

-- Voltando agora a trabalhar com as tabelas já feitas anteriormente:
-- Para se certificar de ter essas tabelas execute o comando SHOW TABLES; e depois os comandos SELECT * para cada uma delas.
SHOW TABLES;
SELECT * FROM cli;
SELECT * FROM pedido;

-- Execute o comando
SELECT cli.nome,
       pedido.nr,
       pedido.valor
FROM pedido
INNER JOIN cli ON pedido.cliente = cli.codigo;

-- Exibir a quantidade e o valor total dos pedidos por cliente:
SELECT c.nome         AS Cliente,
       COUNT(p.valor) AS Quantidade,
       SUM(p.valor)   AS Total
FROM cli c
LEFT JOIN pedido p ON c.codigo = p.cliente
GROUP BY c.nome
ORDER BY c.nome;

-- Criar três tabelas no banco de dados: funcionarios, pagamentos e descontos.
CREATE TABLE funcionarios(
  codigo_funcionario INT,
  nome               VARCHAR(50)
);

CREATE TABLE pagamentos(
  codigo_pagto       INT,
  codigo_funcionario INT,
  valor              DECIMAL(10,2)
);

CREATE TABLE descontos(
  codigo_desconto    INT,
  codigo_funcionario INT,
  valor              DECIMAL(10,2)
);

INSERT INTO funcionarios VALUES(1, "Luis");
INSERT INTO funcionarios VALUES(2, "Marina");
INSERT INTO funcionarios VALUES(3, "Letícia");
INSERT INTO funcionarios VALUES(4, "Gustavo");
INSERT INTO funcionarios VALUES(5, "Mateus");

INSERT INTO pagamentos VALUES(1, 1, 100);
INSERT INTO pagamentos VALUES(2, 1, 200);
INSERT INTO pagamentos VALUES(3, 3, 300);
INSERT INTO pagamentos VALUES(4, 5, 400);
INSERT INTO pagamentos VALUES(5, 5, 500);

INSERT INTO descontos VALUES(1, 1, 50);
INSERT INTO descontos VALUES(2, 2, 20);
INSERT INTO descontos VALUES(3, 5, 30);


-- Exemplo de INNER JOIN (slide 53)
SELECT f.nome  AS Funcionário,
       p.valor AS Pagamento
FROM funcionarios f
INNER JOIN pagamentos p ON f.codigo_funcionario = p.codigo_funcionario;

-- INNER JOIN com três tabelas (slide 54)
SELECT f.nome  AS Funcionário,
       p.valor AS Pagamento,
       d.valor AS Desconto
FROM funcionarios f
INNER JOIN pagamentos p ON f.codigo_funcionario = p.codigo_funcionario
INNER JOIN descontos d ON f.codigo_funcionario = d.codigo_funcionario;

-- Exemplo de LEFT JOIN (slide 55)
SELECT f.nome  AS Funcionário,
       p.valor AS Pagamento
FROM funcionarios f
LEFT JOIN pagamentos p ON f.codigo_funcionario = p.codigo_funcionario;

-- Incluindo o desconto
SELECT f.nome  AS Funcionário,
       p.valor AS Pagamento,
       d.valor AS Desconto
FROM funcionarios f
LEFT JOIN pagamentos p ON f.codigo_funcionario = p.codigo_funcionario
LEFT JOIN descontos d ON f.codigo_funcionario = d.codigo_funcionario;

-- Fazendo “perguntas” ao MySQL
SELECT VERSION(); 
SELECT CURRENT_DATE;
SELECT USER();
SELECT NOW(); 

SELECT VERSION(), CURRENT_DATE;

-- Extras
SELECT 2+2;

SELECT PI();

SELECT COS(PI());

SELECT COS(PI()/2);

SELECT COS(PI())/2;

SELECT ROUND(PI(),2); 

SELECT ROUND(PI(),10);

SELECT SQRT(9);

SELECT ABS(-2);

SELECT MOD(5,2);

SELECT POWER(3,2);

SELECT CONCAT('My', 'S', 'QL');

SELECT CONCAT_WS("-", "Uni SENAC", "Campus", "Pelotas"); 

SELECT REPEAT('MySQL', 3); 

SELECT CHAR_LENGTH("Uni SENAC"); 

-- MySQL – Função SUBSTRING()
SELECT SUBSTRING("www.senacrs.com.br", 5,7);

SELECT SUBSTRING("www.senacrs.com.br", 5);

SELECT SUBSTRING("www.senacrs.com.br", -5);

SELECT SUBSTRING("www.senacrs.com.br", -10,6);

SELECT SUBSTRING("www.senacrs.com.br" FROM 5 FOR 7);

SELECT SUBSTRING("www.senacrs.com.br", 5,7);

SELECT SUBSTRING_INDEX('www.mysql.com', '.', 2);

SELECT SUBSTRING_INDEX('www.mysql.com', '.', -22);

-- Funções String
SELECT REVERSE('abc'); 

SELECT UCASE('Paulo'); 

SELECT UPPER('Paulo'); 

SELECT LCASE('MYSQL');

SELECT LOWER('MYSQL');

-- Funções Data
SELECT DAYOFWEEK ("2024-05-27"); 

SELECT WEEKDAY("2024-05-27"); 

SELECT DAYOFMONTH ("2024-05-27"); 

SELECT MONTH ("2024-05-27"); 

SELECT DAYNAME("2024-05-27");  

SELECT MONTHNAME("2024-05-27");

-- Exercícios – Parte 1

CREATE TABLE empregado (
  codigo INT(11) AUTO_INCREMENT,
  nome   CHAR(40),
  setor  CHAR(2),
  cargo  CHAR(20),
  salario DECIMAL(10,2),
  PRIMARY KEY (codigo)
);

INSERT INTO empregado VALUES (1,'Cleide Campos','1','Secretária',1000);
INSERT INTO empregado VALUES (3,'Andreia Batista','6','Programadora',1500);
INSERT INTO empregado VALUES (4,'Cristiano Souza','6','Programador',1500);
INSERT INTO empregado VALUES (6,'Mario Souza','4','Analista',2200);
INSERT INTO empregado VALUES (7,'Ana Silva','4', 'Secretária',1000);
INSERT INTO empregado VALUES (9,'Silvia Moraes','5','Supervisora',1650);
INSERT INTO empregado VALUES (10,'José da Silva','1','Programador',1500);
INSERT INTO empregado VALUES (15,'Manoel Batista','1','Projetista',2500);
INSERT INTO empregado VALUES (25,'João Silva','4','Supervisor',1650);

SELECT * FROM empregado;

-- Exercícios – Parte 3
-- 1. Apresentar a listagem completa dos registros da tabela empregado;
-- 2. Apresentar uma listagem dos nomes e dos cargos de todos os registros da tabela empregado;
-- 3. Apresentar uma listagem dos nomes dos empregados do setor 1
-- 4. Listagem dos nomes e dos salários por ordem de nome (A-Z)
-- 5. Listagem dos nomes e dos salários por ordem de nome em formato descendente (Z-A)
-- 6. Listagem dos setores e nomes colocados por ordem do campo setor em formato ascendente e do campo nome em formato descendente.
SELECT setor, nome
FROM empregado
ORDER BY setor, nome DESC;

-- 7. Listagem de nomes ordenados pelo campo nome em formato ascendente, dos empregados do setor 4.

-- Exercícios – Parte 4
-- 1. O empregado de código 7 teve um aumento de salário para 2500,50.
-- 2. Andreia Batista foi transferida do departamento 5 para o departamento 3.
-- 3. Todos os empregados da empresa tiveram um aumento de salário de 20%.
-- 4. Todos os empregados do setor 1 foram demitidos , exclua-os.
-- 5. Mario Souza pediu demissão, exclua-o.

-- Exercícios – Parte 5
-- 1. Apresentar nome e salário dos empregados que ganham acima de 1700.00. 
-- 2. Listar os empregados do setor 5.
-- 3. Listar os empregados cujo cargo é programador.
-- 4. Listar empregados com salário até 2000,00.

-- Exercícios – Parte 6
-- 1. Listar programadores do setor 2.
-- 2. Listar empregados que sejam supervisor ou supervisora.
-- 3. Listar empregados que não sejam gerentes.

-- Exercícios – Parte 7
-- 1. Listar empregados cujo nome comece com a letra A
-- 2. Listar empregados cujo nome tem a segunda letra A
-- 3. Listar empregados que tem a sequência AN em qualquer posição do nome.

-- Exercícios – Parte 8
-- 1. Média aritmética dos salários de todos os empregados
-- 2. Média aritmética dos salários de todos os empregados do setor 3
-- 3. Soma dos salários de todos os empregados
-- 4. Soma dos salários de todos os empregados do setor 5
-- 5. Maior salário existente entre todos os empregados
-- 6. Menor salário existente entre todos os empregados
-- 7. Número de empregados do setor 3
-- 8. Número de empregados que ganham mais que 2000,00
-- 9. Número de setores existentes no cadastro de empregados.

