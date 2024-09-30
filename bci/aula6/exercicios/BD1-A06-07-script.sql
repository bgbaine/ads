DROP DATABASE IF EXISTS aula06a;
CREATE DATABASE IF NOT EXISTS aula06a;
USE aula06a;

CREATE TABLE clientes(
    codigo   CHAR(6),
    nome     VARCHAR(20),
    dataN    DATE,
    valor    DECIMAL(10,2),
    cidade   VARCHAR(20),
    PRIMARY KEY(codigo)
);

INSERT INTO clientes (codigo, nome, dataN, valor, cidade) VALUES ('B5200X', 'Bartolomeu', '1982-12-23', 100.4, 'Pelotas');
INSERT INTO clientes (codigo, nome, dataN, valor, cidade) VALUES ('B79321', 'Bartolomeu', '1969-01-24', 31.29, 'Erechim');
INSERT INTO clientes (codigo, nome, dataN, valor, cidade) VALUES ('A73111', 'Orpiliano', '2001-07-19', 98.6, 'Canoas');
INSERT INTO clientes (codigo, nome, dataN, valor, cidade) VALUES ('A77222', 'Dorvalinau', '1999-11-21', 900, 'Pelotas');
INSERT INTO clientes VALUES ('BX9843', 'Josivaldo', '1967-04-01', 93.45, 'Blumenau');
INSERT INTO clientes (codigo, nome) VALUES ('S9983W', 'Sarafina');
INSERT INTO clientes (cidade, nome, valor, codigo) VALUES ('Pelotas', 'Italinea', 1200.49, 'EL171C');
INSERT INTO clientes VALUES ('XYZ432', 'Anacleto', '1967-04-02', 90, 'Pelotas');

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
INSERT INTO departamento (codigo, nome, telefone) VALUES (1, "RH", "321");
INSERT INTO departamento (codigo, nome, telefone) VALUES (2, "Compras", "123");
INSERT INTO departamento (codigo, nome, telefone) VALUES (3, "Transportes", "456");
INSERT INTO departamento (codigo, nome, telefone) VALUES (4, "Marketing", "654");
INSERT INTO departamento (codigo, nome, telefone) VALUES (5, "Vendas", "789");
INSERT INTO departamento (codigo, nome, telefone) VALUES (6, "Financeiro", "987");
INSERT INTO departamento (codigo, nome, telefone) VALUES (7, "Estoque", "234");
INSERT INTO departamento (codigo, nome, telefone) VALUES (8, "Saúde", "432");
INSERT INTO departamento (codigo, nome, telefone) VALUES (9, "Controladoria Geral", "345");
INSERT INTO departamento (codigo, nome, telefone) VALUES (10, "Ouvidoria", "543");

-- Cadastre empregados com salario menor do que 5.000, igual a 5.000 e maior do que 5.000;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (800, "Josivaldo Antunes Nunes", "Rua das flores", 4000, NULL, 1);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (900, "Marzivania Alves Breda", "Rua das urtigas", 4500, NULL, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (835, "Plinio Cabresto Selvagem", "Av Sallus", 5000, 900, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (836, "Ortega Raimundo Gomes", "Av Marlua", 5600, 900, 3);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (837, "Solange Costa Ortiz", "Rua Zanzibar", 8000, 835, 3);

-- Cadastre pelo menos três funcionários com salário entre 1.700 e 2.800
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (841, "Monange Costa Ortiz", "Rua Zanzibar", 1700, NULL, 4);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (842, "Rosange Costa Ortiz", "Rua Zanzibar", 1750, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (843, "Violange Costa Ortiz", "Rua Zanzibar", 2700, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (844, "Sustange Costa Ortiz", "Rua Zanzibar", 2800, 843, 6);

-- Cadastre dois funcionários no departamento 1;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (845, "Zuleiva Maciel Souza", "Rua Troll", 8050, NULL, 1);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (846, "Panceta Furunculo Anacleto", "Rua Dores", 18050, 844, 1);

-- Cadastre pelo menos três funcionários no departamento 2;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (847, "Marciano das Antenas Verdes", "Rua Marte", 1050, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (848, "Etevaldo Agusto Moraes", "Rua Venus", 2050, NULL, 2);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (849, "Lucrecio Borges Almeida", "Rua Jupiter", 8049, 847, 2);

-- Cadastre 3 funcionários no departamento 5;
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (947, "Zorzicleto Bicicleteiro", "Rua Marte", 2050, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (948, "Pedregusto Mars", "Rua Venus", 3050, NULL, 5);
INSERT INTO empregado (matricula, nome, endereco, salario, matsupervisor, coddep) VALUES (949, "Laurinda Linda Lindeza", "Rua Jupiter", 5049, 847, 5);

-- Cadastre alguns dependentes com data de nascimento igual a 27/10/2002;
INSERT INTO dependente (id, matemp, nome, datan) VALUES (1, 949, "Laurindinha Lindeza", "2002-10-27");
INSERT INTO dependente (id, matemp, nome, datan) VALUES (2, 949, "Laurindinho Lindeza", "2002-10-27");
INSERT INTO dependente (id, matemp, nome, datan) VALUES (3, 947, "Bikemotor Yamaha", "2002-10-27");

-- Cadastre alguns dependentes com data de nascimento posterior a 27/10/2002;
INSERT INTO dependente (id, matemp, nome, datan) VALUES (4, 843, "Pringles Doritos de Queijo", "2002-10-28");
INSERT INTO dependente (id, matemp, nome, datan) VALUES (5, 848, "Fanta Uva de Avila", "2004-11-27");
INSERT INTO dependente (id, matemp, nome, datan) VALUES (6, 948, "Setembrino Dorvalino", "2012-12-26");
