-- Usar o banco de dados
USE aula10;

/* 2a: Listar o nome e o telefone dos clientes, 
ordenados alfabeticamente de forma decrescente pelo nome. */
SELECT nome, telefone
FROM cliente
ORDER BY nome DESC;

/* 2b: Listar a descrição, o valor e a quantidade em estoque 
dos produtos cujo valor seja superior a 15. */
SELECT descricao, valor, quantidade_estoque 
FROM produto
WHERE valor > 15;

/* 2c: Listar todos os campos das vendas realizadas 
no dia 2 de abril de 2024. */
SELECT *
FROM venda
WHERE data = "2024-04-02";

/* 2d: Listar o código, a descrição e o valor dos produtos 
que estão com o estoque zerado. */
SELECT codigo, descricao, valor
FROM produto
WHERE quantidade_estoque = 0;

/* 2e: Listar, em ordem alfabética crescente pela descrição, 
o código, a descrição e a quantidade em estoque dos produtos 
com valor igual ou inferior a 15. */
SELECT codigo, descricao, quantidade_estoque
FROM produto
WHERE quantidade_estoque <= 15
ORDER BY descricao ASC;

