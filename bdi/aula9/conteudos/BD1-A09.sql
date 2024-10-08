/*
  Conectar ao MySQL via terminal
  
  mysql -u root -p
  
  -u root: Define o nome de usuário, neste exemplo, 'root'.
  -p: Solicita a senha para o usuário.
*/

/* Deletar/excluir (drop) um banco de dados */
DROP DATABASE IF EXISTS aula09;
-- Remove o banco de dados especificado, caso ele exista.
-- Todos os dados do banco serão excluídos.

/* Criar um banco de dados */
CREATE DATABASE aula09;
-- Cria um novo banco de dados chamado 'aula09'.

/* Acessar um banco de dados */
USE aula09;

/* Mostrar todos os bancos de dados existentes no servidor MySQL */
SHOW DATABASES;
-- Exibe a lista de todos os bancos de dados disponíveis no servidor MySQL.

/* Criar uma tabela chamada usuario */
CREATE TABLE usuario (
    id              INT AUTO_INCREMENT,
    nome            VARCHAR(100) NOT NULL,
    email           VARCHAR(100),
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
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
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
/* ou */
DESCRIBE contato;
-- Exibe a estrutura da tabela 'usuario', mostrando os nomes dos campos, tipos de dados, chaves, etc.

/* Inserir dados em uma tabela */

-- Inserir simples com valores especificados
INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES ('Gladi Miro', 'gladi.miro@email.com', '2006-01-01', 'Masculino');

-- Inserir múltiplos registros
INSERT INTO usuario (nome, email, data_nascimento, genero)
VALUES 
('Angel o', 'angel.o@email.com', '2002-12-11', 'Masculino'),
('Ede cinho', 'ede.cinho@email.com', '1892-05-20', 'Outro');

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

-- Selecionar nomes de usuários que têm data de nascimento posterior à média
SELECT nome FROM usuario WHERE data_nascimento > (SELECT AVG(data_nascimento) FROM usuario);

/* Alterar a estrutura de uma tabela existente */

-- Adicionar uma nova coluna
ALTER TABLE usuario ADD cpf VARCHAR(14);

-- Alterar o tipo de uma coluna
ALTER TABLE usuario MODIFY COLUMN nome VARCHAR(150);

-- Renomear uma tabela
ALTER TABLE usuario RENAME TO nova_tabela;
