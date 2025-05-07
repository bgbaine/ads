-- ATIVIDADE AULA 09 – CONTROLE DE ACESSO

/* 1. Crie um banco de dados chamado aula09. */

/* 2. Crie as tabelas a seguir com as estruturas apresentadas: */

-- usuario
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| nome  | varchar(45)  | NO   |     | NULL    |                |
| email | varchar(255) | NO   |     | NULL    |                |
| fone  | varchar(20)  | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+

-- forum
+--------------+-------------+------+-----+---------+----------------+
| Field        | Type        | Null | Key | Default | Extra          |
+--------------+-------------+------+-----+---------+----------------+
| id           | int         | NO   | PRI | NULL    | auto_increment |
| titulo       | varchar(45) | NO   |     | NULL    |                |
| data_criacao | date        | NO   |     | NULL    |                |
+--------------+-------------+------+-----+---------+----------------+

-- postagem
+---------------+------+------+-----+---------+-------+
| Field         | Type | Null | Key | Default | Extra |
+---------------+------+------+-----+---------+-------+
| usuario_id    | int  | NO   | MUL | NULL    |       |
| forum_id      | int  | NO   | MUL | NULL    |       |
| mensagem      | text | NO   |     | NULL    |       |
| data_postagem | date | NO   |     | NULL    |       |
+---------------+------+------+-----+---------+-------+

/* 3. Crie o usuário "moderador", com senha "123teste", e conceda a ele 
permissões de INSERT, UPDATE e DELETE em todas as tabelas do banco aula09. */

/* 4. Crie o usuário "pikachu", com senha "teste123", e conceda a ele 
permissão apenas de SELECT na coluna "mensagem" da tabela "postagem". */

/* 5. Crie o usuário "maverick", com senha "topgun", com as seguintes permissões:
      - INSERT, UPDATE e DELETE nas tabelas "forum" e "postagem";
      - SELECT na tabela "usuario".
*/

/* 6. Com o usuário "moderador", insira os registros abaixo nas tabelas "usuario" e "forum": */

-- usuario
+----+--------------------+--------------------+----------+
| id | nome               | email              | fone     |
+----+--------------------+--------------------+----------+
|  1 | Andre Rieu         | dede@gmail.com     | 30324050 |
|  2 | Arthur Aguiar      | arthur@gmail.com   | 30609080 |
|  3 | Diego Maradona     | dieguito@gmail.com | 32415080 |
|  4 | Elias Elijah       | saile@gmail.com    | 32908070 |
|  5 | Gabriel (Anjo)     | gabi@gmail.com     | 32215460 |
|  6 | Humberto Gessinger | bebeto@gmail.com   | 32123212 |
|  7 | John Travolta      | jojo@gmail.com     | 32635241 |
|  8 | Mariana Rios       | anairam@gmail.com  | 32789865 |
+----+--------------------+--------------------+----------+

-- forum
+----+---------+--------------+
| id | titulo  | data_criacao |
+----+---------+--------------+
|  1 | Forum 1 | 2025-05-10   |
|  2 | Forum 2 | 2025-05-15   |
|  3 | Forum 3 | 2025-04-01   |
|  4 | Forum 4 | 2025-01-29   |
|  5 | Forum 5 | 2025-01-29   |
+----+---------+--------------+

/* 7. Com os usuários "root", "moderador", "pikachu" e "maverick", teste os seguintes comandos:
   SELECT * FROM forum;
   SELECT * FROM usuario;
   Anote os resultados e permissões de cada usuário.
*/

/* 8. Com o usuário "maverick", insira os registros abaixo na tabela "postagem": */

-- postagem
+------------+----------+-----------------------------+---------------+
| usuario_id | forum_id | mensagem                    | data_postagem |
+------------+----------+-----------------------------+---------------+
|          1 |        2 | Vendo canguru a pilha       | 2025-05-07    |
|          3 |        1 | Compro laranja sem casca    | 2025-05-07    |
|          8 |        5 | Amo muito tudo isso!        | 2025-05-07    |
|          7 |        5 | SENAC RS                    | 2025-05-07    |
|          5 |        3 | Uni SENAC Campus Pelotas    | 2025-05-07    |
|          4 |        4 | Que a força esteja conosco! | 2025-05-07    |
|          2 |        2 | Por onde anda o Obi-Wan?    | 2025-05-07    |
|          6 |        1 | Yoda!                       | 2025-05-07    |
|          1 |        4 | Satolep                     | 2025-05-07    |
|          1 |        3 | Loucurage!                  | 2025-05-07    |
+------------+----------+-----------------------------+---------------+

/* 9. Execute SELECT * FROM postagem com os usuários: "root", "moderador", "pikachu" e "maverick".
      Verifique quais usuários conseguem visualizar os dados da tabela.
*/

/* 10. Com o usuário "moderador", execute uma consulta que retorne o seguinte resultado (utilizando JOIN): */

+---------+--------------------+---------------+
| titulo  | nome               | data_postagem |
+---------+--------------------+---------------+
| Forum 1 | Diego Maradona     | 2025-05-07    |
| Forum 1 | Humberto Gessinger | 2025-05-07    |
| Forum 2 | Andre Rieu         | 2025-05-07    |
| Forum 2 | Arthur Aguiar      | 2025-05-07    |
| Forum 3 | Gabriel (Anjo)     | 2025-05-07    |
| Forum 3 | Andre Rieu         | 2025-05-07    |
| Forum 4 | Elias Elijah       | 2025-05-07    |
| Forum 4 | Andre Rieu         | 2025-05-07    |
| Forum 5 | Mariana Rios       | 2025-05-07    |
| Forum 5 | John Travolta      | 2025-05-07    |
+---------+--------------------+---------------+

/* 11. Tente executar a mesma consulta da questão 10 com o usuário "pikachu".
        Esse usuário possui permissão apenas para realizar SELECT na coluna "mensagem" da tabela "postagem".
        Verifique se a consulta completa funciona e anote a mensagem de erro (se houver).
Dica: No MySQL, o erro esperado deve indicar "access denied" ao tentar acessar colunas não permitidas.
*/

/* 12. Com o usuário "root", verifique se o autocommit está ativado no banco de dados.
        No MySQL, utilize:
        SHOW VARIABLES LIKE 'autocommit';
*/

/* 13. Ainda com o usuário "root", desative o autocommit utilizando o seguinte comando: */
SET autocommit = 0;

/* 14. Execute uma consulta na tabela "postagem" para verificar os registros atuais: */
SELECT * FROM postagem;

/* 15. Inicie uma transação e insira um novo registro na tabela "postagem" com os seguintes dados:
        usuario_id: 1
        forum_id: 2
        mensagem: 'Novo post com transação'
        data_postagem: '2025-06-01'
*/

/* 16. Execute novamente SELECT * FROM postagem e verifique se o novo registro apareceu: */
SELECT * FROM postagem;

/* 17. Desfaça a transação utilizando o comando: */
ROLLBACK;

/* 18. Execute SELECT * FROM postagem para verificar se o registro foi removido após o ROLLBACK: */
SELECT * FROM postagem;

/* 19. Inicie uma nova transação com o comando: */
START TRANSACTION;

/* 20. Insira outro registro na tabela "postagem" com os seguintes dados:
        usuario_id: 1
        forum_id: 2
        mensagem: 'Post commitado'
        data_postagem: '2025-06-01'
*/

/* 21. Execute SELECT * FROM postagem para verificar se o registro foi inserido: */
SELECT * FROM postagem;

/* 22. Confirme a transação utilizando o comando: */
COMMIT;

/* 23. Execute SELECT * FROM postagem novamente e verifique se o registro permanece: */
SELECT * FROM postagem;

/* 24. Tente realizar um novo ROLLBACK (não deve surtir efeito, pois a transação já foi confirmada): */
ROLLBACK;
SELECT * FROM postagem;

/* 25. Reative o autocommit com o seguinte comando: */
SET autocommit = 1;

/* 26. Exclua os usuários criados ("moderador", "pikachu" e "maverick") utilizando os comandos a seguir: */

-- MySQL
DROP USER 'moderador'@'localhost';
DROP USER 'pikachu'@'localhost';
DROP USER 'maverick'@'localhost';

-- PostgreSQL (se estiver usando este SGBD)
-- DROP ROLE moderador;
-- DROP ROLE pikachu;
-- DROP ROLE maverick;

/* 27. Com o usuário "root", execute uma consulta que exiba os nomes dos usuários que possuem a letra "a"
        no nome e, ao lado, suas respectivas mensagens publicadas.
        O resultado deve incluir apenas usuários cujo nome contenha a letra "a".
        Utilize JOIN entre as tabelas "usuario" e "postagem".

        Dica:
        No MySQL: WHERE usuario.nome LIKE '%a%'
        No PostgreSQL: WHERE usuario.nome ILIKE '%a%'
*/
SELECT usuario.nome, postagem.mensagem
FROM usuario
JOIN postagem ON usuario.id = postagem.usuario_id
WHERE usuario.nome LIKE '%a%';
