DROP SCHEMA IF EXISTS cinema;
CREATE SCHEMA cinema;
USE cinema;

CREATE TABLE pais (
  id   INT AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE ator (
  id       INT AUTO_INCREMENT,
  pais_id  INT NOT NULL,
  nome     VARCHAR(45) NOT NULL,
  data_nas DATE NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (pais_id) REFERENCES pais (id));

CREATE TABLE uf (
  id      INT AUTO_INCREMENT,
  pais_id INT NOT NULL,
  sigla   CHAR(2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (pais_id) REFERENCES pais (id));

CREATE TABLE cidade (
  id    INT AUTO_INCREMENT,
  uf_id INT NOT NULL,
  nome  VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (uf_id) REFERENCES uf (id));

CREATE TABLE cinema (
  id           INT AUTO_INCREMENT,
  cidade_id    INT NOT NULL,
  nomeFantasia VARCHAR(45) NOT NULL,
  endereco     VARCHAR(45),
  bairro       VARCHAR(45),
  PRIMARY KEY (id),
  FOREIGN KEY (cidade_id) REFERENCES cidade (id));

CREATE TABLE filme (
  id              INT AUTO_INCREMENT,
  pais_id         INT NOT NULL,
  diretor_id      INT NOT NULL,
  tituloOriginal  VARCHAR(45) NOT NULL,
  tituloPortugues VARCHAR(45) NULL DEFAULT NULL,
  duracao         INT NULL DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (diretor_id) REFERENCES ator (id),
  FOREIGN KEY (pais_id) REFERENCES pais (id));

CREATE TABLE elenco (
  ator_id  INT,
  filme_id INT,
  PRIMARY KEY (ator_id, filme_id),
  FOREIGN KEY (ator_id) REFERENCES ator (id),
  FOREIGN KEY (filme_id) REFERENCES filme (id));

CREATE TABLE genero (
  id   INT AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE sala (
  id         INT AUTO_INCREMENT,
  cinema_id  INT NOT NULL,
  nome       VARCHAR(45) NOT NULL,
  capacidade INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cinema_id) REFERENCES cinema (id));

CREATE TABLE sessao (
  id         INT AUTO_INCREMENT,
  sala_id    INT NOT NULL,
  filme_id   INT NOT NULL,
  data       DATE NOT NULL,
  horaInicio TIME NOT NULL,
  publico    INT,
  PRIMARY KEY (id),
  FOREIGN KEY (filme_id) REFERENCES filme (id),
  FOREIGN KEY (sala_id)  REFERENCES sala (id));

CREATE TABLE genero_filme (
  genero_id INT,
  filme_id  INT,
  PRIMARY KEY (genero_id, filme_id),
  FOREIGN KEY (genero_id) REFERENCES genero (id),
  FOREIGN KEY (filme_id)  REFERENCES filme  (id));

-- usuario
CREATE TABLE usuario (
  id        INT AUTO_INCREMENT,
  cidade_id INT NOT NULL,
  nome      VARCHAR(45) NULL,
  email     VARCHAR(100) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

-- venda
CREATE TABLE venda (
  id            INT AUTO_INCREMENT,
  sessao_id     INT NOT NULL,
  usuario_id    INT NOT NULL,
  data          DATE NULL,
  hora          TIME NULL,
  valorIngresso DECIMAL(10,2) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (sessao_id) REFERENCES sessao (id),
  FOREIGN KEY (usuario_id) REFERENCES usuario (id));

-- Países
INSERT INTO pais (nome) VALUES ('Brasil');
INSERT INTO pais (nome) VALUES ('Estados Unidos');
INSERT INTO pais (nome) VALUES ('Inglaterra');
INSERT INTO pais (nome) VALUES ('França');

-- Estados (UFs)
INSERT INTO uf (pais_id, sigla) VALUES (1, 'RS');
INSERT INTO uf (pais_id, sigla) VALUES (1, 'MG');
INSERT INTO uf (pais_id, sigla) VALUES (1, 'SP');
INSERT INTO uf (pais_id, sigla) VALUES (1, 'RJ');

-- Cidades
INSERT INTO cidade (uf_id, nome) VALUES (1, 'Porto Alegre');
INSERT INTO cidade (uf_id, nome) VALUES (1, 'Pelotas');
INSERT INTO cidade (uf_id, nome) VALUES (1, 'Santa Vitória do Palmar');
INSERT INTO cidade (uf_id, nome) VALUES (1, 'Arroio Grande');
INSERT INTO cidade (uf_id, nome) VALUES (2, 'São Paulo');
INSERT INTO cidade (uf_id, nome) VALUES (1, 'Baurú');

-- ators (Atores)
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Michael Douglas', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Angelina Jolie', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Tom Cruise', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Leonardo Dicaprio', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Adam Sandler', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Ben Stiller', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Will Smith', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jannifer Aniston', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Meryl Streep', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Charlize Theron', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Kristen Stewart', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Denzel Washington', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Keira Knightley', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jude Law', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('John Hawkes', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Helen Hunt', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jamie Foxx', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Joaquim Phoenix', 3, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Edecio Iepsen', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jessica Chastain', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jason Clarke', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Jean-Louis Trintignant', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Emmanuelle Riva', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Kristen Connolly', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Chris Hemsworth', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Angelo Luz', 2, '1957-02-08');
  
-- Diretores (Diretores)
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Martin Scorsese', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Quentin Tarantino', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Roman Polanski', 1, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Steven Spilberg', 1, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Robert Zemeckis', 1, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Joe Wright', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Ben Lewin', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Paul Thomas Anderson', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('William Friedkin', 2, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Kathryn Bigelow', 1, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Michael Haneke', 3, '1957-02-08');
INSERT INTO ator (nome, pais_id, data_nas) VALUES ('Drew Goddard', 2, '1957-02-08');
  
-- Gêneros
INSERT INTO genero (nome) VALUES ('Comédia');
INSERT INTO genero (nome) VALUES ('Ficção');
INSERT INTO genero (nome) VALUES ('Drama');
INSERT INTO genero (nome) VALUES ('Ação');
INSERT INTO genero (nome) VALUES ('Suspense');
INSERT INTO genero (nome) VALUES ('Terror');
INSERT INTO genero (nome) VALUES ('Faroeste');
INSERT INTO genero (nome) VALUES ('Aventura');

-- Filmes
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Flight','O Voo',138,3,1);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Anna Karenina','Anna Karenina',131,3,3);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('The Sessions','As Sessões',98,1,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Django Unchained','Django Livre',164,7,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('The Master','O Mestre',144,3,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Killer Joe','Killer Joe - Matador de Aluguel',102,4,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Zero Dark Thirty','A Hora Mais Escura',157,5,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('Amour','Amor',127,3,4);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('The Cabin in The Woods','O Segredo da Cabana',105,6,2);
INSERT INTO filme (tituloOriginal, tituloPortugues, duracao, diretor_id, pais_id) VALUES ('La Murga Loca','A Murga Louca',30,26,4);

-- Gênero_Filme
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,1);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,2);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,3);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,4);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (2,5);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,6);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,7);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,8);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (3,9);
INSERT INTO genero_filme (genero_id, filme_id) VALUES (1,10);

-- Elenco
INSERT INTO elenco (filme_id, ator_id) VALUES (1,12);
INSERT INTO elenco (filme_id, ator_id) VALUES (1,26);
INSERT INTO elenco (filme_id, ator_id) VALUES (2,13);
INSERT INTO elenco (filme_id, ator_id) VALUES (2,14);
INSERT INTO elenco (filme_id, ator_id) VALUES (3,15);
INSERT INTO elenco (filme_id, ator_id) VALUES (3,16);
INSERT INTO elenco (filme_id, ator_id) VALUES (4,4);
INSERT INTO elenco (filme_id, ator_id) VALUES (4,17);
INSERT INTO elenco (filme_id, ator_id) VALUES (5,18);
INSERT INTO elenco (filme_id, ator_id) VALUES (6,19);
INSERT INTO elenco (filme_id, ator_id) VALUES (7,20);
INSERT INTO elenco (filme_id, ator_id) VALUES (7,21);
INSERT INTO elenco (filme_id, ator_id) VALUES (8,22);
INSERT INTO elenco (filme_id, ator_id) VALUES (8,23);
INSERT INTO elenco (filme_id, ator_id) VALUES (9,24);
INSERT INTO elenco (filme_id, ator_id) VALUES (9,25);

-- Cinemas
INSERT INTO cinema (nomeFantasia, endereco, bairro, cidade_id) VALUES ('Cine Art Pelotas', 'Rua Andrade Neves, 1510','Centro',2);
INSERT INTO cinema (nomeFantasia, endereco, bairro, cidade_id) VALUES ('CineFlix Pelotas', 'Shopping Pelotas, 9999','Areal',2);
INSERT INTO cinema (nomeFantasia, endereco, bairro, cidade_id) VALUES ('Cine Art Rio Grande', 'Av Oswaldo Barros, 251','Centro',3);
INSERT INTO cinema (nomeFantasia, endereco, bairro, cidade_id) VALUES ('Cine Art POA', 'Av das Nações, 665','Centro',1);

-- Salas
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (1, 'A', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (4, 'B', 200);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (3, 'C', 200);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (1, 'X', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (2, 'Z', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (2, 'W', 400);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (2, 'C', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (3, 'A', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (1, 'F', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (3, 'H', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (4, 'Z', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (2, 'A', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (2, 'B', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (3, 'X', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (1, 'H', 100);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (4, 'F', 500);
INSERT INTO sala (cinema_id, nome, capacidade) VALUES (1, 'Z', 100);

-- Sessões
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (10,5,'2024-05-16','18:50:00',314);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (10,4,'2024-05-16','21:40:00',412);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (11,2,'2024-05-17','16:00:00',64);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (11,2,'2024-05-17','19:00:00',98);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (11,9,'2024-05-17','21:30:00',114);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (12,1,'2024-05-17','16:00:00',57);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (12,1,'2024-05-17','19:00:00',78);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (12,8,'2024-05-17','21:30:00',134);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (13,6,'2024-05-17','16:00:00',48);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (13,6,'2024-05-17','19:00:00',75);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (14,5,'2024-05-17','21:30:00',154);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (15,4,'2024-05-17','14:30:00',245);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (15,7,'2024-05-17','18:00:00',158);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (16,3,'2024-05-17','21:15:00',262);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (16,1,'2024-05-17','16:00:00',105);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (17,1,'2024-05-17','20:00:00',214);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (17,6,'2024-05-17','15:00:00',289);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (6,2,'2024-05-17','19:40:00',425);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,9,'2024-05-17','21:45:00',502);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (5,3,'2024-05-17','14:40:00',108);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,5,'2024-05-17','18:50:00',372);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,4,'2024-05-17','21:40:00',489);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,2,'2024-05-18','16:00:00',95);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,2,'2024-05-18','19:00:00',124);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,9,'2024-05-18','21:30:00',158);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,1,'2024-05-18','16:00:00',46);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,1,'2024-05-18','19:00:00',97);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,8,'2024-05-18','21:30:00',187);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,6,'2024-05-18','16:00:00',87);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,6,'2024-05-18','19:00:00',105);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (17,5,'2024-05-18','21:30:00',154);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (16,4,'2024-05-18','14:30:00',144);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (15,7,'2024-05-18','18:00:00',198);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (14,3,'2024-05-18','21:15:00',265);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (13,1,'2024-05-18','16:00:00',97);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (12,1,'2024-05-18','20:00:00',248);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (11,6,'2024-05-18','15:00:00',314);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (10,2,'2024-05-18','19:40:00',499);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (9,9,'2024-05-18','21:45:00',587);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (8,3,'2024-05-18','14:40:00',255);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,5,'2024-05-18','18:50:00',445);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (6,4,'2024-05-18','21:40:00',455);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (5,2,'2024-05-16','16:00:00',55);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (4,2,'2024-05-16','19:00:00',108);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,9,'2024-05-16','21:30:00',187);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,1,'2024-05-16','16:00:00',67);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,1,'2024-05-16','19:00:00',89);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,8,'2024-05-16','21:30:00',144);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,6,'2024-05-16','16:00:00',75);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,6,'2024-05-16','19:00:00',101);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (4,5,'2024-05-16','21:30:00',140);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (5,4,'2024-05-16','14:30:00',178);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (6,7,'2024-05-16','18:00:00',149);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,3,'2024-05-16','21:15:00',278);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (8,1,'2024-05-16','16:00:00',115);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (9,1,'2024-05-16','20:00:00',268);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (10,6,'2024-05-16','15:00:00',387);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (11,2,'2024-05-16','19:40:00',455);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (12,9,'2024-05-16','21:45:00',608);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (13,3,'2024-05-16','14:40:00',115);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (14,5,'2024-05-16','18:50:00',402);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (17,4,'2024-05-16','21:40:00',389);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (8,2,'2024-06-10','19:40:00',489);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (9,9,'2024-06-10','21:45:00',548);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (9,3,'2024-06-10','14:40:00',142);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,1,'2024-06-11','16:00:00',145);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,1,'2024-06-11','20:00:00',249);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (8,6,'2024-06-11','15:00:00',314);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,2,'2024-06-12','16:00:00',45);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,2,'2024-06-12','19:00:00',80);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,9,'2024-06-12','21:30:00',95);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (2,1,'2024-06-12','16:00:00',38);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,1,'2024-06-12','19:00:00',55);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (3,8,'2024-06-12','21:30:00',110);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (4,6,'2024-06-12','16:00:00',60);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (4,6,'2024-06-12','19:00:00',75);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (5,5,'2024-06-12','21:30:00',148);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (5,4,'2024-06-12','14:30:00',227);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (6,7,'2024-06-12','18:00:00',185);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (6,3,'2024-06-12','21:15:00',247);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (9,3,'2024-06-13','14:40:00',NULL);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,1,'2024-06-14','16:00:00',NULL);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (7,1,'2024-06-15','20:00:00',NULL);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (8,6,'2024-06-16','15:00:00',NULL);
INSERT INTO sessao (sala_id, filme_id, data, horaInicio, publico) VALUES (1,2,'2024-06-17','16:00:00',NULL);

-- Usuário
INSERT INTO usuario(nome,email,cidade_id) VALUES(' Leonardo da Silva','leonardo@gmail.com',1);
INSERT INTO usuario(nome,email,cidade_id) VALUES('  Cleber Duarte','cleber@gmail.com',1);
INSERT INTO usuario(nome,email,cidade_id) VALUES('Débora Rodrigues','debora_rod@hotmail.com',2);
INSERT INTO usuario(nome,email,cidade_id) VALUES('Mario Fernandes','mario77@terra.com.br',2);
INSERT INTO usuario(nome,email,cidade_id) VALUES('Gustavo Borges  ','gustavo@gmail.com',3);
INSERT INTO usuario(nome,email,cidade_id) VALUES('Valéria Santiago     ','valeria99@gmail.com',3);

-- Venda
INSERT INTO venda (sessao_id, usuario_id, data, hora, valorIngresso)
VALUES 
(1,1,'2024-05-01','21:40:00',15.55),
(1,1,'2024-05-02','21:45:00',15.00),
(1,1,'2024-05-01','21:40:00',15.55),
(1,1,'2024-05-02','21:45:00',15.00),
(1,1,'2024-05-10','21:50:00',10.55),
(2,1,'2024-05-20','21:55:00',15.40),
(2,1,'2024-03-25','21:56:00',10.50),
(2,1,'2024-05-20','21:55:00',15.40),
(2,1,'2024-03-25','21:56:00',10.50),
(4,1,'2024-03-01','21:57:00',10.55),
(4,1,'2024-03-02','21:58:00',15.55),
(4,1,'2024-05-03','21:59:00',10.00),
(6,1,'2024-05-20','22:00:00',12.55),
(7,1,'2024-05-15','22:01:00',12.05),
(7,1,'2024-05-10','22:02:00',12.55),
(8,1,'2024-05-10','22:03:00',10.05),
(1,2,'2024-03-02','22:04:00',13.55),
(1,2,'2024-03-03','21:40:00',14.06),
(1,3,'2024-03-04','21:40:00',13.55),
(1,3,'2024-03-05','21:40:00',15.05),
(1,3,'2024-05-06','21:40:00',13.55),
(2,2,'2024-05-07','21:40:00',15.10),
(4,2,'2024-05-08','21:40:00',10.55),
(4,2,'2024-05-09','21:40:00',15.25),
(7,2,'2024-05-31','21:40:00',15.50),
(4,3,'2024-05-09','21:40:00',15.50),
(5,3,'2024-05-10','21:40:00',25.50),
(5,3,'2024-05-01','21:40:00',20.50),
(5,3,'2024-05-02','21:40:00',15.50),
(7,3,'2024-05-03','21:40:00',15.55),
(7,3,'2024-05-10','21:40:00',15.55),
(2,4,'2024-03-01','21:40:00',15.55),
(2,4,'2024-05-10','21:40:00',10.55),
(2,4,'2024-03-20','21:30:00',15.50),
(3,4,'2024-03-20','21:30:00',15.50),
(4,4,'2024-03-20','21:30:00',15.50),
(6,4,'2024-03-20','21:30:00',15.50),
(6,4,'2024-03-20','21:30:00',15.50);

SHOW TABLES;

SELECT * FROM pais;
SELECT * FROM uf;
SELECT * FROM cidade;
SELECT * FROM ator;
SELECT * FROM cinema;
SELECT * FROM filme;
SELECT * FROM usuario;
SELECT * FROM venda;


/* a. Crie uma consulta que liste todos os nomes dos filmes, gêneros e duração, 
ordenados por gênero e em seguida em ordem decrescente de tituloOriginal de Filme; */

/* b. Selecionar os títulos dos filmes em ordem inversa de título; */

/* c. Utilizando o operador IN, crie uma consulta para que liste o nome ds gêneros exceto suspense, terror e comédia; */

/* d. Utilizando subconsultas, crie uma consulta que retorne os títulos, gênero e duração de filmes 
em que o gênero seja DRAMA e a duração esteja entre 70 e 130 minutos; */

/* e. Criar uma consulta para listar os títulos em original e português 
dos filmes que ainda não possuem ingressos vendidos; */

/* f. Criar uma consulta para contabilizar a soma dos valores de ingressos vendidos por filme, 
liste o nome do filme, a quantidade de ingressos e o somatório do valor dos ingressos; */

/* g. Criar uma consulta que contabilize quantos ingressos foram vendidos por filme, 
liste o nome do filme e a quantidade, liste apenas os 5 primeiros caracteres do nome do filme e a quantidade de ingressos; */

/* h. Criar uma consulta que liste todos os nomes dos cinemas 
e a quantidade de caracteres de cada nome de cinema; */

/* i. Modificar a consulta anterior para que liste apenas 
os 5 primeiros caracteres do nome do cinema listado; */

/* j. Criar uma consulta para listar a quantidade de atores que trabalharam em cada filme. 
Listar o nome do filme e a quantidade de atores. */

/* k. Crie uma consulta para atualizar o tempo para + 44 minutos em todos os filmes de suspense. */

/* l. Utilizando o IN, crie uma consulta que selecione o nome dos atores 
que não participaram de nenhum filme; */

/* m. Utilizando o IN crie uma consulta que retorne o título e o gênero 
de todos os filmes que não passaram ainda em cinema algum. */
