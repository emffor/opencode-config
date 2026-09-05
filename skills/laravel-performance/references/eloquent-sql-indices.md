# Eloquent, Consultas SQL E Índices

## Eloquent

- Verificar risco de N+1.
- Usar eager loading quando necessário; evitar eager loading excessivo.
- Não carregar relacionamentos não utilizados.
- Evitar consultas dentro de loops; evitar lazy loading inesperado.
- Selecionar apenas as colunas necessárias.
- Evitar carregar Models completos quando poucos campos forem suficientes.
- Usar `exists()` quando apenas a existência importar.
- Usar `value()` quando apenas um campo for necessário.
- Usar `count()` no banco em vez de carregar Collection para contar.
- Usar `withCount()` ou `withExists()` quando aplicável.
- Avaliar `pluck()` quando apenas uma lista de valores for necessária.
- Avaliar `selectSub()` ou subqueries quando reduzirem round trips.
- Evitar accessors, mutators ou Resources que disparem consultas.
- Revisar relacionamentos carregados automaticamente.
- Não usar `Model::all()` em tabelas potencialmente grandes.
- Avaliar `firstOrCreate()`, `updateOrCreate()` e `upsert()` com foco em concorrência e número de queries.

## Consultas SQL

- Evitar `SELECT *` em fluxos críticos ou de grande volume; selecionar somente as colunas necessárias.
- Verificar filtros, joins, agregações e ordenações.
- Avaliar planos de execução quando houver gargalo relevante.
- Verificar scans completos em tabelas grandes; verificar filtros que impedem uso de índice.
- Evitar funções sobre colunas indexadas em filtros críticos.
- Evitar consultas duplicadas; reduzir round trips ao banco.
- Evitar subqueries correlacionadas caras quando houver alternativa melhor.
- Avaliar agregações no banco em vez de processar tudo em memória.
- Não substituir query legível por SQL complexo sem ganho comprovado.
- Respeitar diferenças entre MySQL, PostgreSQL, SQL Server e SQLite.

## Índices

- Avaliar índices para colunas usadas em `WHERE`, `JOIN`, `ORDER BY` e constraints.
- Verificar seletividade; verificar ordem das colunas em índices compostos.
- Evitar índices duplicados ou redundantes.
- Avaliar custo de escrita e armazenamento.
- Não criar índices indiscriminadamente; não remover índices sem evidência e confirmação explícita.
- Considerar índices únicos quando também garantirem integridade.
- Verificar impacto de índices em tabelas com muitas escritas.
- Avaliar cobertura de consultas críticas quando o banco suportar.
