---
name: laravel-postgres-fts
description: Implementar e otimizar Full Text Search Laravel com PostgreSQL, GIN, tsquery, lexemas e ranking.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  database: postgresql
  area: database-search
---

# Laravel PostgreSQL Full Text Search

## Objetivo

Implementar buscas textuais eficientes utilizando recursos
nativos de Full Text Search do PostgreSQL.

Esta skill complementa a skill `laravel`.

## Antes De Implementar

1. Confirmar que o banco é PostgreSQL.
2. Identificar versões do Laravel, PHP e PostgreSQL.
3. Identificar schema, tabela e colunas.
4. Entender a semântica real da busca.
5. Identificar idioma e configuração linguística.
6. Avaliar volume, frequência e seletividade.
7. Verificar índices e estratégias existentes.
8. Inspecionar o plano de execução quando seguro.
9. Não criar extensões, índices ou migrations automaticamente.

## Princípios

- Não substituir `LIKE` automaticamente por Full Text Search.
- Avaliar `pg_trgm` quando a busca exigir fragmentos ou similaridade.
- Utilizar bindings para valores dinâmicos.
- Não concatenar entrada do usuário em SQL.
- Escolher a estratégia de busca conforme a semântica necessária.
- Medir quando possível antes e depois da otimização.
- Preservar contratos e comportamento existentes.

## Segurança De Banco

Aplicar as regras de banco de dados da skill `laravel`.

Não executar automaticamente:

- `CREATE INDEX`;
- `DROP INDEX`;
- `ALTER TABLE`;
- `CREATE EXTENSION`;
- migrations;
- outras mudanças estruturais.

Não alterar banco de produção automaticamente.

Qualquer alteração estrutural deve seguir as regras de confirmação,
validação e reversão definidas pela skill `laravel`.

## Uso Da Referência

Quando a tarefa envolver PostgreSQL Full Text Search,
carregar a referência:

`references/postgresql-fts.md`

Não carregar a referência quando a tarefa não exigir
conhecimento específico de Full Text Search do PostgreSQL.
