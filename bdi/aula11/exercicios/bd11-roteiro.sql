DROP DATABASE IF EXISTS aula11;

CREATE DATABASE aula11;

USE aula11;

-- Exercício 2

CREATE TABLE veiculo (
    cor VARCHAR(15),
    ano VARCHAR(4),
    fabricante VARCHAR(20),
    mod_ VARCHAR(20),
    valordecusto DECIMAL(9, 2)
);

INSERT INTO
    veiculo
VALUES
    ('Prata', '1998', 'Porshe', 'Boxter', 17992.54),
    (NULL, '2000', 'Jaguar', 'XJ', 15995.00),
    (
        'VERMELHO',
        '2002',
        'Cadillac',
        'Escalade',
        40215.90
    );

-- Exercício 3

DESC veiculo;

ALTER TABLE
    veiculo
ADD
    COLUMN id INT AUTO_INCREMENT PRIMARY KEY FIRST;

ALTER TABLE
    veiculo
ADD
    COLUMN chassi VARCHAR(20)
AFTER
    id;

DESC veiculo;

UPDATE
    veiculo
SET
    chassi = 'RNKLK66N33G213481'
WHERE
    id = 1;

UPDATE
    veiculo
SET
    chassi = 'SAEDA44B175B04113'
WHERE
    id = 2;

UPDATE
    veiculo
SET
    chassi = '3GYEK63NT2G280668'
WHERE
    id = 3;

SELECT
    *
FROM
    veiculo;

DESC veiculo;

ALTER TABLE
    veiculo CHANGE COLUMN mod_ modelo VARCHAR(20);

ALTER TABLE
    veiculo CHANGE COLUMN valordecusto valor DECIMAL(9, 2);

DESC veiculo;

ALTER TABLE
    veiculo MODIFY COLUMN cor VARCHAR(15) AFTER modelo;

ALTER TABLE
    veiculo MODIFY COLUMN ano VARCHAR(4) AFTER cor;

SELECT * FROM veiculo;
DESC veiculo;

-- Exercício 4

DESC veiculo;

ALTER TABLE
    veiculo MODIFY COLUMN fabricante VARCHAR(50) AFTER valor;

-- Exercicio 5

CREATE TABLE dono (
    cpf         VARCHAR(11),
    nome        VARCHAR(45),
    telefone    VARCHAR(20),
    cidade      VARCHAR(45)
);

-- Exercicio 6

INSERT INTO
    dono
VALUES
    ('42872865438', 'Lucinda Pleiades', '11987721233', 'Bauru'),
    ('32912865454', 'Ortega Batavo', '53987721264', 'Pelotas'),
    ('88862865476', 'Plinio Souza', '53987721264', 'Camaquã');

SELECT
    *
FROM
    dono;

-- Exercicio 7

DESC dono;

ALTER TABLE dono
    ADD COLUMN id_dono INT AUTO_INCREMENT PRIMARY KEY FIRST;

DESC dono;

-- Exercicio 8

RENAME TABLE dono TO pessoa;

SHOW TABLES;

-- Exercicio 9

DELETE FROM pessoa;

SELECT * FROM pessoa;

-- Exercicio 10

INSERT INTO
    pessoa
VALUES
    (1, '42872865438', 'Lucinda Pleiades', '11987721233', 'Bauru'),
    (2, '32912865454', 'Ortega Batavo', '53987721264', 'Pelotas'),
    (3, '88862865476', 'Plinio Souza', '53987721264', 'Camaquã');

SELECT * FROM pessoa;

-- Exercicio 11

DESC pessoa;

ALTER TABLE pessoa
    ADD COLUMN id_veiculo INT;

DESC pessoa;

SELECT * FROM pessoa;

INSERT INTO
    pessoa
VALUES
    (4, '45861165421 ', 'Tamara Dutra', '53982921218 ', 'Cristal', 3),
    (5, '68861265432 ', 'Maigui Aochi', '11984321521 ', 'Cuiabá', 1),
    (6, '90861865477 ', 'Joselangelo Paz', '11984321521 ', 'Chuy', 2);

SELECT * FROM pessoa;
