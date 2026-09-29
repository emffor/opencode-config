# ORM, SQL E Índices Na Performance

## Otimização De Queries Do ORM

- Resolver problemas de N+1 queries utilizando joins explícitos ou carregamento em lote com operador `IN` (`find({ where: { id: In(ids) } })`).
- Selecionar apenas colunas necessárias (`select: ['id', 'title']`); evitar carregar colunas pesadas (`text`, `jsonb`, `bytea`) quando não forem utilizadas no cálculo ou resposta.
- Desativar o tracking de entidades desnecessário quando o ORM suportar (ou usar raw queries / Data Mappers simples para leituras somente de consulta).
- Utilizar `count()` direto no banco de dados em vez de carregar todos os registros com `find()` e calcular `.length` no array em JavaScript.

## Análise De Índices E Slow Queries

- Habilitar o log de slow queries do banco para capturar comandos com tempo de resposta superior ao limiar aceitável.
- Rodar `EXPLAIN (ANALYZE, BUFFERS)` no PostgreSQL ou similar para verificar:
  - Presença de Sequential Scan em tabelas grandes;
  - Custo estimado vs custo real;
  - Eficácia de filtros e condições de join.
- Adicionar índices para colunas de alta seletividade e chaves estrangeiras consultadas com frequência.
- Monitorar a fragmentação de índices e a saúde das estatísticas do otimizador (`ANALYZE`).
