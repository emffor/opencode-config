---
name: node-postgres-fts
description: Implementar, revisar e otimizar PostgreSQL Full-Text Search em backends Node.js/TypeScript com TypeORM, incluindo tsvector, tsquery, GIN, ranking, ILIKE e pg_trgm. Usar quando a tarefa envolver busca textual, relevância, índices GIN ou pg_trgm.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  orm: typeorm
  database: postgresql
  area: database-search
---

# Node.js PostgreSQL Full-Text Search

## Objetivo

Orientar implementação, revisão e otimização de buscas textuais em backends
Node.js/TypeScript com PostgreSQL e TypeORM.

Aplicar SQL nativo do PostgreSQL respeitando a arquitetura e os padrões
existentes no projeto.

Não pressupor Laravel, PHP, Eloquent ou SQL Server.

## Antes De Implementar

1. Confirmar que a conexão utilizada é PostgreSQL e identificar sua versão.
2. Descobrir versões de Node.js, TypeScript e TypeORM quando forem relevantes.
3. Identificar schema, tabela, entidade TypeORM e colunas envolvidas.
4. Identificar as camadas realmente envolvidas no fluxo existente.
5. Determinar a semântica da busca:
   - palavras;
   - prefixos;
   - frases;
   - substring;
   - similaridade.
6. Identificar idioma e configuração linguística necessária.
7. Verificar migrations, índices e estratégias existentes.
8. Avaliar paginação, ordenação, filtros, autorização e contrato HTTP.
9. Medir o comportamento atual quando a tarefa envolver performance.

## Escolha Da Estratégia

- Não substituir LIKE ou ILIKE automaticamente por FTS.
- Usar FTS para lexemas, stemming, frases, proximidade e ranking.
- Avaliar pg_trgm para substring, erros de digitação e similaridade.
- Avaliar estratégia híbrida quando houver requisitos diferentes.
- Escolher entre websearch_to_tsquery, plainto_tsquery,
  phraseto_tsquery e to_tsquery conforme a semântica necessária.
- Não assumir que `portuguese` é sempre melhor que `simple`.

## Integração Com TypeORM

- Preservar o padrão existente: Repository, DataSource ou QueryBuilder.
- Preferir QueryBuilder quando houver FTS combinado com ranking, joins,
  filtros ou paginação.
- Usar query nativa apenas quando TypeORM não representar adequadamente
  a consulta.
- Sempre usar bindings para valores dinâmicos.
- Nunca interpolar entrada do usuário em SQL ou tsquery.
- Não criar repository ou service novo sem necessidade arquitetural real.

## Índices E Migrations

- Manter a expressão consultada compatível com a expressão indexada.
- Avaliar índice GIN quando houver benefício mensurável.
- Avaliar pg_trgm somente quando substring ou similaridade justificarem.
- Considerar coluna tsvector apenas quando houver benefício arquitetural
  ou de performance.

- Criar migration TypeORM somente quando necessária para a tarefa.
- Nunca alterar migration já executada.
- Nunca executar automaticamente:
  - migration:run;
  - migration:revert;
  - CREATE INDEX;
  - DROP INDEX;
  - CREATE EXTENSION;
  - ALTER TABLE;
  - triggers ou funções;
  - ANALYZE;
  - VACUUM.
- Avaliar CREATE INDEX CONCURRENTLY para tabelas grandes.
- Confirmar o modelo de transação da migration antes de usar CONCURRENTLY.

## Referência Técnica

Quando forem necessários detalhes de implementação, SQL, índices, ranking,
prefixos, paginação ou plano de execução, consulte:

`references/postgresql-fts.md`

Carregue apenas as partes necessárias para a tarefa atual.

## Testes

Quando aplicável, validar:

- termo simples e múltiplos termos;
- frases;
- acentos, singular e plural;
- prefixos;
- termo inexistente;
- campos NULL;
- ranking;
- ordenação determinística;
- paginação;
- filtros e autorização;
- entrada vazia;
- caracteres especiais;
- diferenças entre FTS, ILIKE e pg_trgm.

Comportamento específico de FTS deve ser validado em PostgreSQL compatível,
não em SQLite.

## Fluxo

1. Entender requisito e semântica da busca.
2. Inspecionar o projeto antes de assumir arquitetura ou versões.
3. Identificar banco, schema, tabela, entidade e fluxo existente.
4. Escolher FTS, ILIKE, pg_trgm ou estratégia híbrida.
5. Definir configuração linguística.
6. Implementar query segura com bindings.
7. Aplicar autorização, ranking, paginação e ordenação estável.
8. Criar migration somente quando necessária.
9. Não executar alterações estruturais automaticamente.
10. Criar ou atualizar testes necessários.
11. Comparar plano e performance quando aplicável.
12. Revisar segurança, logs e exposição de dados.

## Entrega

Informar:

- estratégia escolhida;
- schema, tabela e colunas afetadas;
- configuração linguística;
- arquivos alterados;
- query e bindings;
- índice ou migration criada;
- ranking e paginação;
- testes executados;
- métricas disponíveis;
- riscos e limitações;
- operações deliberadamente não executadas.
