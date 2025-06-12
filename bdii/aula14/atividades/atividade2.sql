-- SCHEMA (mysql)
CREATE DATABASE IF NOT EXISTS atividade2;

USE atividade2;

CREATE TABLE IF NOT EXISTS aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(150) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    data_cadastro DATE
);

CREATE TABLE IF NOT EXISTS curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL,
    instrutor VARCHAR(100),
    carga_horaria INT
);

CREATE TABLE IF NOT EXISTS inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_aluno INT,
    id_curso INT,
    data_inscricao TIMESTAMP,
    status VARCHAR(20),
    FOREIGN KEY (id_aluno) REFERENCES aluno(id),
    FOREIGN KEY (id_curso) REFERENCES curso(id)
);

CREATE TABLE IF NOT EXISTS log_inscricao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_inscricao_ref INT,
    acao_realizada VARCHAR(50),
    data_log TIMESTAMP,
);

-- 1a
INSERT INTO curso (nome_curso, instrutor, carga_horaria) VALUES
('Programacao', 'Souza Carlos', 40),
('Ingles', 'Carlos Souza', 20),
('Espanhol', 'Edecio Souza', 40),
('Geografia', 'Souza Edecio', 40),
('Historia', 'Angelo Souza', 50),
('Ciencias', 'Souza Angelo', 40),
('Comunicacao Visual', 'Gladimir Souza', 40),
('Banco de Dados', 'Souza', 100);

-- 1b
INSERT INTO aluno (nome_aluno, email, data_cadastro) VALUES
('João Silva', 'joao@email.com', '2023-01-15'),
('Ana Souza', 'ana@email.com', '2023-01-16'),
('Pedro Santos', 'pedro@email.com', '2023-01-17'),
('Lucas Lima', 'lucas@email.com', '2023-01-18'),
('Juliana Costa', 'juliana@email.com', '2023-01-19'),
('Fernanda Alves', 'fernanda@email.com', '2023-01-20'),
('Bruno Pereira', 'bruno@email.com', '2023-01-21'),
('Camila Rocha', 'camila@email.com', '2023-01-22'),
('Rafael Martins', 'rafael@email.com', '2023-01-23'),
('Patricia Dias', 'patricia@email.com', '2023-01-24'),
('Gabriel Fernandes', 'gabriel@email.com', '2023-01-25'),
('Larissa Gomes', 'larissa@email.com', '2023-01-26'),
('Thiago Barbosa', 'thiago@email.com', '2023-01-27'),
('Beatriz Ribeiro', 'beatriz@email.com', '2023-01-28'),
('Maria Oliveira', 'maria@email.com', '2023-01-15');

-- 2a
UPDATE curso
SET instrutor = 'Prof. Gladimir'
WHERE id = 1;

-- 2b
INSERT INTO inscricao (id_aluno, id_curso, data_inscricao, status) VALUES
(1, 1, NOW(), 'ativa'),
(1, 2, NOW(), 'ativa'),
(1, 3, NOW(), 'ativa'),
(2, 1, NOW(), 'ativa'),
(2, 2, NOW(), 'ativa'),
(3, 3, NOW(), 'concluida'),
(4, 4, NOW(), 'ativa'),
(4, 1, NOW(), 'ativa'),
(5, 5, NOW(), 'ativa'),
(6, 2, NOW(), 'ativa'),
(6, 6, NOW(), 'concluida'),
(6, 8, NOW(), 'ativa'),
(7, 8, NOW(), 'concluida'),
(8, 8, NOW(), 'ativa');

SELECT nome_aluno AS "Nome do Aluno", nome_curso AS "Nome do Curso"
FROM aluno
INNER JOIN inscricao ON aluno.id = inscricao.id_aluno
INNER JOIN curso ON inscricao.id_curso = curso.id
WHERE inscricao.status = 'ativa';

-- 3a
CREATE USER 'analista'@'localhost';
GRANT SELECT ON atividade2.* TO 'analista'@'localhost';

-- 3b
CREATE USER 'secretaria'@'localhost';
GRANT SELECT, INSERT, UPDATE ON atividade2.inscricao TO 'secretaria'@'localhost';

-- 4
DELIMITER $$
CREATE PROCEDURE realizar_inscricao(
    IN aluno_id INT,
    IN curso_id INT
)
BEGIN
    INSERT INTO inscricao (id_aluno, id_curso, data_inscricao, status)
    VALUES (aluno_id, curso_id, NOW(), 'ativa');
END$$
DELIMITER ;

-- 5
DELIMITER $$
CREATE TRIGGER log_nova_inscricao
AFTER INSERT ON inscricao
FOR EACH ROW
BEGIN
    INSERT INTO log_inscricao (id_inscricao_ref, acao_realizada, data_log)
    VALUES (NEW.id, 'NOVA INSCRICAO REALIZADA', NOW());
END$$
DELIMITER ;

CALL realizar_inscricao(1, 1);

-- 6
CREATE VIEW v_inscricoes_detalhadas AS
SELECT aluno.nome_aluno AS "Nome do Aluno", aluno.email AS "Email do Aluno", curso.nome_curso AS "Nome do Curso", inscricao.data_inscricao AS "Data da Inscrição"
FROM inscricao
INNER JOIN aluno ON inscricao.id_aluno = aluno.id
INNER JOIN curso ON inscricao.id_curso = curso.id;

-- 7a iniciar transação
BEGIN
    START TRANSACTION;

-- 7b realizar inscrição
    CALL realizar_inscricao(2, 3);

-- 7c atualizar status da inscrição
    UPDATE inscricao
    SET status = 'concluida'
    WHERE id_aluno = 2 AND id_curso = 3;

-- 7d se ambos comandos forem bem sucedidos, confirmar transação, caso contrario reverta todas as alterações
IF NOT SQLEXCEPTION THEN
    COMMIT;
ELSE
    ROLLBACK;
END IF;

-- 8
SELECT nome_curso AS "Nome do Curso", COUNT(inscricao.id) AS "Total de Inscrições"
FROM curso
INNER JOIN inscricao ON curso.id = inscricao.id_curso
GROUP BY curso.id
ORDER BY COUNT(inscricao.id) DESC;

-- 9
SELECT nome_curso AS "Nome do Curso", COUNT(inscricao.id) AS "Total de Inscrições"
FROM curso
LEFT JOIN inscricao ON curso.id = inscricao.id_curso
GROUP BY curso.id
ORDER BY COUNT(inscricao.id) DESC;

-- 10
SELECT nome_curso, 
    SUM(inscricao.status = 'ativa') AS "tot_ativas", 
    SUM(inscricao.status = 'concluida') AS "tot_concluidas"
FROM curso
INNER JOIN inscricao ON curso.id = inscricao.id_curso
GROUP BY curso.id;

-- 11a
use plataforma_ead_nosql;

-- 11b
db.createCollection("inscricoes");
db.inscricoes.insertMany([
  {
    aluno: { nome: "Carlos Andrade", email: "carlos.a@email.com" },
    curso: { nome: "Análise de Dados com Python", instrutor: "Prof. Silva" },
    data_inscricao: new Date("2024-10-25"),
    status: "ativa",
  },
  {
    aluno: { nome: "Mariana Costa", email: "mari.c@email.com" },
    curso: { nome: "Banco de Dados para Big Data", instrutor: "Prof. Silva" },
    data_inscricao: new Date("2024-11-05"),
    status: "ativa",
  },
  {
    aluno: { nome: "Ana Beatriz", email: "ana.b@email.com" },
    curso: { nome: "Introdução a Algoritmos", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-02-15"),
    status: "ativa",
  },
  {
    aluno: { nome: "Pedro Martins", email: "pedro.m@email.com" },
    curso: { nome: "Machine Learning", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-03-01"),
    status: "ativa",
  },
  {
    aluno: { nome: "Juliana Lima", email: "ju.lima@email.com" },
    curso: {
      nome: "Desenvolvimento Web Fullstack",
      instrutor: "Prof. Gladimir",
    },
    data_inscricao: new Date("2025-01-20"),
    status: "concluída",
  },
  {
    aluno: { nome: "Amanda Gomes", email: "amanda.g@email.com" },
    curso: { nome: "Engenharia de Software", instrutor: "Prof. Carla" },
    data_inscricao: new Date("2025-04-10"),
    status: "ativa",
  },
  {
    aluno: {
      nome: "Lucas Pereira",
      email: "lucas.p@email.com",
      matricula: "BR25001",
    },
    curso: { nome: "Cibersegurança Essencial", instrutor: "Prof. Carla" },
    data_inscricao: new Date("2025-03-20"),
    status: "ativa",
    bolsa: { tipo: "Mérito Acadêmico", percentual: 100 },
  },
  {
    aluno: { nome: "Fernanda Dias", email: "fernanda.d@email.com" },
    curso: { nome: "Gestão de Projetos Ágeis", instrutor: "Prof. Gladimir" },
    data_inscricao: new Date("2025-05-01"),
    status: "concluída",
    nota_final: 9.5,
    empresa_contratante: "Tech Solutions Inc.",
  },
  {
    aluno: { nome: "Ricardo Neves" },
    curso: { nome: "Tópicos Avançados em Banco de Dados" },
    data_inscricao: new Date("2025-05-10"),
    tags: ["SQL", "NoSQL", "Performance"],
  },
  {
    aluno: { nome: "Vitor Hugo", email: "vitor.h@email.com" },
    curso: {
      nome: "Lógica de Programação (Legacy)",
      instrutor: "Prof. Antigo",
    },
    data_inscricao: new Date("2024-03-15"),
    status: "arquivada",
  },
  {
    aluno: { nome: "Sofia Almeida", email: "sofia.a@email.com" },
    curso: { nome: "Design de Interação", instrutor: "Prof. Edecio" },
    data_inscricao: new Date("2025-06-01"),
    status: "ativa",
  },
  {
    aluno: { nome: "Gabriel Roxo", email: "gabriel.roxo@email.com" },
    curso: { nome: "Desenvolvimento de APIs", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-06-15"),
    status: "arquivada",
  },
  {
    aluno: { nome: "Isabela Santos", email: "isabela.s@email.com" },
    curso: { nome: "Design de Interação", instrutor: "Prof. Gladimir" },
    data_inscricao: new Date("2025-06-01"),
    status: "ativa",
  },
  {
    aluno: { nome: "Gabriel Rosa", email: "gabriel.rosa@email.com" },
    curso: { nome: "Desenvolvimento de APIs", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-06-15"),
    status: "ativa",
  },
  {
    aluno: { nome: "Isabela Santos", email: "isabela.s@email.com" },
    curso: { nome: "Design de Interação", instrutor: "Prof. Luiza" },
    data_inscricao: new Date("2025-06-01"),
    status: "ativa",
  },
  {
    aluno: { nome: "Gabriel Rojo", email: "gabriel.rojo@email.com" },
    curso: { nome: "Desenvolvimento de APIs", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-06-15"),
    status: "ativa",
  },
  {
    aluno: { nome: "Isabela Santos", email: "isabela.s@email.com" },
    curso: { nome: "Design de Interação", instrutor: "Prof. Gladimir" },
    data_inscricao: new Date("2025-06-01"),
    status: "arquivada",
  },
  {
    aluno: { nome: "Gabriel Red", email: "gabriel.red@email.com" },
    curso: { nome: "Desenvolvimento de APIs", instrutor: "Prof. Souza" },
    data_inscricao: new Date("2025-06-15"),
    status: "ativa",
  },
]);

-- 12a
db.inscricoes.find({ "curso.nome": /Dados/ });

-- 12b
db.inscricoes.find({ "aluno.nome": /^A/ });

-- 13
db.inscricoes.updateMany({"curso.instrutor": "Prof. Souza"}, {$set: {"status": "em espera"}});

-- 14

