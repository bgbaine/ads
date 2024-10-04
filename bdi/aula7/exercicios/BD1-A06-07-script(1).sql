
-- Exercícios

DROP DATABASE IF EXISTS aula06b;
CREATE DATABASE IF NOT EXISTS aula06b;
USE aula06b;

CREATE TABLE departamento (
     codigo   INT(11),
     nome     VARCHAR(45) NOT NULL,
     telefone VARCHAR(15),
     PRIMARY KEY (codigo)
);

CREATE TABLE empregado (
     matricula     INT(11),
     nome          VARCHAR(45) NOT NULL,
     endereco      VARCHAR(100),
     salario       DECIMAL(10, 2),
     matsupervisor INT(11),
     coddep        INT(11) NOT NULL,
     PRIMARY KEY (matricula),
     FOREIGN KEY (coddep) REFERENCES departamento (codigo),
     FOREIGN KEY (matsupervisor) REFERENCES empregado (matricula)
);

CREATE TABLE projeto(
     codigo INT(11),
     nome   VARCHAR(45) NOT NULL,
     local  VARCHAR(100),
     coddep INT(11) NOT NULL,
     PRIMARY KEY (codigo),
     FOREIGN KEY (coddep) REFERENCES departamento (codigo)
);

CREATE TABLE alocacao(
     matemp  INT(11),
     codproj INT(11),
     horas   INT(11),
     PRIMARY KEY (matemp, codproj),
     FOREIGN KEY (matemp) REFERENCES empregado (matricula),
     FOREIGN KEY (codproj) REFERENCES projeto (codigo)
);

CREATE TABLE dependente (
     id     INT(11),
     matemp INT(11),
     nome   VARCHAR(45) NOT NULL,
     datan  DATE,
     PRIMARY KEY (id),
     FOREIGN KEY (matemp) REFERENCES empregado (matricula)
); 

-- Cadastre pelo menos 10 departamentos (com códigos de 1 até 10);
INSERT INTO departamento (codigo, nome, telefone) 
VALUES 
(1, 'RH', '321'),
(2, 'Compras', '123'),
(3, 'Transportes', '456'),
(4, 'Marketing', '654'),
(5, 'Vendas', '789'),
(6, 'Financeiro', '987'),
(7, 'Estoque', '234'),
(8, 'Saúde', '432'),
(9, 'Controladoria Geral', '345'),
(10, 'Ouvidoria', '543');

-- Cadastre empregados com salario menor do que 5.000, igual a 5.000 e maior do que 5.000;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (800, 'Josivaldo Antunes Nunes', 'Rua das flores', 4000, NULL, 1);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (900, 'Marzivania Alves Breda', 'Rua das urtigas', 4500, NULL, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (835, 'Plinio Cabresto Selvagem', 'Av Sallus', 5000, 900, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (836, 'Ortega Raimundo Gomes', 'Av Marlua', 5600, 900, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (837, 'Solange Costa Ortiz', 'Rua Zanzibar', 8000, 835, 3);

-- Cadastre pelo menos três funcionários com salário entre 1.700 e 2.800
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (841, 'Monange Costa Ortiz', 'Rua Zanzibar', 1700, NULL, 4);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (842, 'Rosange Costa Ortiz', 'Rua Zanzibar', 1750, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (843, 'Violange Costa Ortiz', 'Rua Zanzibar', 2700, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (844, 'Sustange Costa Ortiz', 'Rua Zanzibar', 2800, 843, 6);

-- Cadastre dois funcionários no departamento 1;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (845, 'Zuleiva Maciel Souza', 'Rua Troll', 8050, NULL, 1);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (846, 'Panceta Furunculo Anacleto', 'Rua Dores', 18050, 844, 1);

-- Cadastre pelo menos três funcionários no departamento 2;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (847, 'Marciano das Antenas Verdes', 'Rua Marte', 1050, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (848, 'Etevaldo Agusto Moraes', 'Rua Venus', 2050, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (849, 'Lucrecio Borges Almeida', 'Rua Jupiter', 8049, 847, 2);

-- Cadastre 3 funcionários no departamento 5;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (947, 'Zorzicleto Bicicleteiro', 'Rua Marte', 2050, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (948, 'Pedregusto Mars', 'Rua Venus', 3050, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) 
VALUES (949, 'Laurinda Linda Lindeza', 'Rua Jupiter', 5049, 847, 5);

-- Cadastre alguns dependentes com data de nascimento igual a 27/10/2002;
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (1, 949, 'Laurindinha Lindeza', '2002-10-27');
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (2, 949, 'Laurindinho Lindeza', '2002-10-27');
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (3, 947, 'Bikemotor Yamaha', '2002-10-27');

-- Cadastre alguns dependentes com data de nascimento posterior a 27/10/2002;
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (4, 843, 'Pringles Doritos de Queijo', '2002-10-28');
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (5, 848, 'Fanta Uva de Avila', '2004-11-27');
INSERT INTO dependente (id, matemp, nome, datan) 
VALUES (6, 948, 'Setembrino Dorvalino', '2012-12-26');


-- 01. Apresentar a listagem completa dos registros da tabela empregado;
SELECT * 
FROM empregado;

/* 02. Apresentar uma listagem dos nomes e salários dos empregados 
com salario maior do que 5.000;*/
SELECT nome, salario
FROM empregado
WHERE salario > 5000;

/* 03. Listar os nomes e os salários dos empregados 
em ordem alfabética, decrescente, de nome; */
SELECT nome, salario
FROM empregado
ORDER BY nome DESC;

-- 04. Listar os nomes dos empregados do departamento 5 ordenados pelo endereço;
SELECT nome
FROM empregado
WHERE coddep = 5
ORDER BY endereco;

-- 05. Alterar para 2500,50 o salário dos empregados do departamento 2;
UPDATE empregado
SET salario = 2500.50
WHERE coddep = 2;

-- 06. Aumentar em 20% o salário de todos os empregados;
UPDATE empregado
-- SET salario = salario + (salario * 20)/100;
SET salario = salario * 1.2;

-- 07. Excluir todos os empregados do departamento 1;
DELETE FROM empregado
WHERE coddep = 1;

-- 08. Apresente a listagem dos dependentes que nasceram em 27/10/2002;
SELECT *
FROM dependente
WHERE datan = '2002-10-27';

-- 09. Apresente a listagem dos dependentes que nasceram após 27/10/2002;
SELECT *
FROM dependente
WHERE datan > '2002-10-27';

-- 10. Listar os empregados do departamento 5;
SELECT *
FROM empregado
WHERE coddep = 5;

-- 11. Listar empregados com salário até 5000,00;
SELECT *
FROM empregado
WHERE salario <= 5000;

-- 12. Listar empregados com salário entre 1700,00 e 2800,00.
SELECT *
FROM empregado
WHERE salario >= 1700 AND salario <= 2800;
