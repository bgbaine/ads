DROP SCHEMA IF EXISTS aula16;
CREATE SCHEMA aula16;
USE aula16;

-- -----------------------------------------------------
-- Tabela PRODUTO
-- Descrição: Armazena informações sobre os produtos.
-- -----------------------------------------------------
CREATE TABLE produto (
  codigo     INT NOT NULL,
  descricao  VARCHAR(50) NOT NULL,
  qtdEstoque DECIMAL(10,2),
  precoVenda DECIMAL(10,2),
  PRIMARY KEY (codigo)
);

-- -----------------------------------------------------
-- Tabela CIDADE
-- Descrição: Armazena informações sobre as cidades.
-- -----------------------------------------------------
CREATE TABLE cidade (
  id   INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- -----------------------------------------------------
-- Tabela CLIENTE
-- Descrição: Armazena informações sobre os clientes.
-- -----------------------------------------------------
CREATE TABLE cliente (
  codigo    INT NOT NULL,
  cidade_id INT NOT NULL,
  nome      VARCHAR(100) NOT NULL,
  email     VARCHAR(255),
  PRIMARY KEY (codigo),
  FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

-- -----------------------------------------------------
-- Tabela PEDIDO
-- Descrição: Armazena informações sobre os pedidos.
-- -----------------------------------------------------
CREATE TABLE pedido (
  numero         INT NOT NULL,
  cliente_codigo INT NOT NULL,
  dataHora       DATETIME NOT NULL,
  status         CHAR(2),
  PRIMARY KEY (numero),
  FOREIGN KEY (cliente_codigo) REFERENCES cliente (codigo)
);

/* 
Status de pedidos:
AP - Aguardando pagamento
PC - Pagamento confirmado
EA - Em andamento
PE - Pronto para ser enviado
ET - Entregue a transportadora
EN - Entregue
CC - Cancelado
PN - Pagamento não realizado
DV - Devolvido
*/

-- -----------------------------------------------------
-- Tabela PEDIDO_PRODUTO
-- Descrição: Relaciona produtos a pedidos.
-- -----------------------------------------------------
CREATE TABLE pedido_produto (
  pedido_numero  INT NOT NULL,
  produto_codigo INT NOT NULL,
  quantidade     DECIMAL(10,2) NOT NULL,
  precoVendido   DECIMAL(10,2),
  PRIMARY KEY (pedido_numero, produto_codigo),
  FOREIGN KEY (pedido_numero) REFERENCES pedido (numero), 
  FOREIGN KEY (produto_codigo) REFERENCES produto (codigo)
);

/* Importação */

-- Cidade
LOAD DATA LOCAL INFILE 'c:/temp/BD1-A16-cidade.csv'
INTO TABLE cidade
FIELDS TERMINATED BY ',' 
ENCLOSED BY "'"
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;


SELECT * FROM cidade;

-- Cliente
LOAD DATA LOCAL INFILE 'c:/temp/BD1-A16-cliente.csv'
INTO TABLE cliente
FIELDS TERMINATED BY ',' 
ENCLOSED BY "'"
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

SELECT * FROM cliente;

-- Pedido
LOAD DATA LOCAL INFILE 'c:/temp/BD1-A16-pedido.csv'
INTO TABLE pedido
FIELDS TERMINATED BY ',' 
ENCLOSED BY "'"
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- Produto
LOAD DATA LOCAL INFILE 'c:/temp/BD1-A16-produto.csv'
INTO TABLE produto
FIELDS TERMINATED BY ',' 
ENCLOSED BY "'"
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- Pedido_Produto
LOAD DATA LOCAL INFILE 'c:/temp/BD1-A16-pedido_produto.csv'
INTO TABLE pedido_produto
FIELDS TERMINATED BY ',' 
ENCLOSED BY "'"
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;


/* Gere um script para: */

/* 1 - Listar código de cliente, nome de cliente, número do pedido, data do pedido, 
status do pedido, filtre somente pedidos  AP e PC. 
A consulta deve ser exibida em ordem decrescente de data (a data mais recente primeiro) 
+--------+--------------------+--------+---------------------+--------+
| codigo | nome               | numero | dataHora            | status |
+--------+--------------------+--------+---------------------+--------+
|    102 | Maria Santos       |    308 | 2024-06-06 11:45:00 | PC     |
|    108 | Valentina Martínez |    316 | 2024-06-06 11:45:00 | PC     |
|    107 | Diego Rodríguez    |    307 | 2024-06-06 11:00:00 | AP     |
|    107 | Diego Rodríguez    |    315 | 2024-06-06 11:00:00 | AP     |
|    101 | Carlos Silva       |    302 | 2024-06-05 11:15:00 | PC     |
|    116 | Mia Johnson        |    310 | 2024-06-05 11:15:00 | PC     |
|    101 | Carlos Silva       |    301 | 2024-06-05 10:30:00 | AP     |
|    101 | Carlos Silva       |    309 | 2024-06-05 10:30:00 | AP     |
+--------+--------------------+--------+---------------------+--------+
8 rows in set (0.00 sec) */

/* 2 - Listar o nome do cliente, nome da cidade e status do pedido 
para todos os pedidos feitos pela cidade de "Pelotas". 
Ordene os resultados por status do pedido em ordem alfabética. 
+--------------+---------+--------+
| nome         | nome    | status |
+--------------+---------+--------+
| Carlos Silva | Pelotas | AP     |
| Carlos Silva | Pelotas | AP     |
| Carlos Silva | Pelotas | EA     |
| Carlos Silva | Pelotas | PC     |
+--------------+---------+--------+
4 rows in set (0.00 sec) */

/* 3 - Exibir o número do pedido, nome do cliente e descrição do produto 
para todos os produtos que foram pedidos. 
Filtre apenas os produtos que tenham sido pedidos 
e ordene os resultados por número do pedido em ordem decrescente. 
+---------------+--------------------+-----------------------------+
| pedido_numero | nome               | descricao                   |
+---------------+--------------------+-----------------------------+
|           316 | Valentina Martínez | Mochila Estampada           |
|           315 | Diego Rodríguez    | Boné de Abacaxi             |
|           314 | Sofía López        | Bolsa Elegante              |
|           313 | Luis García        | Boné de Abacaxi             |
|           312 | Ana Hernández      | Bolsa Elegante              |
|           311 | Pedro Gómez        | Relógio de Pulso do Faustão |
|           310 | Mia Johnson        | Sapato Casual               |
|           309 | Carlos Silva       | Short Esportivo             |
|           308 | Maria Santos       | Óculos de Sol Estiloso      |
|           307 | Diego Rodríguez    | Camiseta Estampada          |
|           307 | Diego Rodríguez    | Calça Jeans Slim            |
|           307 | Diego Rodríguez    | Tênis Esportivo             |
|           306 | Sofía López        | Mochila Estampada           |
|           305 | Carlos Silva       | Boné de Abacaxi             |
|           304 | Ana Hernández      | Bolsa Elegante              |
|           303 | Pedro Gómez        | Sapato Casual               |
|           303 | Pedro Gómez        | Relógio de Pulso do Faustão |
|           302 | Carlos Silva       | Tênis Esportivo             |
|           302 | Carlos Silva       | Óculos de Sol Estiloso      |
|           302 | Carlos Silva       | Mochila Estampada           |
|           301 | Carlos Silva       | Calça Jeans Slim            |
|           301 | Carlos Silva       | Bolsa Elegante              |
+---------------+--------------------+-----------------------------+
22 rows in set (0.00 sec) */

/* 4 - Apresentar o nome do cliente, 
email e data do pedido para todos os pedidos com status "EA" (Em andamento). 
Ordene os resultados por data do pedido em ordem crescente. 
+--------------+------------------------+---------------------+
| nome         | email                  | dataHora            |
+--------------+------------------------+---------------------+
| Pedro Gómez  | pedro.gomez@email.com  | 2024-06-05 12:00:00 |
| Pedro Gómez  | pedro.gomez@email.com  | 2024-06-05 12:00:00 |
| Carlos Silva | carlos.silva@email.com | 2024-06-06 09:30:00 |
| Luis García  | luis.garcia@email.com  | 2024-06-06 09:30:00 |
+--------------+------------------------+---------------------+
4 rows in set (0.00 sec) */

/* 5 - Listar o nome do cliente, nome da cidade e status do pedido 
para todos os pedidos feitos por clientes que tenham "Silva" no nome. 
Ordene os resultados por nome do cliente em ordem alfabética. 
+--------------+---------+--------+
| nome         | nome    | status |
+--------------+---------+--------+
| Carlos Silva | Pelotas | AP     |
| Carlos Silva | Pelotas | PC     |
| Carlos Silva | Pelotas | EA     |
| Carlos Silva | Pelotas | AP     |
+--------------+---------+--------+
4 rows in set (0.00 sec) */

/* 6 - Exibira o número do pedido, descrição do produto, 
quantidade e preço de venda para todos os produtos que foram pedidos. 
Filtre apenas os produtos que tenham sido pedidos 
e ordene os resultados por número do pedido em ordem crescente. 
+--------------+-----------------------------+------------+------------+
| NumeroPedido | DescricaoProduto            | Quantidade | PrecoVenda |
+--------------+-----------------------------+------------+------------+
|          301 | Calça Jeans Slim            |       1.00 |      90.00 |
|          301 | Bolsa Elegante              |       2.00 |      30.00 |
|          302 | Tênis Esportivo             |       1.00 |     150.00 |
|          302 | Óculos de Sol Estiloso      |       2.00 |      70.00 |
|          302 | Mochila Estampada           |       3.00 |      40.00 |
|          303 | Sapato Casual               |       1.00 |     120.00 |
|          303 | Relógio de Pulso do Faustão |       2.00 |      80.00 |
|          304 | Bolsa Elegante              |       1.00 |      60.00 |
|          305 | Boné de Abacaxi             |       4.00 |      15.00 |
|          306 | Mochila Estampada           |       2.00 |      45.00 |
|          307 | Camiseta Estampada          |       2.00 |      30.00 |
|          307 | Calça Jeans Slim            |       1.00 |      90.00 |
|          307 | Tênis Esportivo             |       1.00 |     150.00 |
|          308 | Óculos de Sol Estiloso      |       2.00 |      70.00 |
|          309 | Short Esportivo             |       3.00 |      40.00 |
|          310 | Sapato Casual               |       1.00 |     120.00 |
|          311 | Relógio de Pulso do Faustão |       2.00 |      80.00 |
|          312 | Bolsa Elegante              |       1.00 |      60.00 |
|          313 | Boné de Abacaxi             |       4.00 |      15.00 |
|          314 | Bolsa Elegante              |       1.00 |      60.00 |
|          315 | Boné de Abacaxi             |       4.00 |      15.00 |
|          316 | Mochila Estampada           |       2.00 |      45.00 |
+--------------+-----------------------------+------------+------------+
22 rows in set (0.00 sec) */

/* 7 - Apresenter o nome do cliente, email e status do pedido 
para todos os pedidos com status "PC" (Pagamento confirmado). 
Ordene os resultados por nome do cliente em ordem alfabética. 
+--------------------+------------------------------+--------------+
| NomeCliente        | Email                        | StatusPedido |
+--------------------+------------------------------+--------------+
| Carlos Silva       | carlos.silva@email.com       | PC           |
| Maria Santos       | maria.santos@email.com       | PC           |
| Mia Johnson        | mia.johnson@email.com        | PC           |
| Valentina Martínez | valentina.martinez@email.com | PC           |
+--------------------+------------------------------+--------------+
4 rows in set (0.00 sec) */

/* 8 - Exibir número do pedido, nome do cliente e a quantidade de diferentes itens de cada pedido 
+---------------+--------------------+-------------------------------------------------+
| pedido_numero | nome               | COUNT(DISTINCT (pedido_produto.produto_codigo)) |
+---------------+--------------------+-------------------------------------------------+
|           301 | Carlos Silva       |                                               2 |
|           302 | Carlos Silva       |                                               3 |
|           303 | Pedro Gómez        |                                               2 |
|           304 | Ana Hernández      |                                               1 |
|           305 | Carlos Silva       |                                               1 |
|           306 | Sofía López        |                                               1 |
|           307 | Diego Rodríguez    |                                               3 |
|           308 | Maria Santos       |                                               1 |
|           309 | Carlos Silva       |                                               1 |
|           310 | Mia Johnson        |                                               1 |
|           311 | Pedro Gómez        |                                               1 |
|           312 | Ana Hernández      |                                               1 |
|           313 | Luis García        |                                               1 |
|           314 | Sofía López        |                                               1 |
|           315 | Diego Rodríguez    |                                               1 |
|           316 | Valentina Martínez |                                               1 |
+---------------+--------------------+-------------------------------------------------+
16 rows in set (0.00 sec) */

/* 9 - Exibir número do pedido, nome do cliente e a quantidade total itens de cada pedido 
+---------------+--------------------+--------------------------------+
| pedido_numero | nome               | SUM(pedido_produto.quantidade) |
+---------------+--------------------+--------------------------------+
|           301 | Carlos Silva       |                           3.00 |
|           302 | Carlos Silva       |                           6.00 |
|           303 | Pedro Gómez        |                           3.00 |
|           304 | Ana Hernández      |                           1.00 |
|           305 | Carlos Silva       |                           4.00 |
|           306 | Sofía López        |                           2.00 |
|           307 | Diego Rodríguez    |                           4.00 |
|           308 | Maria Santos       |                           2.00 |
|           309 | Carlos Silva       |                           3.00 |
|           310 | Mia Johnson        |                           1.00 |
|           311 | Pedro Gómez        |                           2.00 |
|           312 | Ana Hernández      |                           1.00 |
|           313 | Luis García        |                           4.00 |
|           314 | Sofía López        |                           1.00 |
|           315 | Diego Rodríguez    |                           4.00 |
|           316 | Valentina Martínez |                           2.00 |
+---------------+--------------------+--------------------------------+
16 rows in set (0.00 sec) */

/* 10 - Exibir número do pedido, nome do cliente e o valor total de cada pedido 
+---------------+--------------------+------------------+
| pedido_numero | nome               | ValorTotalPedido |
+---------------+--------------------+------------------+
|           301 | Carlos Silva       |         150.0000 |
|           302 | Carlos Silva       |         410.0000 |
|           303 | Pedro Gómez        |         280.0000 |
|           304 | Ana Hernández      |          60.0000 |
|           305 | Carlos Silva       |          60.0000 |
|           306 | Sofía López        |          90.0000 |
|           307 | Diego Rodríguez    |         300.0000 |
|           308 | Maria Santos       |         140.0000 |
|           309 | Carlos Silva       |         120.0000 |
|           310 | Mia Johnson        |         120.0000 |
|           311 | Pedro Gómez        |         160.0000 |
|           312 | Ana Hernández      |          60.0000 |
|           313 | Luis García        |          60.0000 |
|           314 | Sofía López        |          60.0000 |
|           315 | Diego Rodríguez    |          60.0000 |
|           316 | Valentina Martínez |          90.0000 |
+---------------+--------------------+------------------+
16 rows in set (0.00 sec) */

/* 11 - Exibir o nome da cidade e a quantidade de pedidos por cidade 
+---------------+----------------------+
| nome          | COUNT(pedido.numero) |
+---------------+----------------------+
| Pelotas       |                    4 |
| Capão do Leão |                    2 |
| Herval        |                    2 |
| Chuy          |                    2 |
| Rio Grande    |                    2 |
| Arroio Grande |                    1 |
| Chuí          |                    1 |
| Porto Alegre  |                    1 |
| Santa Maria   |                    1 |
+---------------+----------------------+
9 rows in set (0.00 sec) */

/* 12 - Exibir o codigo do cliente, nome do cliente e a quantidade de pedidos por cliente 
+--------+--------------------+-------------------+
| codigo | nome               | QuantidadePedidos |
+--------+--------------------+-------------------+
|    101 | Carlos Silva       |                 4 |
|    102 | Maria Santos       |                 1 |
|    103 | Pedro Gómez        |                 2 |
|    104 | Ana Hernández      |                 2 |
|    105 | Luis García        |                 1 |
|    106 | Sofía López        |                 2 |
|    107 | Diego Rodríguez    |                 2 |
|    108 | Valentina Martínez |                 1 |
|    116 | Mia Johnson        |                 1 |
+--------+--------------------+-------------------+
9 rows in set (0.00 sec) */
