-- EXERCÍCIOS

-- 1) Escreva uma consulta que exiba o total de vendas parceladas por filme,
--    apresentando o título em português e a soma do valor dos ingressos vendidos.
SELECT f.tituloPortugues, SUM(v.valorIngresso) AS total
FROM filme f
JOIN sessao s ON s.idFilme = f.id
JOIN venda v ON v.idSessao = s.id
WHERE v.idTipoPagto = 2
GROUP BY f.tituloPortugues;

-- 2) Modifique a consulta anterior para listar apenas os filmes que tiveram
--    mais de 3 ingressos vendidos com pagamento parcelado.
SELECT f.tituloPortugues, COUNT(v.id) AS qtd, SUM(v.valorIngresso) AS total
FROM filme f
JOIN sessao s ON s.idFilme = f.id
JOIN venda v ON v.idSessao = s.id
WHERE v.idTipoPagto = 2
GROUP BY f.tituloPortugues
HAVING COUNT(v.id) > 4;

-- 3) Escreva uma consulta que exiba a quantidade total de usuários que realizaram
--    pelo menos uma compra com pagamento à vista.
SELECT COUNT(DISTINCT v.idUsuario) AS qtd
FROM venda v
WHERE v.idTipoPagto = 1;

-- 4) Escreva uma consulta que exiba o nome de cada usuário e a quantidade total
--    de compras realizadas à vista por ele, utilizando a cláusula GROUP BY.
SELECT u.nome, COUNT(*) AS total
FROM usuario u
JOIN venda v ON u.id = v.idUsuario
WHERE v.idTipoPagto = 1
GROUP BY u.nome;

-- 5) Crie uma procedure chamada "alteraValorIngresso" que receba como parâmetro
--    um novo valor e atualize todos os ingressos vendidos com esse valor.
--    Após a alteração, exiba os registros da tabela "venda".

-- MySQL
DELIMITER $$
CREATE PROCEDURE alteraValorIngresso(IN novo_valor DOUBLE)
BEGIN
  UPDATE venda SET valorIngresso = novo_valor;
  SELECT * FROM venda;
END$$
DELIMITER ;
-- Chamada:
CALL alteraValorIngresso(25.00);

-- PostgreSQL
CREATE OR REPLACE PROCEDURE altera_valor_ingresso(novo_valor NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE venda SET valorIngresso = novo_valor;
  RAISE NOTICE 'Valores atualizados';
END;
$$;
-- Chamada:
CALL altera_valor_ingresso(25.00);


-- 6) Crie uma função (MySQL) ou procedure (PostgreSQL) que receba o ID de um usuário
--    e atualize a situação de todas as suas parcelas para "PAGA".

-- MySQL
DELIMITER $$
CREATE FUNCTION alteraParcela(v_id INT) RETURNS VARCHAR(50) DETERMINISTIC
BEGIN
  UPDATE parcela SET situacao = 'PAGA'
  WHERE idVenda IN (SELECT id FROM venda WHERE idUsuario = v_id);
  RETURN 'Parcelas alteradas';
END$$
DELIMITER ;
-- Chamada:
SELECT alteraParcela(2);

-- PostgreSQL
CREATE OR REPLACE PROCEDURE altera_parcela(v_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE parcela
  SET situacao = 'PAGA'
  WHERE idVenda IN (SELECT id FROM venda WHERE idUsuario = v_id);
END;
$$;
-- Chamada:
CALL altera_parcela(2);


-- 7) Crie uma procedure ou função que receba o ID de um usuário como parâmetro
--    e retorne todas as suas parcelas, incluindo o valor, vencimento e situação.


-- MySQL
DELIMITER $$
CREATE PROCEDURE relVendas(IN v_id INT)
BEGIN
  SELECT p.* FROM parcela p
  JOIN venda v ON v.id = p.idVenda
  WHERE v.idUsuario = v_id;
END$$
DELIMITER ;
-- Chamada:
CALL relVendas(3);

-- PostgreSQL
CREATE OR REPLACE FUNCTION rel_vendas(v_id INT)
RETURNS TABLE(valor NUMERIC, vencimento DATE, situacao TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT p.valor, p.vencimento, p.situacao
  FROM parcela p
  JOIN venda v ON v.id = p.idVenda
  WHERE v.idUsuario = v_id;
END;
$$ LANGUAGE plpgsql;
-- Chamada:
SELECT * FROM rel_vendas(3);


-- 8) Crie uma procedure chamada "visualizaVendas" que receba como parâmetro o tipo
--    de pagamento (1 para à vista, 2 para parcelado) e exiba a soma total dos valores
--    de ingressos vendidos para o tipo informado.

-- MySQL
DELIMITER $$
CREATE PROCEDURE visualizaVendas(tipo INT)
BEGIN
  IF tipo = 1 THEN
    SELECT SUM(valorIngresso) FROM venda WHERE idTipoPagto = 1;
  ELSE
    SELECT SUM(valorIngresso) FROM venda WHERE idTipoPagto = 2;
  END IF;
END$$
DELIMITER ;
-- Chamada:
CALL visualizaVendas(2);

-- PostgreSQL
CREATE OR REPLACE PROCEDURE visualiza_vendas(tipo INT)
LANGUAGE plpgsql
AS $$
BEGIN
  IF tipo = 1 THEN
    RAISE NOTICE 'Total à vista: %', (SELECT SUM(valorIngresso) FROM venda WHERE idTipoPagto = 1);
  ELSE
    RAISE NOTICE 'Total parcelado: %', (SELECT SUM(valorIngresso) FROM venda WHERE idTipoPagto = 2);
  END IF;
END;
$$;
-- Chamada:
CALL visualiza_vendas(1);


-- 9) Crie uma procedure ou função que liste os nomes de todos os atores que ainda
--    não participaram de nenhum filme (não possuem vínculo com a tabela "elenco").


-- MySQL
DELIMITER $$
CREATE PROCEDURE atoresSemFilme()
BEGIN
  SELECT nome FROM ator WHERE id NOT IN (SELECT DISTINCT idAtor FROM elenco);
END$$
DELIMITER ;
-- Chamada:
CALL atoresSemFilme();

-- PostgreSQL
CREATE OR REPLACE FUNCTION atores_sem_filme()
RETURNS TABLE(nome TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT nome FROM ator WHERE id NOT IN (SELECT DISTINCT idAtor FROM elenco);
END;
$$ LANGUAGE plpgsql;
-- Chamada:
SELECT * FROM atores_sem_filme();


-- 10) Crie uma procedure ou função que liste todos os filmes que ainda não foram
--     exibidos em nenhuma sessão cadastrada na tabela "sessao".

-- MySQL
DELIMITER $$
CREATE PROCEDURE filmesSemSessao()
BEGIN
  SELECT tituloPortugues FROM filme WHERE id NOT IN (SELECT DISTINCT idFilme FROM sessao);
END$$
DELIMITER ;
-- Chamada:
CALL filmesSemSessao();

-- PostgreSQL
CREATE OR REPLACE FUNCTION filmes_sem_sessao()
RETURNS TABLE(titulo TEXT) AS $$
BEGIN
  RETURN QUERY SELECT tituloPortugues FROM filme WHERE id NOT IN (SELECT DISTINCT idFilme FROM sessao);
END;
$$ LANGUAGE plpgsql;
-- Chamada:
SELECT * FROM filmes_sem_sessao();


-- 11) Crie uma procedure ou função que receba o nome de uma cidade como parâmetro
--     e exiba todos os cinemas localizados nessa cidade.

-- MySQL
DELIMITER $$
CREATE PROCEDURE cinemasPorCidade(IN cidadeNome VARCHAR(100))
BEGIN
  SELECT c.nomeFantasia FROM cinema c JOIN cidade ci ON ci.id = c.idCidade WHERE ci.nome = cidadeNome;
END$$
DELIMITER ;
-- Chamada:
CALL cinemasPorCidade('Pelotas');

-- PostgreSQL
CREATE OR REPLACE FUNCTION cinemas_por_cidade(cidade_nome TEXT)
RETURNS TABLE(cinema TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT c.nomeFantasia FROM cinema c JOIN cidade ci ON ci.id = c.idCidade WHERE ci.nome = cidade_nome;
END;
$$ LANGUAGE plpgsql;
-- Chamada:
SELECT * FROM cinemas_por_cidade('Pelotas');


-- 12) Crie uma procedure chamada "atualizaGenero" que receba dois parâmetros:
--     o nome do gênero atual e o nome do novo gênero. A procedure deve alterar
--     todos os filmes que pertencem ao gênero atual para o novo gênero informado.

-- MySQL
DELIMITER $$
CREATE PROCEDURE atualizaGenero(generoAntigo VARCHAR(45), generoNovo VARCHAR(45))
BEGIN
  UPDATE filme f
  JOIN genero g1 ON f.idGenero = g1.id
  JOIN genero g2 ON g2.nome = generoNovo
  SET f.idGenero = g2.id
  WHERE g1.nome = generoAntigo;
END$$
DELIMITER ;
-- Chamada:
CALL atualizaGenero('Drama', 'Comédia');

-- PostgreSQL
CREATE OR REPLACE PROCEDURE atualiza_genero(genero_antigo TEXT, genero_novo TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE filme SET idGenero = (SELECT id FROM genero WHERE nome = genero_novo)
  WHERE idGenero = (SELECT id FROM genero WHERE nome = genero_antigo);
END;
$$;
-- Chamada:
CALL atualiza_genero('Drama', 'Comédia');


-- 13) Crie uma procedure chamada "filmesGeneroDuracao" (ou função correspondente)
--     que receba como parâmetros o nome de um gênero e uma duração mínima.
--     A consulta deve retornar os filmes do gênero especificado com duração superior
--     ao valor informado.

-- MySQL
DELIMITER $$
CREATE PROCEDURE filmesGeneroDuracao(generoNome VARCHAR(45), durMin INT)
BEGIN
  SELECT f.tituloPortugues, f.duracao
  FROM filme f JOIN genero g ON g.id = f.idGenero
  WHERE g.nome = generoNome AND f.duracao > durMin;
END$$
DELIMITER ;
-- Chamada:
CALL filmesGeneroDuracao('Comédia', 100);

-- PostgreSQL
CREATE OR REPLACE FUNCTION filmes_genero_duracao(genero_nome TEXT, dur_min INT)
RETURNS TABLE(titulo TEXT, duracao INT) AS $$
BEGIN
  RETURN QUERY
  SELECT f.tituloPortugues, f.duracao
  FROM filme f JOIN genero g ON g.id = f.idGenero
  WHERE g.nome = genero_nome AND f.duracao > dur_min;
END;
$$ LANGUAGE plpgsql;
-- Chamada:
SELECT * FROM filmes_genero_duracao('Comédia', 100);



-- 14) Escreva uma consulta que liste todas as sessões cuja ocupação do público
--     tenha sido superior a 80% da capacidade do cinema. Exiba o nome do filme,
--     nome do cinema, público, capacidade e percentual de ocupação.
SELECT s.id AS idSessao, f.tituloPortugues, c.nomeFantasia,
       s.publico, c.capacidade,
       ROUND((s.publico * 100.0) / c.capacidade, 2) AS ocupacao
FROM sessao s
JOIN cinema c ON c.id = s.idCinema
JOIN filme f ON f.id = s.idFilme
WHERE (s.publico * 100.0) / c.capacidade > 80;

-- 15) Crie uma VIEW chamada "resumo_vendas_filme" que apresente o título dos filmes,
--     o número total de ingressos vendidos e o valor total arrecadado com essas vendas.
CREATE OR REPLACE VIEW resumo_vendas_filme AS
SELECT f.tituloPortugues,
       COUNT(v.id) AS total_ingressos,
       SUM(v.valorIngresso) AS total_arrecadado
FROM filme f
JOIN sessao s ON s.idFilme = f.id
JOIN venda v ON v.idSessao = s.id
GROUP BY f.tituloPortugues;
-- Consulta:
SELECT * FROM resumo_vendas_filme;


-- 16) Crie uma VIEW chamada "ocupacao_cinema" que exiba o nome de cada cinema e sua
--     média de ocupação (percentual) com base nas sessões realizadas.
CREATE OR REPLACE VIEW ocupacao_cinema AS
SELECT c.nomeFantasia,
       ROUND(AVG((s.publico * 100.0) / c.capacidade), 2) AS ocupacao_media
FROM cinema c JOIN sessao s ON s.idCinema = c.id
GROUP BY c.nomeFantasia;
-- Consulta:
SELECT * FROM ocupacao_cinema;
