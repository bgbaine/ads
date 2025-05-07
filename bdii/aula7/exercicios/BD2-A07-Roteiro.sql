-- AULA07 - ROTEIRO

-- MySQL
DROP DATABASE IF EXISTS aula07;
CREATE DATABASE aula07;
USE aula07;

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

DROP DATABASE IF EXISTS aula07;
CREATE DATABASE aula07;
\c aula07;

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
-- 1. Crie o procedimento para gerar usuários aleatórios
-- 2. Execute o procedimento para inserir dados
-- 3. Crie um índice simples no campo email da tabela usuario
-- 4. Faça uma consulta com filtro por email e analise com explain
-- 5. Remova o índice e repita a consulta para comparar tempo
-- 6. Crie um índice composto para os campos nome e email
-- 7. Faça uma consulta utilizando os campos do índice composto
