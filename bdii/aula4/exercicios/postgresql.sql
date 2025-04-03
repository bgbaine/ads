-- Tabela de produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100),
    estoque INT,
    PRIMARY KEY(id)
);

-- Tabela de vendas
CREATE TABLE vendas (
    id INT AUTO_INCREMENT,
    produto_id INT,
    quantidade INT,
    data_venda DATE,
    PRIMARY KEY(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

-- Inserindo produtos
INSERT INTO
    produtos (nome, estoque)
VALUES
    ('Mouse Gamer', 50),
    ('Teclado RGB', 30),
    ('Monitor 240Hz', 20);

-- Inserindo vendas
INSERT INTO
    vendas (produto_id, quantidade)
VALUES
    (1, 2),
    (2, 1);

DELIMITER $$
CREATE TRIGGER trg_vendas_AI
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
    UPDATE produtos
    SET estoque = estoque - NEW.quantidade
    WHERE id = NEW.produto_id;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_vendas_AD
AFTER DELETE ON vendas
FOR EACH ROW
BEGIN
    UPDATE produtos
    SET estoque = estoque + OLD.quantidade
    WHERE id = OLD.produto_id;
END$$
DELIMITER ;
