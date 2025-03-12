DROP DATABASE IF EXISTS av;

CREATE DATABASE IF NOT EXISTS av;

USE av;

CREATE TABLE disciplina (
    id INT AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    creditos INT,
    PRIMARY KEY (id)
);

CREATE TABLE aluno (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE nota (
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    valor DECIMAL(5, 2),
    PRIMARY KEY (aluno_id, disciplina_id),
    FOREIGN KEY (aluno_id) REFERENCES aluno(id),
    FOREIGN KEY (disciplina_id) REFERENCES disciplina(id)
);

INSERT INTO
    disciplina(nome, creditos)
VALUES
    ('Matemática', 4);

INSERT INTO
    disciplina(nome, creditos)
VALUES
    ('Português', 3);

INSERT INTO
    disciplina(nome, creditos)
VALUES
    ('Ciências', 3);

INSERT INTO
    disciplina(nome, creditos)
VALUES
    ('História', 2);

INSERT INTO
    aluno(nome, matricula)
VALUES
    ('Ana Oliveira', '3023001');

INSERT INTO
    aluno(nome, matricula)
VALUES
    ('Carlos Silva', '9023002');

INSERT INTO
    aluno(nome, matricula)
VALUES
    ('Maria Santos', '4023008');

INSERT INTO
    aluno(nome, matricula)
VALUES
    ('Pedro Almeida', '2023007');

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (1, 1, 8.5);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (1, 3, 9.0);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (1, 4, 6.5);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (2, 1, 7.8);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (2, 3, 8.0);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (3, 1, 9.2);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (3, 2, 8.0);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (3, 3, 7.5);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (3, 4, 8.8);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (4, 1, 6.0);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (4, 2, 7.5);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (4, 3, 6.8);

INSERT INTO
    nota(aluno_id, disciplina_id, valor)
VALUES
    (4, 4, 7.2);

/* 1. Elabore uma consulta que retorne o nome do aluno ao lado do valor da nota. 
 A listagem deve ser em ordem alfabética de aluno seguido pelo nome da disciplina.
 +---------------+------------+-------+
 | aluno         | disciplina | valor |
 +---------------+------------+-------+
 | Ana Oliveira  | Ciências   |  9.00 |
 | Ana Oliveira  | História   |  6.50 |
 | Ana Oliveira  | Matemática |  8.50 |
 | Carlos Silva  | Ciências   |  8.00 |
 | Carlos Silva  | Matemática |  7.80 |
 | Maria Santos  | Ciências   |  7.50 |
 | Maria Santos  | História   |  8.80 |
 | Maria Santos  | Matemática |  9.20 |
 | Maria Santos  | Português  |  8.00 |
 | Pedro Almeida | Ciências   |  6.80 |
 | Pedro Almeida | História   |  7.20 |
 | Pedro Almeida | Matemática |  6.00 |
 | Pedro Almeida | Português  |  7.50 |
 +---------------+------------+-------+*/
SELECT
    aluno.nome AS "aluno",
    disciplina.nome AS "disciplina",
    nota.valor
FROM
    aluno
    INNER JOIN nota ON aluno.id = nota.aluno_id
    INNER JOIN disciplina ON nota.disciplina_id = disciplina.id
ORDER BY
    aluno.nome,
    disciplina.nome;

/* 2. Escreva uma consulta que traga a média de notas de cada aluno. 
 A listagem deve ser em ordem alfabética de aluno.
 +---------------+-------------+
 | aluno         | media_notas |
 +---------------+-------------+
 | Ana Oliveira  |    8.000000 |
 | Carlos Silva  |    7.900000 |
 | Maria Santos  |    8.375000 |
 | Pedro Almeida |    6.875000 |
 +---------------+-------------+*/
SELECT
    aluno.nome AS "aluno",
    AVG(nota.valor) AS "media_notas"
FROM
    aluno
    INNER JOIN nota ON aluno.id = nota.aluno_id
GROUP BY
    aluno.nome
ORDER BY
    aluno.nome;

/* 3. Elabore uma consulta que retorne o nome da disciplina e a quantidade de alunos que a cursam. 
 Os dados devem ser agrupados por disciplina e em ordem alfabética de disciplina.
 +------------+------------------+
 | disciplina | Número de Alunos |
 +------------+------------------+
 | Ciências   |                4 |
 | História   |                3 |
 | Matemática |                4 |
 | Português  |                2 |
 +------------+------------------+*/
SELECT
    disciplina.nome AS "disciplina",
    COUNT(aluno.id) AS "Número de Alunos"
FROM
    disciplina
    INNER JOIN nota ON disciplina.id = nota.disciplina_id
    INNER JOIN aluno ON nota.aluno_id = aluno.id
GROUP BY
    disciplina.nome
ORDER BY
    disciplina.nome;

/* 4. Usando (LIMIT 1 ou IN), escreva uma consulta que retorne o nome da disciplina e o valor da nota mais baixa.
 +------------+------------+
 | disciplina | menor_nota |
 +------------+------------+
 | Matemática |       6.00 |
 +------------+------------+*/
SELECT
    disciplina.nome AS "disciplina",
    nota.valor AS "menor_nota"
FROM
    disciplina
    INNER JOIN nota ON disciplina.id = nota.disciplina_id
WHERE
    nota.valor IN (
        SELECT
            MIN(valor)
        FROM
            nota
    );

-- ou

SELECT
    disciplina.nome AS "disciplina",
    nota.valor AS "menor_nota"
FROM
    disciplina
    INNER JOIN nota ON disciplina.id = nota.disciplina_id
ORDER BY
    nota.valor
LIMIT
    1;

/* 5. Escreva um script para duplicar o número de créditos de cada disciplina.*/
UPDATE
    disciplina
SET
    creditos = creditos * 2;
