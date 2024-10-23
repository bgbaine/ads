DROP DATABASE IF EXISTS aula11;
CREATE DATABASE aula11;
USE aula11;

CREATE TABLE drinks
(
    preco DECIMAL(9,2),
    nome VARCHAR(40)
);

DESC drinks;

ALTER TABLE drinks
ADD COLUMN id INT FIRST,
ADD PRIMARY KEY (id);

DESC drinks;

ALTER TABLE drinks
ADD COLUMN nota INT NOT NULL AFTER preco;

DESC drinks;

SHOW TABLES;

ALTER TABLE drinks
RENAME TO bebidas;

SHOW TABLES;

DESC bebidas;

ALTER TABLE bebidas
CHANGE COLUMN nome descricao VARCHAR(50) NOT NULL;

DESC bebidas;

ALTER TABLE bebidas
MODIFY COLUMN descricao VARCHAR(100);

DESC bebidas;

ALTER TABLE bebidas
DROP COLUMN nota;

DESC bebidas;

ALTER TABLE bebidas
DROP PRIMARY KEY;

DESC bebidas;
