SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

-- Loja

INSERT INTO public.loja (id, cnpj, nome_fantasia, qtd_funcionarios, razao_social, telefone) VALUES (7, '04163766000148', 'Pinheiro', 1, 'Supermercado Pinheiro', '85940082414');
INSERT INTO public.loja (id, cnpj, nome_fantasia, qtd_funcionarios, razao_social, telefone) VALUES (5, '45543915084695', 'Carrefour', 2, 'Carrefour Atacado', '85945654561');
INSERT INTO public.loja (id, cnpj, nome_fantasia, qtd_funcionarios, razao_social, telefone) VALUES (8, '47960950108836', 'Magazine Luiza S/A', 0, 'Magazine Luiza', '85965451231');
INSERT INTO public.loja (id, cnpj, nome_fantasia, qtd_funcionarios, razao_social, telefone) VALUES (4, '08013859000147', 'Maxxi Atacado', 6, 'Maxxi Atacado', '85940205050');

-- Funcionario

INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (22, '60461921103', 'danielbass@live.com', 'Daniel de Souza Taveira', 7, true);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (18, '21255459263', 'samuelgsete@gmail.com', 'Samuel de Souza Taveira', 4, true);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (19, '45907921412', 'daniloddg@hotmail.com', 'Danilo Taveira do Nascimento', 4, false);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (21, '72396670654', 'joabebatera@hotmail.com', 'Joabe de Sousa Amorim', 4, true);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (24, '21785334697', 'sergiofilger7@gmail.com', 'Paulo Sergio Silva Ferreira', 4, true);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (25, '58688784507', 'abinadabegsete@gmail.com', 'Abidanabe de Sousa Amorim', 4, false);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (26, '49469205014', 'lucassouza@hotmail.com', 'Micael Lucas Pereira de Araújo', 4, false);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (20, '61854457780', 'sharlesgsete@gmail.com', 'Sharles Chagas França', 5, true);
INSERT INTO public.funcionario (id, cpf, email, nome, loja_id, status) VALUES (23, '42168297592', 'layladuarte@hotmail.com', 'Layla Duarte da Silva', 5, false);

SELECT pg_catalog.setval('public.funcionario_id_seq', 29, true);
SELECT pg_catalog.setval('public.loja_id_seq', 10, true);

-- Telefone

INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (28, '85986867360', 'OI', 26);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (20, '85989711010', 'OI', 18);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (21, '85999654515', 'CLARO', 19);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (22, '85986516545', 'OI', 20);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (23, '85988654561', 'OI', 21);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (24, '85985615645', 'OI', 22);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (25, '85986546156', 'OI', 23);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (26, '85985628713', 'OI', 24);
INSERT INTO public.telefone (id, numero, operadora, funcionario_id) VALUES (27, '85998982156', 'CLARO', 25);

SELECT pg_catalog.setval('public.telefone_id_seq', 32, true);