-- BD2 - Simulado1

DROP DATABASE IF EXISTS simulado1;
CREATE DATABASE simulado1;
USE simulado1;

-- Tabela de livros
CREATE TABLE livro (
    id     INT AUTO_INCREMENT,
    titulo VARCHAR(100),
    autor  VARCHAR(100),
    qtd_exemplares INT,
    PRIMARY KEY (id)
);

-- Tabela de usuários
CREATE TABLE usuario (
    id    INT AUTO_INCREMENT,
    nome  VARCHAR(100),
    email VARCHAR(100),
    PRIMARY KEY (id)
);

-- Tabela de empréstimos
CREATE TABLE emprestimo (
    id              INT AUTO_INCREMENT,
    id_livro        INT,
    id_usuario      INT,
    data_emprestimo DATE,
    data_devolucao  DATE DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_livro)   REFERENCES livro(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

-- Inserção de dados
INSERT INTO livro (titulo, autor, qtd_exemplares) VALUES
('O Tronco do Ipê', 'José de Alencar', 5),
('Dom Casmurro', 'Machado de Assis', 3),
('Quincas Berro D`Água', 'Jorge Amado', 4),
('O Escaravelho do Diabo', 'Lúcia Machado de Almeida', 2),
('O Guarani', 'José de Alencar', 5),
('Robinson Crusoé', 'Daniel Defoe', 6),
('O Sítio do Picapau Amarelo', 'Monteiro Lobato', 7),
('O Cachorrinho Samba na Fazenda', 'Maria José Dupré', 3),
('A Moreninha', 'Joaquim Manuel de Macedo', 4),
('Memórias de um Sargento de Milícias', 'Manuel Antônio de Almeida', 5);

INSERT INTO usuario (nome, email) VALUES
('Juan Ivanov', 'juan@gmail.com'),
('Miguel Petrov', 'miguel@gmail.com'),
('Pedro Smirnov', 'pedro@gmail.com'),
('Ana Kuznetsova', 'ana@gmail.com'),
('José Pavlov', 'jose@gmail.com'),
('Carlos Romanov', 'carlos@gmail.com'),
('Maria Volkov', 'maria@gmail.com'),
('Sofia Fedorova', 'sofia@gmail.com'),
('Luis Popov', 'luis@gmail.com'),
('Gabriela Sokolov', 'gabriela@gmail.com');

-- RESPONDA/RESOLVA:

/* 1. Crie o trigger trg_diminuir_exemplar_emprestimo
      que diminui a quantidade de exemplares ao registrar um empréstimo. */

/* 2. Crie o trigger trg_aumentar_exemplar_devolucao
      que aumenta a quantidade de exemplares ao devolver um livro. */

/* 3. Crie a procedure proc_livros_emprestados_por_usuario(id_usuario INT)
      que exibe a quantidade de livros emprestados por um usuário. */

/* 4. Faça uma consulta que retorne o título dos livros 
      que possuem mais de 3 cópias disponíveis. */

/* 5. Faça uma consulta que retorne os usuários 
      que não realizaram nenhum empréstimo. */

/* 6. Crie a procedure proc_usuarios_com_devolucao()
      que exibe todos os usuários que já devolveram livros. */

/* 7. Crie o trigger trg_bloquear_emprestimo_sem_exemplar
      que impede empréstimos quando não houver cópias disponíveis. */

/* 8. Faça uma consulta que retorne os livros 
      que nunca foram emprestados. */

/* 9. Crie o trigger trg_registrar_data_devolucao
      que registra automaticamente a data de devolução ao atualizar o empréstimo. */

/* 10. Faça uma consulta que retorne todos os empréstimos 
       realizados no último mês. */

/* 11. Crie a procedure proc_novo_emprestimo(id_livro INT, id_usuario INT)
       que insere um novo empréstimo e retorna uma mensagem de disponibilidade. */

/* 12. Desabilite o autocommit e realize uma transação manual:
       insira um empréstimo e depois faça um ROLLBACK. */

/* 13. Faça uma consulta com que retorna todos os livros com as cópias disponíveis */

/* 14. Crie o usuário bibliotecario e conceda permissões de INSERT, UPDATE e DELETE
       em todas as tabelas do banco simulado1. */

/* 15. Revogue a permissão de DELETE do usuário bibliotecario. */
