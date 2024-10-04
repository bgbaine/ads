DROP TABLE IF EXISTS exemplo;
CREATE DATABASE IF NOT EXISTS exemplo;

USE exemplo;

CREATE TABLE aluno (
    id INT,
    nome VARCHAR(100),
    emaill VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE clientes (
    codigo INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone CHAR(20),
    cidade VARCHAR(100),
    PRIMARY KEY (codigo)
);

SHOW TABLES;

DESC clientes;

INSERT INTO clientes (nome, email, telefone, cidade)
VALUES ('Clarinda Nunes', 'clarinda.nunes@email.com', '567-1234', 'Pelotas');

CREATE TABLE IF NOT EXISTS PRODUTOS (
    codigo INT AUTO_INCREMENT,
    nome VARCHAR(100),
    preco DECIMAL(10,2),
    PRIMARY KEY (codigo)
);

INSERT INTO clientes (nome, email, telefone, cidade)
VALUES
    ('Maria Silva', 'maria.silva@email.com', '567-1234', 'Pelotas'),
    ('João Santos', 'joao.santos@email.com', '567-5678', 'Chuí'),
    ('Bruce Wayne', 'bruce.wayne@email.com', '567-5678', 'Arroio Grande'),
    ('Clark Kent', 'clark.kent@email.com', '567-5678', 'Porto Alegre'),
    ('Peter Parker', 'peter.parker@email.com', '567-5678', 'Pelotas'),
    ('Diana Prince', 'diana.prince@email.com', '567-5678', 'Jaguarão'),
    ('Tony Stark', 'tony.stark@email.com', '567-5678', 'Herval'),
    ('Barry Allen', 'barry.allen@email.com', '567-5678', 'Morro Redondo'),
    ('Hal Jordan', 'hal.jordan@email.com', '567-5678', 'Capão do Leão'),
    ('Fred Flintstone', 'fred.flintstone@email.com', '567-5678', 'Chuí'),
    ('Bruce Banner', 'bruce.banner@email.com', '567-5678', 'Pelotas'),
    ('Ana Costa', 'ana.costa@email.com', '567-9876', 'Arroio Grande');

INSERT INTO produtos (nome, preco)
VALUES
    ('Notebook Acer Aspire 5', 3500.00),
    ('Mouse Logitech MX Master 3', NULL),
    ('Monitor Samsung 24"', 899.99),
    ('Teclado Mecânico Razer BlackWidow'
    , 600.00),
    ('Fone de Ouvido Sony WH-1000XM4', 1500.00),
    ('SSD Kingston A400 480GB', 350.00),
    ('Smartphone Samsung Galaxy S21', NULL),
    (NULL, 1200.00),
    ('Impressora Multifuncional HP DeskJet'
    , 500.00),
    ('Placa de Vídeo NVIDIA RTX 3070', 4500.00);

SELECT * FROM produtos;

SELECT * FROM clientes
LIMIT 5;

SELECT * FROM clientes
LIMIT 5 OFFSET 10;

SELECT * FROM clientes
ORDER BY nome;

SELECT * FROM clientes
ORDER BY nome DESC;

SELECT * FROM clientes WHERE cidade = 'Pelotas' AND telefone IS NOT NULL;

SELECT COUNT(*) FROM clientes;

SELECT COUNT(name) FROM clientes;

SELECT SUM(preco) FROM produtos;

SELECT 
    MAX(preco) AS preco_max, 
    MIN(preco) AS preco_min, 
    AVG(preco) AS preco_medio 
FROM
    produtos;

UPDATE clientes
SET email = 'novo.email@email.com'
WHERE codigo = 1;

UPDATE clientes
SET telefone = '567-5678'
WHERE cidade = 'Pelotas';

DELETE FROM clientes
WHERE codigo = 1;

DELETE FROM clientes
WHERE cidade = 'Pelotas';
