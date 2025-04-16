-- AULA06 - ROTEIRO / Revisão

-- STORED PROCEDURES
/*
Uma Stored Procedure é um bloco de comandos SQL armazenado no banco, reutilizável.

Vantagens:
- Reduz repetição de código
- Executa no lado do servidor
- Pode conter lógica condicional (IF, LOOP, ...)
*/

--MySQL:
DELIMITER $$
CREATE PROCEDURE exemplo_proc()
BEGIN
  SELECT 'UniSENAC MySQL!';
END$$
DELIMITER ;

CALL exemplo_proc();

-- PostgreSQL:
CREATE OR REPLACE PROCEDURE exemplo_proc()
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE NOTICE 'UniSENAC PostgreSQL!';
END;
$$;

CALL exemplo_proc();
*/

-- FUNÇÕES (FUNCTIONS)
-- Funções retornam um valor e podem ser chamadas dentro de SELECTs.

-- MySQL:
DELIMITER $$
CREATE FUNCTION soma_dobro(a INT, b INT) RETURNS INT
DETERMINISTIC
BEGIN
  RETURN (a + b) * 2;
END$$
DELIMITER ;

SELECT soma_dobro(3,4);

-- PostgreSQL:
CREATE OR REPLACE FUNCTION soma_dobro(a INT, b INT)
RETURNS INT AS $$
BEGIN
  RETURN (a + b) * 2;
END;
$$ LANGUAGE plpgsql;

SELECT soma_dobro(3,4);


-- DETERMINISTIC vs NOT DETERMINISTIC
/*
DETERMINISTIC → mesma entrada = mesmo resultado  
NOT DETERMINISTIC → resultado pode variar (NOW(), UUID(), etc.)

 MySQL exige indicar isso ao criar funções.
 PostgreSQL infere automaticamente.
*/

-- HAVING
/*
A cláusula HAVING é usada para filtrar os **grupos de dados** gerados após o uso do GROUP BY.

Diferença entre WHERE e HAVING:
- WHERE: filtra as **linhas individuais** antes da agregação (antes do GROUP BY).
- HAVING: filtra os **grupos agregados** após o GROUP BY.

Podemos usar juntas quando:
- Queremos filtrar linhas individuais antes do agrupamento (com WHERE),
- E também queremos aplicar filtros nos resultados agrupados (com HAVING).
*/

-- Exemplo: contar filmes por país, somente para os filmes de gênero 'Drama',
-- e exibir apenas os países com mais de 2 filmes desse gênero: 
SELECT p.nome AS pais, COUNT(*) AS qtd_filmes
FROM filme f
JOIN genero g ON f.idGenero = g.id
JOIN pais   p ON f.idPais   = p.id
WHERE g.nome = 'Drama'
GROUP BY p.nome
HAVING COUNT(*) > 2;
-- WHERE g.nome = 'Drama' -> seleciona apenas os filmes do gênero Drama antes da contagem.
-- GROUP BY p.nome -> agrupa os filmes por país de origem.
-- HAVING COUNT(*) > 2 -> exibe somente os países que têm mais de 2 filmes do gênero Drama.

-- CAST
-- Converte um valor de um tipo para outro.


-- Exemplos:

-- Converter data e hora em apenas data

-- MySQL:
SELECT CAST('2025-08-01 18:30:00' AS DATE) AS somente_data;

-- PostgreSQL:
SELECT '2025-08-01 18:30:00'::DATE AS somente_data;


-- Converter número para texto (útil em concatenação)

-- MySQL:
SELECT CONCAT('Valor: R$', CAST(valorIngresso AS CHAR)) AS valor_formatado
FROM venda;

-- PostgreSQL:
SELECT 'Valor: R$' || valorIngresso::TEXT AS valor_formatado
FROM venda;


-- Converter texto para número (útil em validações)

-- MySQL:
SELECT CAST('18.50' AS DECIMAL(5,2)) AS numero_convertido;

-- PostgreSQL:
SELECT '18.50'::NUMERIC AS numero_convertido;


-- Arredondar valor para inteiro (conversão de tipo decimal)

-- MySQL:
SELECT CAST(valorIngresso AS SIGNED) AS valor_inteiro
FROM venda;

-- PostgreSQL:
SELECT valorIngresso::INT AS valor_inteiro
FROM venda;


-- Converter hora para string (exibição formatada)

-- MySQL:
SELECT CAST(hora AS CHAR) AS hora_str
FROM venda
WHERE hora IS NOT NULL;

-- PostgreSQL:
SELECT hora::TEXT AS hora_str
FROM venda
WHERE hora IS NOT NULL;


/* Subconsulta com IN e EXISTS
Subconsultas (ou consultas aninhadas) permitem usar o resultado de uma consulta
dentro de outra, como critério de filtro ou cálculo.
Existem várias formas de aplicar subconsultas. Neste exemplo, o objetivo é listar
os nomes dos usuários que fizeram compras com valor de ingresso superior a R$20. */

-- Subconsulta com IN
/*A subconsulta com IN compara um valor (ou coluna) com o conjunto de valores
retornado por outra consulta.
Neste caso, vamos buscar os nomes dos usuários cujo ID aparece na subconsulta
que retorna os IDs dos usuários que realizaram compras com valorIngresso > 20.
Quando usar IN?
- Quando a subconsulta retorna uma lista simples (ex: uma lista de IDs).
- Funciona bem com conjuntos pequenos a médios.
A subconsulta interna retorna os IDs dos usuários com compras acima de R$20.
O SELECT externo busca os nomes cujos IDs coincidem com a lista retornada. */
SELECT nome 
FROM usuario
WHERE id IN (
  SELECT idUsuario 
  FROM venda 
  WHERE valorIngresso > 20
);

-- Subconsulta com EXISTS
/* A subconsulta com EXISTS testa a existência de registros que satisfaçam
determinada condição.
Aqui, para cada linha da tabela usuario, verificamos se existe pelo menos
uma venda com valor superior a R$20.
SELECT 1 é uma convenção: o que importa é se existe alguma linha correspondente,
não os dados retornados.
Quando usar EXISTS?
- Quando a subconsulta depende de dados da consulta externa (subconsulta correlacionada).
- Mais eficiente quando a subconsulta retorna muitos resultados.
- Lida melhor com valores NULL. */
SELECT nome 
FROM usuario u
WHERE EXISTS (
  SELECT 1 
  FROM venda v 
  WHERE v.idUsuario = u.id AND v.valorIngresso > 20
);

/* Tanto IN quanto EXISTS podem ser usados para resolver o mesmo tipo de problema.
A escolha entre eles pode depender do volume de dados e da estrutura dos índices.

Para bases pequenas: ambos funcionam bem.
Para bases grandes:
   - EXISTS tende a ser mais eficiente, principalmente com índices otimizados.
   - IN pode ser mais simples e legível para conjuntos curtos e fixos. */

-- SHOW CREATE TABLE (somente MySQL)
/* Este comando exibe a instrução completa usada para criar uma tabela,
incluindo colunas, tipos de dados, restrições (como PRIMARY KEY, FOREIGN KEY),
engine utilizada (ex: InnoDB, MyISAM), collation, e outras configurações.

É útil para:
- Verificar rapidamente a estrutura de uma tabela.
- Replicar a criação da tabela em outro banco.
- Documentar a estrutura original para comparação futura. */

-- Exemplo:
SHOW CREATE TABLE venda;
/* 
O resultáto será:

CREATE TABLE venda (
  id            INT NOT NULL AUTO_INCREMENT,
  idSessao      INT NOT NULL,
  idTipoPagto   INT NOT NULL,
  idUsuario     INT NOT NULL,
  data          DATE DEFAULT NULL,
  hora          TIME DEFAULT NULL,
  valorIngresso DOUBLE DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (idSessao) REFERENCES sessao (id),
  FOREIGN KEY (idTipoPagto) REFERENCES tipoPagto (id),
  FOREIGN KEY (idUsuario) REFERENCES usuario (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4; 
*/

-- OBS:
/* Esse comando "não existe no PostgreSQL".
No PostgreSQL, para obter o DDL de uma tabela, podemos usar:
- Ferramentas gráficas como pgAdmin, DBeaver ou TablePlus;
- Comando de terminal: pg_dump -s -t nome_tabela nome_banco;
- Consultas na information_schema ou pg_catalog. */


-- +-+-+-+-+-+-+-+

-- Bora criar um banquinho para exercitarmos!

-- MySQL
DROP DATABASE IF EXISTS aula06;
CREATE DATABASE aula06;
USE aula06;

-- PAIS
CREATE TABLE pais (
  id   INT AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- CIDADE
CREATE TABLE cidade (
  id   INT AUTO_INCREMENT, 
  nome VARCHAR(45) NULL, 
  uf   CHAR(2) NULL, 
  PRIMARY KEY (id)
);

-- CINEMA
CREATE TABLE cinema (
  id           INT AUTO_INCREMENT, 
  nomeFantasia VARCHAR(45) NOT NULL, 
  endereco     VARCHAR(45) NOT NULL, 
  bairro       VARCHAR(45) NOT NULL, 
  idCidade     INT NOT NULL, 
  capacidade   INT NOT NULL, 
  PRIMARY KEY (id),
  CONSTRAINT fk_cinema_cidade FOREIGN KEY (idCidade) REFERENCES cidade (id)
);

-- GENERO
CREATE TABLE genero (
  id   INT AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- ATOR (contém atores e diretores)
CREATE TABLE ator (
  id   INT AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- FILME
CREATE TABLE filme (
  id              INT AUTO_INCREMENT, 
  idGenero        INT NOT NULL, 
  idPais          INT NOT NULL, 
  idDiretor       INT NOT NULL, 
  tituloOriginal  VARCHAR(100) NOT NULL, 
  tituloPortugues VARCHAR(100) NULL, 
  duracao         INT NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_filme_genero FOREIGN KEY (idGenero) REFERENCES genero (id), 
  CONSTRAINT fk_filme_pais FOREIGN KEY (idPais) REFERENCES pais (id), 
  CONSTRAINT fk_filme_ator FOREIGN KEY (idDiretor) REFERENCES ator (id)
);

-- ELENCO
CREATE TABLE elenco (
  idFilme INT NOT NULL, 
  idAtor  INT NOT NULL, 
  PRIMARY KEY (idFilme, idAtor), 
  CONSTRAINT fk_elenco_filme FOREIGN KEY (idFilme) REFERENCES filme (id), 
  CONSTRAINT fk_elenco_ator FOREIGN KEY (idAtor) REFERENCES ator (id)
);

-- SESSAO
CREATE TABLE sessao (
  id         INT AUTO_INCREMENT, 
  idCinema   INT NOT NULL, 
  idFilme    INT NOT NULL, 
  data       DATE NOT NULL, 
  horaInicio TIME NOT NULL, 
  publico    INT NOT NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_sessao_cinema FOREIGN KEY (idCinema) REFERENCES cinema (id), 
  CONSTRAINT fk_sessao_filme FOREIGN KEY (idFilme) REFERENCES filme (id)
);

-- USUARIO
CREATE TABLE usuario (
  id       INT AUTO_INCREMENT, 
  idCidade INT NOT NULL, 
  nome     VARCHAR(45) NULL, 
  email    VARCHAR(100) NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_usuario_cidade FOREIGN KEY (idCidade) REFERENCES cidade (id)
);

-- TIPO PAGAMENTO
CREATE TABLE tipoPagto (
  id   INT AUTO_INCREMENT, 
  nome VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id)
);

-- VENDA
CREATE TABLE venda (
  id            INT AUTO_INCREMENT, 
  idSessao      INT NOT NULL, 
  idTipoPagto   INT NOT NULL, 
  idUsuario     INT NOT NULL, 
  data          DATE NULL, 
  hora          TIME NULL, 
  valorIngresso DECIMAL(10,2) NULL, 
  PRIMARY KEY (id), 
  CONSTRAINT fk_venda_sessao FOREIGN KEY (idSessao) REFERENCES sessao (id), 
  CONSTRAINT fk_venda_usuario FOREIGN KEY (idUsuario) REFERENCES usuario (id), 
  CONSTRAINT fk_venda_tipoPagto FOREIGN KEY (idTipoPagto) REFERENCES tipoPagto (id)
);

-- PARCELA
CREATE TABLE parcela (
  id         INT AUTO_INCREMENT, 
  idVenda    INT NOT NULL, 
  valor      DECIMAL(10,2), 
  vencimento DATE, 
  situacao   VARCHAR(45), 
  PRIMARY KEY (id), 
  CONSTRAINT fk_venda_parcela FOREIGN KEY (idVenda) REFERENCES venda (id)
);


-- PostgreSQL

DROP DATABASE IF EXISTS aula06;
CREATE DATABASE aula06;
\c aula06;

-- PAIS
CREATE TABLE pais (
  id   SERIAL,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- CIDADE
CREATE TABLE cidade (
  id   SERIAL,
  nome VARCHAR(45),
  uf   CHAR(2),
  PRIMARY KEY (id)
);

-- CINEMA
CREATE TABLE cinema (
  id           SERIAL,
  nomeFantasia VARCHAR(45) NOT NULL,
  endereco     VARCHAR(45) NOT NULL,
  bairro       VARCHAR(45) NOT NULL,
  idCidade     INT NOT NULL REFERENCES cidade(id),
  capacidade   INT NOT NULL,
  PRIMARY KEY (id)
);

-- GENERO
CREATE TABLE genero (
  id   SERIAL,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- ATOR
CREATE TABLE ator (
  id   SERIAL,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- FILME
CREATE TABLE filme (
  id              SERIAL,
  idGenero        INT NOT NULL REFERENCES genero(id),
  idPais          INT NOT NULL REFERENCES pais(id),
  idDiretor       INT NOT NULL REFERENCES ator(id),
  tituloOriginal  VARCHAR(100) NOT NULL,
  tituloPortugues VARCHAR(100),
  duracao         INT,
  PRIMARY KEY (id)
);

-- ELENCO
CREATE TABLE elenco (
  idFilme INT NOT NULL REFERENCES filme(id),
  idAtor  INT NOT NULL REFERENCES ator(id),
  PRIMARY KEY (idFilme, idAtor)
);

-- SESSAO
CREATE TABLE sessao (
  id         SERIAL,
  idCinema   INT NOT NULL REFERENCES cinema(id),
  idFilme    INT NOT NULL REFERENCES filme(id),
  data       DATE NOT NULL,
  horaInicio TIME NOT NULL,
  publico    INT NOT NULL,
  PRIMARY KEY (id)
);

-- USUARIO
CREATE TABLE usuario (
  id       SERIAL,
  idCidade INT NOT NULL REFERENCES cidade(id),
  nome     VARCHAR(45),
  email    VARCHAR(100),
  PRIMARY KEY (id)
);

-- TIPO PAGAMENTO
CREATE TABLE tipoPagto (
  id   SERIAL,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

-- VENDA
CREATE TABLE venda (
  id            SERIAL,
  idSessao      INT NOT NULL REFERENCES sessao(id),
  idTipoPagto   INT NOT NULL REFERENCES tipoPagto(id),
  idUsuario     INT NOT NULL REFERENCES usuario(id),
  data          DATE,
  hora          TIME,
  valorIngresso NUMERIC(10,2),
  PRIMARY KEY (id)
);

-- PARCELA
CREATE TABLE parcela (
  id         SERIAL,
  idVenda    INT NOT NULL REFERENCES venda(id),
  valor      NUMERIC(10,2),
  vencimento DATE,
  situacao   VARCHAR(45),
  PRIMARY KEY (id)
);

-- INSERTS (MySQL e PostgreSQL)

-- ATOR
INSERT INTO ator (nome) VALUES
('Adam Sandler'), ('Al Pacino'), ('Angelina Jolie'), ('Anne Hathaway'), ('Ben Stiller'),
('Brad Pitt'), ('Charlize Theron'), ('Chris Hemsworth'), ('Chris Pratt'), ('Christian Bale'),
('Denzel Washington'), ('Dwayne Johnson'), ('Emily Blunt'), ('Emma Stone'), ('Emmanuelle Riva'),
('Ewan McGregor'), ('Gal Gadot'), ('Gladimau Ceroni'), ('Helen Hunt'), ('Hugh Jackman'),
('Jamie Foxx'), ('Jason Clarke'), ('Jennifer Aniston'), ('Joaquin Phoenix'), ('John Hawkes'),
('Jude Law'), ('Keanu Reeves'), ('Keira Knightley'), ('Kristen Connolly'), ('Kristen Stewart'),
('Leonardo DiCaprio'), ('Margot Robbie'), ('Mark Ruffalo'), ('Matthew McConaughey'), ('Meryl Streep'),
('Michael Douglas'), ('Morgan Freeman'), ('Natalie Portman'), ('Paul Rudd'), ('Robert De Niro'),
('Robert Downey Jr.'), ('Ryan Gosling'), ('Ryan Reynolds'), ('Samuel L. Jackson'), ('Scarlett Johansson'),
('Tom Cruise'), ('Tom Hanks'), ('Tom Hardy'), ('Viola Davis'), ('Will Smith'), ('Zendaya');

-- DIRETORES (também são atores)
INSERT INTO ator (nome) VALUES
('Martin Scorsese'), ('Quentin Tarantino'), ('Roman Polanski'), ('Steven Spilberg'),
('Robert Zemeckis'), ('Joe Wright'), ('Ben Lewin'), ('Paul Thomas Anderson'),
('William Friedkin'), ('Kathryn Bigelow'), ('Michael Haneke'), ('Drew Goddard');

-- PAIS
INSERT INTO pais (nome) VALUES
('Brasil'), ('Estados Unidos'), ('Inglaterra'), ('França'), ('Argentina');

-- CIDADE
INSERT INTO cidade (nome, uf) VALUES
('Pelotas', 'RS'), ('Arroio Grande', 'RS'), ('Campinas', 'SP'),
('Herval', 'RS'), ('Jaguarão', 'RS'), ('São Paulo', 'SP');

-- GÊNERO
INSERT INTO genero (nome) VALUES
('Comédia'), ('Ficção'), ('Drama'), ('Aventura'),
('Suspense'), ('Terror'), ('Policial'), ('Faroeste');

-- FILME
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, idDiretor, idGenero, idPais) VALUES
('Flight', 'O Voo', 138, 5, 3, 2),
('Anna Karenina', 'Anna Karenina', 131, 6, 3, 3),
('The Sessions', 'As Sessões', 98, 7, 1, 2),
('Django Unchained', 'Django Livre', 164, 2, 8, 2),
('The Master', 'O Mestre', 144, 8, 3, 2),
('Killer Joe', 'Killer Joe - Matador de Aluguel', 102, 9, 5, 2),
('Zero Dark Thirty', 'A Hora Mais Escura', 157, 10, 5, 2),
('Amour', 'Amor', 127, 11, 3, 4),
('The Cabin in The Woods', 'O Segredo da Cabana', 105, 12, 6, 2),
('La Murga Loca', 'Don Angelus Pax de volta ao lar', 90, 28, 1, 5),
('Cucarachas Assassinas', 'Hey! Hey! Hey! Hey Decio é nosso... Rei', 90, 29, 1, 5),
('The Incredible Case of the DELETE Without WHERE', 'O incrível caso do DELETE sem WHERE', 120, 7, 1, 2);

-- ELENCO
INSERT INTO elenco (idFilme, idAtor) VALUES
(1,12), (1,26),
(2,13), (2,14),
(3,15), (3,16),
(4, 4), (4,17),
(5,18), (6,19),
(7,20), (7,21),
(8,22), (8,23),
(9,24), (9,25);

-- CINEMA
INSERT INTO cinema (nomeFantasia, endereco, bairro, idCidade, capacidade) VALUES
('Cine Art Pelotas', 'Rua Andrade Neves, 1510', 'Centro', 1, 300),
('Cine Mart Pelotas', 'Rua Andrade Neves, 1511', 'Centro', 1, 200),
('Cine Part Pelotas', 'Rua Andrade Neves, 1512', 'Centro', 1, 150),
('Cineart', 'Av Edméia Matos Lazzarotti, 1655', 'Centro', 2, 200),
('Cine Art RG', 'Av Oswaldo Barros, 251', 'Centro', 3, 150),
('Cine Art PoA', 'Av das Nações, 665', 'Centro', 4, 200),
('Cine Freak PoA', 'Av das Monções, 667', 'Centro', 4, 150),
('Cine SP Center', 'Av Paulista, 1000', 'Paulista', 6, 200);

-- SESSAO
INSERT INTO sessao (idCinema, idFilme, data, horaInicio, publico) VALUES
(1, 2, '2025-08-01', '16:00:00', 250),
(1, 2, '2025-08-01', '19:00:00', 190),
(1, 9, '2025-08-01', '21:30:00', 300),
(2, 1, '2025-08-01', '16:00:00', 38),
(2, 1, '2025-08-01', '19:00:00', 55),
(2, 8, '2025-08-01', '21:30:00', 110);

-- USUARIO
INSERT INTO usuario (idCidade, nome, email) VALUES
(3, 'Edecius', 'compreolivro@javascript.com'),
(3, 'Mussum', 'cacildis@senacrs.com.br'),
(2, 'Angelis', 'angel@hotwheels.com'),
(1, 'Satolepis', 'pelotis@docis.com'),
(5, 'Senaquius', 'senaquinho@meuprecioso.com'),
(4, 'Gladimiris', 'ouniconormal@minecraft.com');

-- TIPO PAGAMENTO
INSERT INTO tipoPagto (nome) VALUES
('A Vista'),
('Parcelado');

-- VENDA
INSERT INTO venda (idSessao, idUsuario, data, hora, valorIngresso, idTipoPagto) VALUES
(2, 1, '2025-08-01', '16:00:00', 15.00, 1),
(4, 2, '2025-08-01', '16:00:00', 10.00, 2),
(4, 3, '2025-04-01', '16:00:00', 10.00, 2),
(4, 2, '2025-08-10', '14:00:00', 12.00, 2),
(4, 3, '2025-08-11', '15:00:00', 12.00, 2),
(4, 4, '2025-08-12', '16:00:00', 12.00, 2),
(4, 5, '2025-08-13', '17:00:00', 12.00, 2),
(4, 6, '2025-08-14', '18:00:00', 12.00, 2),
(4, 1, '2025-08-15', '18:00:00', 14.00, 2),
(4, 2, '2025-08-16', '19:00:00', 14.00, 2),
(3, 3, '2025-08-17', '14:00:00', 18.00, 2),
(3, 4, '2025-08-18', '14:00:00', 18.00, 2),
(3, 5, '2025-08-19', '14:00:00', 18.00, 2),
(3, 6, '2025-08-20', '14:00:00', 18.00, 2),
(1, 1, '2025-08-21', '10:00:00', 20.00, 1),
(1, 2, '2025-08-21', '12:00:00', 20.00, 1),
(1, 3, '2025-08-21', '14:00:00', 20.00, 1),
(1, 4, '2025-08-21', '16:00:00', 20.00, 1),
(1, 5, '2025-08-21', '18:00:00', 20.00, 1),
(1, 6, '2025-08-21', '20:00:00', 20.00, 1);


-- PARCELA
INSERT INTO parcela (idVenda, valor, vencimento, situacao) VALUES
(2, 5.00, '2025-08-01', 'ABERTO'),
(2, 5.00, '2025-08-02', 'ABERTO'),
(2, 5.00, '2025-08-03', 'ABERTO'),
(3, 5.00, '2025-08-01', 'ABERTO'),
(4, 6.00, '2025-08-20', 'ABERTO'),
(5, 6.00, '2025-08-21', 'ABERTO'),
(6, 6.00, '2025-08-22', 'ABERTO'),
(7, 6.00, '2025-08-23', 'ABERTO'),
(8, 6.00, '2025-08-24', 'ABERTO'),
(9, 7.00, '2025-08-25', 'ABERTO'),
(9, 7.00, '2025-09-25', 'ABERTO'),
(10, 7.00, '2025-08-26', 'ABERTO'),
(10, 7.00, '2025-09-26', 'ABERTO'),
(11, 9.00, '2025-08-27', 'ABERTO'),
(11, 9.00, '2025-09-27', 'ABERTO'),
(12, 9.00, '2025-08-28', 'ABERTO'),
(12, 9.00, '2025-09-28', 'ABERTO'),
(13, 9.00, '2025-08-29', 'ABERTO'),
(13, 9.00, '2025-09-29', 'ABERTO'),
(14, 9.00, '2025-08-30', 'ABERTO'),
(14, 9.00, '2025-09-30', 'ABERTO');


-- EXERCÍCIOS

/* 1) Escreva uma consulta que exiba o total de vendas parceladas por filme, 
apresentando o título em português e a soma do valor dos ingressos vendidos. */

/* 2) Modifique a consulta anterior para listar apenas os filmes 
que tiveram mais de 3 ingressos vendidos com pagamento parcelado. */

/* 3) Escreva uma consulta que exiba a quantidade total de usuários 
que realizaram pelo menos uma compra com pagamento à vista. */

/* 4) Escreva uma consulta que exiba o nome de cada usuário 
e a quantidade total de compras realizadas à vista por ele, 
utilizando a cláusula GROUP BY. */

/* 5) Crie uma procedure chamada "alteraValorIngresso" 
que receba como parâmetro um novo valor e atualize todos os ingressos vendidos com esse valor. 
Após a alteração, exiba os registros da tabela "venda". */

/* 6) Crie uma função (MySQL) ou procedure (PostgreSQL) que receba o ID de um usuário 
e atualize a situação de todas as suas parcelas para "PAGA". */

/* 7) Crie uma procedure ou função que receba o ID de um usuário como parâmetro 
e retorne todas as suas parcelas, incluindo o valor, vencimento e situação. */

/* 8) Crie uma procedure chamada "visualizaVendas" 
que receba como parâmetro o tipo de pagamento (1 para à vista, 2 para parcelado) 
e exiba a soma total dos valores de ingressos vendidos para o tipo informado. */

/* 9) Crie uma procedure ou função que liste os nomes de todos os atores 
que ainda não participaram de nenhum filme (não possuem vínculo com a tabela "elenco"). */

/* 10) Crie uma procedure ou função que liste todos os filmes 
que ainda não foram exibidos em nenhuma sessão cadastrada na tabela "sessao". */

/* 11) Crie uma procedure ou função que receba o nome de uma cidade como parâmetro 
e exiba todos os cinemas localizados nessa cidade. */

/* 12) Crie uma procedure chamada "atualizaGenero" 
que receba dois parâmetros: o nome do gênero atual e o nome do novo gênero. 
A procedure deve alterar todos os filmes que pertencem ao gênero atual para o novo gênero informado. */

/* 13) Crie uma procedure chamada "filmesGeneroDuracao" (ou função correspondente) 
que receba como parâmetros o nome de um gênero e uma duração mínima. 
A consulta deve retornar os filmes do gênero especificado com duração superior ao valor informado. */

/* 14) Escreva uma consulta que liste todas as sessões 
cuja ocupação do público tenha sido superior a 80% da capacidade do cinema. 
Exiba o nome do filme, nome do cinema, público, capacidade e percentual de ocupação. */

/* 15) Crie uma VIEW chamada "resumo_vendas_filme" 
que apresente o título dos filmes, o número total de ingressos vendidos 
e o valor total arrecadado com essas vendas. */

/* 16) Crie uma VIEW chamada "ocupacao_cinema" 
que exiba o nome de cada cinema 
e sua média de ocupação (percentual) com base nas sessões realizadas. */
