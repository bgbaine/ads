/* -----------------------------
MySQL
----------------------------- */

/*
Conectar ao MySQL via terminal
mysql -u root -p
-u root: Define o nome de usuário, neste exemplo, 'root'.
-p: Solicita a senha para o usuário.
*/

/* Deletar/excluir (drop) um banco de dados */
DROP DATABASE IF EXISTS aula;
-- Remove o banco de dados especificado, caso ele exista.
-- Todos os dados do banco serão excluídos.

/* Criar um banco de dados */
CREATE DATABASE aula;
-- Cria um novo banco de dados chamado 'aula'.

/* Acessar um banco de dados */
USE aula;

/* Mostrar todos os bancos de dados existentes no servidor MySQL */
SHOW DATABASES;
-- Exibe a lista de todos os bancos de dados disponíveis no servidor MySQL.

/* Criar uma tabela chamada usuario */
CREATE TABLE usuario (
    id              INT AUTO_INCREMENT,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(100) UNIQUE, 
    data_nascimento DATE,
    genero          ENUM('Masculino', 'Feminino', 'Outro'),
    PRIMARY KEY (id)
);

/* O tipo ENUM permite definir uma lista de valores permitidos.
Um campo do tipo ENUM pode armazenar apenas um desses valores.
Neste caso, o campo 'genero' só pode conter: 'Masculino', 'Feminino' ou 'Outro'.
É útil quando o campo deve ter um valor fixo entre opções pré-definidas. */

/* Criar uma tabela chamada contato, relacionada com a tabela usuario */
CREATE TABLE contato (
    id              INT AUTO_INCREMENT,
    usuario_id      INT,
    telefone        VARCHAR(15),
    tipo_contato    ENUM('Pessoal', 'Trabalho', 'Outro'),
    preferencias    SET('Email', 'Telefone', 'SMS'),
    PRIMARY KEY (id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    CHECK (LENGTH(telefone) >= 8)
);

/* O tipo SET permite armazenar uma combinação de valores predefinidos.
Diferente de ENUM, um campo SET pode conter múltiplos valores de uma vez.
No campo 'preferencias', o usuário pode escolher uma ou mais
formas de contato: 'Email', 'Telefone', 'SMS'. */

/* A restrição CHECK permite definir condições que os valores do campo devem satisfazer.
Neste exemplo, o campo 'telefone' deve ter pelo menos 8 caracteres.
O MySQL verifica essa condição sempre que um valor for inserido ou atualizado. */

/* Mostrar todas as tabelas do banco de dados atual */
SHOW TABLES;
-- Exibe a lista de todas as tabelas criadas dentro do banco de dados atualmente em uso.

/* Mostrar a estrutura de uma tabela */
DESC usuario;
-- ou
DESCRIBE contato;
-- Exibe a estrutura da tabela 'usuario', mostrando os nomes dos campos, tipos de dados, chaves, etc.

/* Inserir dados em uma tabela */

-- Inserir simples com valores especificados
INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES ('Gladi Miro', 'gladi.miro@email.com', '2006-01-01', 'Masculino');

-- Inserir múltiplos registros
INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES
('Angelo', 'angel.o@email.com', '2002-12-11', 'Masculino'),
('Edecinho', 'ede.cinho@email.com', '1892-05-20', 'Outro');

-- Inserir dados sem informar o id, deixando o AUTO_INCREMENT gerar automaticamente
INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES ('Pedro Augusto', 'pedro.augusto@email.com', '1996-11-05', 'Masculino');

/* Inserir dados na tabela relacionada (contato) */
INSERT INTO contato (usuario_id, telefone, tipo_contato, preferencias)
VALUES
(3, '321-1234', 'Pessoal', 'Email,Telefone'),  -- Exemplo de SET com múltiplos valores
(3, '123-5678', 'Trabalho', 'SMS'),
(2, '456-5678', 'Pessoal', 'SMS'),
(1, '789-9012', 'Outro', 'Email,SMS');

/* Atualizar dados em uma tabela */
UPDATE usuario
SET email = 'novo.email@email.com'
WHERE nome = 'Gladi Miro';

/* Deletar dados de uma tabela */
DELETE FROM contato
WHERE id = 2;
-- Dica: sempre use uma condição (WHERE) para evitar deletar todos os dados acidentalmente.

/* Consultar/Selecionar de dados em uma tabela */

-- Selecionar todos os registros
SELECT * FROM usuario;

-- Selecionar registros com condição
SELECT * FROM usuario WHERE email LIKE '%@email.com%';

-- Selecionar registros com ordenação por data de nascimento (mais recentes primeiro)
SELECT * FROM usuario ORDER BY data_nascimento DESC;

/* Subconsultas */

-- Exemplo: Selecionar usuários mais novos que 'Gladi Miro'
SELECT nome, data_nascimento
FROM usuario
WHERE data_nascimento > (SELECT data_nascimento FROM usuario WHERE nome = 'Gladi Miro');

/* Alterar a estrutura de uma tabela existente */

-- Adicionar uma nova coluna
ALTER TABLE usuario ADD cpf VARCHAR(14);

-- Alterar o tipo de uma coluna
ALTER TABLE usuario MODIFY COLUMN nome VARCHAR(150);

-- Renomear uma tabela
ALTER TABLE usuario RENAME TO usuarios_renomeada;
ALTER TABLE usuarios_renomeada RENAME TO usuario;

/* AGREGAÇÃO (GROUP BY, FUNÇÕES DE AGREGADO) */

/* Exemplo de contagem de usuários por gênero */
SELECT genero, COUNT(*) AS total_por_genero
FROM usuario
GROUP BY genero;
-- GROUP BY agrupa por gênero; COUNT(*) conta quantos registros há em cada grupo.

/* Exemplo de média de idade dos usuários (considerando data de nascimento) */
SELECT AVG(DATEDIFF(CURDATE(), data_nascimento) / 365) AS media_idade
FROM usuario;
-- DATEDIFF calcula diferença em dias entre hoje e data de nascimento.
-- Dividimos por 365 para converter em anos; AVG calcula a média.

/* Exemplo de soma total de contatos por usuário */
SELECT u.nome, COUNT(c.id) AS total_contatos
FROM usuario u
LEFT JOIN contato c ON u.id = c.usuario_id
GROUP BY u.nome;
-- LEFT JOIN garante que apareçam usuários mesmo sem contatos.
-- COUNT(c.id) conta somente quando há contato (id não nulo).

/* JOINs (INNER JOIN, LEFT JOIN, RIGHT JOIN) */

/* INNER JOIN: retorna apenas usuários que têm pelo menos um contato */
SELECT u.id, u.nome, c.telefone, c.tipo_contato
FROM usuario u
INNER JOIN contato c ON u.id = c.usuario_id;

/* LEFT JOIN: retorna todos os usuários, com seus contatos (quando existirem) */
SELECT u.id, u.nome, c.telefone, c.tipo_contato
FROM usuario u
LEFT JOIN contato c ON u.id = c.usuario_id;

/* RIGHT JOIN: retorna todos os contatos, com seu usuário (quando existir) */
SELECT u.id AS usuario_id, u.nome, c.telefone, c.tipo_contato
FROM usuario u
RIGHT JOIN contato c ON u.id = c.usuario_id;

/* TRIGGER (gatilho em MySQL) */

/* Exemplo: criar uma trigger que impede inserir contato com telefone menor que 8 dígitos */
DELIMITER $$
CREATE TRIGGER trg_contato_telefone_check
BEFORE INSERT ON contato
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH(NEW.telefone) < 8 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Telefone deve ter ao menos 8 caracteres';
    END IF;
END;
$$
DELIMITER ;
/* Explicação:
- BEFORE INSERT: executa antes de inserir cada linha em 'contato'.
- NEW.telefone: refere-se ao valor que está sendo inserido.
- SIGNAL SQLSTATE: gera um erro personalizado, abortando a inserção. */

/* PROCEDURE SIMPLES (sem parâmetros) */

/* Exemplo de procedure que retorna o total de usuários cadastrados */
DELIMITER $$
CREATE PROCEDURE sp_total_usuarios()
BEGIN
    SELECT COUNT(*) AS total_usuarios FROM usuario;
END;
$$
DELIMITER ;

/* Para executar: */
CALL sp_total_usuarios();

/* PROCEDURE USANDO IF (com parâmetros de entrada) */

/*
Exemplo: procedure que recebe o ID de um usuário
e retorna quantos contatos ele possui; se o usuário não existir,
retorna mensagem informando isso.
*/
DELIMITER $$
CREATE PROCEDURE sp_contatos_por_usuario(IN p_usuario_id INT)
BEGIN
    DECLARE v_total INT;
    -- Verifica se existe usuário com o ID dado
    IF EXISTS (SELECT 1 FROM usuario WHERE id = p_usuario_id) THEN
        SELECT COUNT(*) INTO v_total
        FROM contato
        WHERE usuario_id = p_usuario_id;
        SELECT CONCAT('Usuário ID=', p_usuario_id, ' tem ', v_total, ' contato(s).') AS mensagem;
    ELSE
        SELECT CONCAT('Usuário ID=', p_usuario_id, ' não encontrado.') AS mensagem;
    END IF;
END;
$$
DELIMITER ;

/* Exemplo de chamada (usuário existe) */
CALL sp_contatos_por_usuario(3);

/* Exemplo de chamada (usuário não existe) */
CALL sp_contatos_por_usuario(999);

/* ÍNDICES (Indexes em MySQL) */

/* Exemplo de criação de índice simples em coluna 'email' */
CREATE INDEX idx_usuario_email ON usuario(email);
-- Índices ajudam a acelerar consultas de busca (WHERE email = '...').

/* Exemplo de índice composto em 'usuario_id' e 'tipo_contato' */
CREATE INDEX idx_contato_usuario_tipo ON contato(usuario_id, tipo_contato);

/* Exemplo de remoção de índice */
DROP INDEX idx_usuario_email ON usuario;

/* VIEWS (Visões em MySQL) */

/* Criar view que mostra nome do usuário e total de contatos */
CREATE VIEW vw_usuario_contatos AS
SELECT u.id AS usuario_id, u.nome, COUNT(c.id) AS total_contatos
FROM usuario u
LEFT JOIN contato c ON u.id = c.usuario_id
GROUP BY u.id, u.nome;

/* Consultar a view */
SELECT * FROM vw_usuario_contatos;

/* Remover view */
DROP VIEW vw_usuario_contatos;

/* TRANSAÇÕES (BEGIN/COMMIT/ROLLBACK em MySQL) */

/* Exemplo de transação atômica: inserir usuário e contato relacionado */
START TRANSACTION;

INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES ('TransTest', 'trans@test.com', '1990-01-01', 'Outro');

INSERT INTO contato (usuario_id, telefone, tipo_contato, preferencias)
VALUES (LAST_INSERT_ID(), '555-2222', 'Pessoal', 'Email');

COMMIT;
/* Se ocorrer erro entre as operações, usar ROLLBACK para desfazer tudo. */


/* BACKUP E RESTORE (Terminal MySQL) */

-- Fazer dump de todo o banco ‘aula’ para arquivo .sql
mysqldump -u root -p aula > aula_backup.sql

-- Restaurar a partir do arquivo (o banco 'aula' deve existir, mas pode estar vazio ou ser sobrescrito)
mysql -u root -p aula < aula_backup.sql


/* EXPLAIN (Planejamento de Consulta em MySQL) */

/* Mostrar plano de execução para consulta */
EXPLAIN SELECT * FROM usuario WHERE email = 'gladi.miro@email.com';
-- Revela se está usando índice ou fazendo full table scan.

/* PERMISSÕES EM SQL (GRANT, REVOKE em MySQL) */

/* Criar usuário e definir permissões */
CREATE USER IF NOT EXISTS 'aluno'@'localhost' IDENTIFIED BY 'senha123';

-- Conceder permissões ao usuário 'aluno' para o banco 'aula' 
GRANT SELECT, INSERT, UPDATE, DELETE ON aula.* TO 'aluno'@'localhost';

-- Conceder permissão de criação de tabela e índice 
GRANT CREATE, INDEX ON aula.* TO 'aluno'@'localhost';

-- Revogar permissão 
REVOKE DELETE ON aula.* FROM 'aluno'@'localhost';

/* Aplicar mudanças de privilégios */
FLUSH PRIVILEGES;



/* -----------------------------
PostgreSQL
----------------------------- */

-- Conectar ao PostgreSQL (exemplo via psql)
-- psql -U seu_usuario -d nome_do_banco -h localhost
-- Para listar bancos: \l
-- Para conectar a um banco: \c nome_do_banco
-- Para listar tabelas no banco conectado: \dt

/* Deletar/excluir (drop) um banco de dados */
DROP DATABASE IF EXISTS aula_pg; 

/* Criar um banco de dados */
CREATE DATABASE aula_pg;

-- Acessar um banco de dados
-- \c aula_pg
-- Ou conecte-se diretamente ao criar a conexão: psql -U seu_usuario -d aula_pg

/* Limpar tabelas e tipos se existirem de execuções anteriores (para script ser re-executável) */
DROP TABLE IF EXISTS contato_pg CASCADE;
DROP TABLE IF EXISTS usuario_pg CASCADE;
DROP TYPE IF EXISTS tipo_genero_pg CASCADE;
DROP TYPE IF EXISTS tipo_contato_enum_pg CASCADE;

/* Criar um tipo ENUM para genero */
CREATE TYPE tipo_genero_pg AS ENUM ('Masculino', 'Feminino', 'Outro');

/* Criar uma tabela chamada usuario_pg */
CREATE TABLE usuario_pg (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(100) UNIQUE,
    data_nascimento DATE,
    genero          tipo_genero_pg -- Usando o tipo ENUM criado
    -- ou genero VARCHAR(10) CHECK (genero IN ('Masculino', 'Feminino', 'Outro'))
);

/* Criar um tipo ENUM para tipo_contato */
CREATE TYPE tipo_contato_enum_pg AS ENUM ('Pessoal', 'Trabalho', 'Outro');

/* Criar uma tabela chamada contato_pg, relacionada com a tabela usuario_pg */
CREATE TABLE contato_pg (
    id              SERIAL PRIMARY KEY,
    usuario_id      INT REFERENCES usuario_pg(id) ON DELETE CASCADE,
    telefone        VARCHAR(15),
    tipo_contato    tipo_contato_enum_pg,
    preferencias    TEXT[], -- Adaptado de SET para ARRAY de TEXT
    CHECK (CHAR_LENGTH(telefone) >= 8)
);

/* Inserir dados para teste */
INSERT INTO usuario_pg (nome, email, data_nascimento, genero) VALUES
('Gladi Miro PG', 'gladi.miro.pg@email.com', '2006-01-01', 'Masculino'),
('Angelo PG', 'angel.o.pg@email.com', '2002-12-11', 'Masculino'),
('Edecinho PG', 'ede.cinho.pg@email.com', '1892-05-20', 'Outro'),
('Pedro Augusto PG', 'pedro.augusto.pg@email.com', '1996-11-05', 'Masculino');

INSERT INTO contato_pg (usuario_id, telefone, tipo_contato, preferencias) VALUES
((SELECT id from usuario_pg WHERE nome = 'Edecinho PG'), '321-1234', 'Pessoal', ARRAY['Email','Telefone']),
((SELECT id from usuario_pg WHERE nome = 'Edecinho PG'), '123-5678', 'Trabalho', ARRAY['SMS']),
((SELECT id from usuario_pg WHERE nome = 'Angelo PG'), '456-5678', 'Pessoal', ARRAY['SMS']),
((SELECT id from usuario_pg WHERE nome = 'Gladi Miro PG'), '789-9012', 'Outro', ARRAY['Email','SMS']);

/* AGREGAÇÃO (GROUP BY, FUNÇÕES DE AGREGADO) */

/* Exemplo de contagem de usuários por gênero */
SELECT genero, COUNT(*) AS total_por_genero
FROM usuario_pg
GROUP BY genero;

/* Exemplo de média de idade dos usuários */
SELECT AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, data_nascimento))) AS media_idade
FROM usuario_pg;
/* AGE retorna intervalo entre datas; EXTRACT(YEAR FROM ...) extrai anos. */

/* Exemplo de soma total de contatos por usuário */
SELECT u.nome, COUNT(c.id) AS total_contatos
FROM usuario_pg u
LEFT JOIN contato_pg c ON u.id = c.usuario_id
GROUP BY u.nome;

/* JOINs (INNER JOIN, LEFT JOIN, RIGHT JOIN) */

/* INNER JOIN: retorna apenas usuários que têm pelo menos um contato */
SELECT u.id, u.nome, c.telefone, c.tipo_contato
FROM usuario_pg u
INNER JOIN contato_pg c ON u.id = c.usuario_id;

/* LEFT JOIN: retorna todos os usuários, com seus contatos (quando existirem) */
SELECT u.id, u.nome, c.telefone, c.tipo_contato
FROM usuario_pg u
LEFT JOIN contato_pg c ON u.id = c.usuario_id;

/* RIGHT JOIN: retorna todos os contatos, com seu usuário (quando existir) */
SELECT u.id AS usuario_id, u.nome, c.telefone, c.tipo_contato
FROM usuario_pg u
RIGHT JOIN contato_pg c ON u.id = c.usuario_id;

/* TRIGGER (gatilho em PostgreSQL) */

/*
Exemplo: criar uma trigger que impede inserir contato com telefone
menor que 8 caracteres.
No PostgreSQL, precisamos criar uma função associada ao trigger.
*/
-- Criar função para checar telefone
CREATE OR REPLACE FUNCTION fn_contato_telefone_check_pg()
RETURNS TRIGGER AS $$
BEGIN
    IF CHAR_LENGTH(NEW.telefone) < 8 THEN
        RAISE EXCEPTION 'Telefone deve ter ao menos 8 caracteres';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger usando a função acima
CREATE TRIGGER trg_contato_telefone_check_pg
BEFORE INSERT ON contato_pg
FOR EACH ROW
EXECUTE FUNCTION fn_contato_telefone_check_pg();

/* PROCEDURE SIMPLES */

/*
Exemplo: função que retorna o total de usuários cadastrados.
No PostgreSQL 11+ existem PROCEDUREs nativas, mas aqui usaremos FUNCTION.
*/
CREATE OR REPLACE FUNCTION fn_total_usuarios_pg()
RETURNS TABLE(total_usuarios BIGINT) AS $$
BEGIN
    RETURN QUERY SELECT COUNT(*) FROM usuario_pg;
END;
$$ LANGUAGE plpgsql;

/* Para chamar: */
SELECT * FROM fn_total_usuarios_pg();

/* PROCEDURE USANDO IF (com parâmetros de entrada) - Função no PostgreSQL */

/*
Exemplo: função que recebe o ID de um usuário
e retorna quantos contatos ele possui; se o usuário não existir,
retorna texto informativo.
*/
CREATE OR REPLACE FUNCTION fn_contatos_por_usuario_pg(p_usuario_id INT)
RETURNS TEXT AS $$
DECLARE
    v_total INT;
BEGIN
    IF EXISTS (SELECT 1 FROM usuario_pg WHERE id = p_usuario_id) THEN
        SELECT COUNT(*) INTO v_total
        FROM contato_pg
        WHERE usuario_id = p_usuario_id;
        RETURN FORMAT('Usuário ID=%s tem %s contato(s).', p_usuario_id, v_total);
    ELSE
        RETURN FORMAT('Usuário ID=%s não encontrado.', p_usuario_id);
    END IF;
END;
$$ LANGUAGE plpgsql;

/* Para chamar (usuário existe) */
SELECT fn_contatos_por_usuario_pg((SELECT id FROM usuario_pg WHERE nome = 'Edecinho PG'));
/* Para chamar (usuário não existe) */
SELECT fn_contatos_por_usuario_pg(999);

/* ÍNDICES (Indexes em PostgreSQL) */

/* Exemplo de criação de índice simples em coluna 'email' */
CREATE INDEX IF NOT EXISTS idx_usuario_pg_email ON usuario_pg(email);

/* Exemplo de índice composto em 'usuario_id' e 'tipo_contato' */
CREATE INDEX IF NOT EXISTS idx_contato_pg_usuario_tipo ON contato_pg(usuario_id, tipo_contato);

/* Exemplo de remoção de índice */
DROP INDEX IF EXISTS idx_usuario_pg_email;

/* VIEWS (Visões em PostgreSQL) */

/* Criar view que mostra nome do usuário e total de contatos */
CREATE OR REPLACE VIEW vw_usuario_contatos_pg AS
SELECT u.id, u.nome, COUNT(c.id) AS total_contatos
FROM usuario_pg u
LEFT JOIN contato_pg c ON u.id = c.usuario_id
GROUP BY u.id, u.nome;

/* Consultar a view */
SELECT * FROM vw_usuario_contatos_pg;

/* Remover view */
DROP VIEW IF EXISTS vw_usuario_contatos_pg;

/* TRANSAÇÕES (BEGIN/COMMIT/ROLLBACK em PostgreSQL) */

/* Exemplo de transação atômica: inserir usuário e contato relacionado */
BEGIN;

INSERT INTO usuario_pg (nome, email, data_nascimento, genero)
VALUES ('TransTestPG', 'transpg@test.com', '1989-02-02', 'Outro') RETURNING id; -- Usar RETURNING id para pegar o ID

INSERT INTO contato_pg (usuario_id, telefone, tipo_contato, preferencias)
VALUES (CURRVAL(pg_get_serial_sequence('usuario_pg','id')), '555-3333', 'Pessoal', ARRAY['Telefone']);

COMMIT;
/* Em caso de erro: ROLLBACK; */

/* BACKUP E RESTORE (Terminal PostgreSQL) */

-- Fazer backup do banco ‘aula_pg’ (substitua 'seu_usuario' e 'aula_pg' se necessário)
pg_dump -U seu_usuario -h localhost aula_pg > aula_pg_backup.sql

-- Restaurar (substitua 'seu_usuario' e 'aula_pg' se necessário)
psql -U seu_usuario -h localhost aula_pg < aula_pg_backup.sql


/* -----------------------------
MongoDB / NoSQL
----------------------------- */

/* Criar/Selecionar banco de dados */
use aula_mongo; 
// No mongosh ou mongo shell. Cria se não existir e seleciona.

/* Limpar coleções de execuções anteriores (para script ser re-executável no mongosh) */
db.usuario.drop();
db.contato.drop();
// Removido db.usuario_valido.drop() pois não há criação/uso dessa coleção no exemplo.

/* Criar coleções explicitamente (opcional, pois insert cria automaticamente) */
db.createCollection('usuario');
db.createCollection('contato');

/* Inserir documentos na coleção 'usuario' */

/* Inserir um usuário simples */
db.usuario.insertOne({
    nome: 'Gladi Miro Mongo',
    email: 'gladi.miro.mongo@email.com',
    data_nascimento: new Date('1968-07-27T09:30:00Z'), // Usar new Date() ou ISODate() para datas
    genero: 'Masculino',
    criado_em: new Date()
});

/* Inserir múltiplos usuários */
db.usuario.insertMany([
    {
        nome: 'Angelo Mongo',
        email: 'angel.o.mongo@email.com',
        data_nascimento: new Date('2002-12-11T00:00:00Z'),
        genero: 'Masculino',
        criado_em: new Date()
    },
    {
        nome: 'Edecinho Mongo',
        email: 'ede.cinho.mongo@email.com',
        data_nascimento: new Date('1892-05-20T00:00:00Z'),
        genero: 'Outro',
        criado_em: new Date()
    },
    {
        nome: 'Pedro Augusto Mongo',
        email: 'pedro.augusto.mongo@email.com',
        data_nascimento: new Date('1996-11-05T00:00:00Z'),
        genero: 'Masculino',
        criado_em: new Date()
    }
]);

/* Atualizar documento - equivalente a UPDATE SQL */
db.usuario.updateOne(
    { nome: 'Gladi Miro Mongo' },
    { $set: { email: 'novo.email.mongo@email.com' } }
);
/* $set altera apenas o campo especificado. */

// --- Exemplo de como obter o _id de um usuário para uso em outras operações ---
let pedroAugusto = db.usuario.findOne({ nome: 'Pedro Augusto Mongo' }, { _id: 1 });
let pedroAugustoId = pedroAugusto ? pedroAugusto._id : null;

// Exemplo de inserção de contato para o usuário 'Pedro Augusto Mongo'
if (pedroAugustoId) {
    db.contato.insertOne({
        usuario_id: pedroAugustoId,
        telefone: '123-5678',
        tipo_contato: 'Pessoal',
        preferencias: ['Email', 'Telefone']
    });
}
// -----------------------------------------------------------------------------

/* Excluir documento - equivalente a DELETE SQL */
if (pedroAugustoId) { // Garante que só executa se o ID foi encontrado
    db.contato.deleteOne({ telefone: '123-5678', usuario_id: pedroAugustoId });
}
/* Exclui o primeiro documento que corresponder à condição. */

/* Consultas com find */

/* Selecionar todos os usuários */
db.usuario.find();

/* Selecionar usuários com gênero 'Masculino' */
db.usuario.find({ genero: 'Masculino' });

/* Selecionar contatos de um usuário específico (Pedro Augusto Mongo) */
if (pedroAugustoId) { // Garante que só executa se o ID foi encontrado
    db.contato.find({ usuario_id: pedroAugustoId });
}

/* countDocuments - equivalente a SELECT COUNT(*) */

/* Contar quantos usuários existem */
db.usuario.countDocuments();