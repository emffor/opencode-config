---
name: laravel-sqlserver-fts
description: Implementar e otimizar Full-Text Search Laravel com SQL Server, CONTAINS, FREETEXT e ranking.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  database: sql-server
  area: database-search
---

# Laravel SQL Server Full-Text Search

## Objetivo

Implementar buscas linguísticas eficientes utilizando os recursos
nativos de Full-Text Search do SQL Server.

Esta skill complementa a skill `laravel`.

## Antes De Implementar

1. Confirmar que a conexão é SQL Server.
2. Identificar versões do PHP, Laravel e SQL Server.
3. Confirmar schema, tabela e colunas envolvidas.
4. Verificar se Full-Text Search está instalado e disponível.
5. Identificar idioma e configuração linguística utilizados.
6. Identificar `KEY INDEX` compatível.
7. Verificar catálogo e índices Full-Text existentes.
8. Entender a semântica real da busca.
9. Avaliar volume, frequência e concorrência.
10. Não criar catálogo, índice ou migration automaticamente.

## Princípios

- Não substituir `LIKE` automaticamente por Full-Text Search.
- Usar `FREETEXT` para linguagem natural quando adequado.
- Usar `CONTAINS` para sintaxe controlada quando adequado.
- Escolher a estratégia de busca conforme a semântica necessária.
- Utilizar parâmetros preparados para valores dinâmicos.
- Não concatenar entrada do usuário em SQL.
- Medir quando possível antes e depois da otimização.
- Preservar contratos e comportamento existentes.

## Segurança De Banco

Aplicar as regras de banco de dados da skill `laravel`.

Não executar automaticamente:

- `CREATE FULLTEXT CATALOG`;
- `CREATE FULLTEXT INDEX`;
- `DROP FULLTEXT INDEX`;
- `ALTER TABLE`;
- migrations;
- outras mudanças estruturais.

Não alterar banco de produção automaticamente.

Qualquer alteração estrutural deve seguir as regras de confirmação,
validação e reversão definidas pela skill `laravel`.

## Uso Da Referência

Quando a tarefa envolver SQL Server Full-Text Search,
carregar a referência:

`references/sqlserver-fts.md`

Não carregar a referência quando a tarefa não exigir
conhecimento específico de Full-Text Search do SQL Server.
