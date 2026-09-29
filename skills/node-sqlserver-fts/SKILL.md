---
name: node-sqlserver-fts
description: Implementar e otimizar Full-Text Search em backends Node.js/TypeScript com SQL Server, TypeORM, CONTAINS, FREETEXT e ranking.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  database: sql-server
  area: database-search
---

# Node.js SQL Server Full-Text Search

## Objetivo

Implementar buscas linguísticas e textuais eficientes utilizando recursos nativos
de Full-Text Search do SQL Server em backends Node.js e TypeScript (com TypeORM, Knex ou queries parametrizadas).

Esta skill complementa a skill `node`.

## Antes De Implementar

1. Confirmar que a conexão ativa utiliza o driver SQL Server (`mssql`, `tedious`).
2. Identificar versões do Node.js, TypeScript e SQL Server.
3. Confirmar schema, tabela, entidade TypeORM e colunas envolvidas na busca.
4. Verificar se a funcionalidade Full-Text Search está instalada e ativa na instância SQL Server.
5. Identificar idioma (LCID) e configuração linguística adequados.
6. Identificar `KEY INDEX` único, estável e não nulo na tabela.
7. Verificar catálogo e índices Full-Text já existentes.
8. Entender a semântica real da busca (palavras exatas, prefixos, linguagem natural ou operadores booleanos).
9. Avaliar volume de dados, frequência de consultas e concorrência.
10. Não criar catálogo, índice ou executar migrations automaticamente.

## Princípios

- Não substituir `LIKE` automaticamente por Full-Text Search sem analisar requisitos e semântica.
- Usar `FREETEXT` para buscas em linguagem natural sem operadores sintáticos.
- Usar `CONTAINS` para sintaxe estruturada (prefixos, termos compostos, operadores booleanos `AND`, `OR`, `NEAR`).
- Usar `CONTAINSTABLE` ou `FREETEXTTABLE` quando houver necessidade de ranking de relevância (`[RANK]`).
- Sempre utilizar parâmetros preparados para valores dinâmicos do usuário.
- Nunca concatenar entrada do usuário diretamente em strings SQL ou expressões FTS para evitar injeção e erros de sintaxe.
- Medir a performance com planos de execução antes e depois da indexação.
- Preservar contratos de API e comportamento funcional existentes.

## Segurança De Banco

Aplicar as regras de banco de dados da skill `node`.

Não executar automaticamente:

- `CREATE FULLTEXT CATALOG`;
- `CREATE FULLTEXT INDEX`;
- `DROP FULLTEXT INDEX`;
- `ALTER FULLTEXT INDEX`;
- `ALTER TABLE`;
- migrations;
- outras mudanças estruturais no banco.

Não alterar banco de produção automaticamente.

Qualquer alteração estrutural deve seguir as regras de confirmação,
validação e reversão definidas pela skill `node`.

## Uso Da Referência

Quando a tarefa envolver SQL Server Full-Text Search,
carregar a referência:

`references/sqlserver-fts.md`

Não carregar a referência quando a tarefa não exigir
conhecimento específico de Full-Text Search do SQL Server.
