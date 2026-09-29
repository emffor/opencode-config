# Query Builder, SQL Nativo E Performance De Consultas

## Construção De Queries E Segurança

- Usar QueryBuilder (TypeORM `createQueryBuilder`, Kysely, Knex) quando métodos básicos do repositório (`find`, `findOne`) resultarem em consultas ineficientes ou joins desnecessários.
- Selecionar apenas as colunas estritamente necessárias (`select(['user.id', 'user.name', 'user.email'])`), evitando `SELECT *` em tabelas com colunas de texto extenso, JSONBs ou blobs.
- Sempre utilizar parâmetros preparados e bindings nomeados ou posicionais:
  - TypeORM: `.where('user.email = :email', { email })`
  - Knex/Kysely: `.where('email', '=', email)`
- Nunca usar concatenação de strings ou template literals para interpolar variáveis do usuário em cláusulas SQL (`where(\`status = '${status}'\`)` é terminantemente proibido).

## Análise E Otimização De Performance

- Avaliar planos de execução (`EXPLAIN` / `EXPLAIN ANALYZE` no PostgreSQL ou `SET SHOWPLAN_ALL` no SQL Server) antes de aplicar índices ou reestruturar consultas complexas.
- Identificar Table Scans / Sequential Scans em tabelas volumosas e verificar se há índice aproveitável para as colunas de filtro e ordenação.
- Evitar o uso de funções em colunas indexadas no `WHERE` (ex: `WHERE LOWER(email) = ...`), a menos que exista índice funcional correspondente.
- Monitorar e ajustar o pool de conexões do driver (`pg`, `mysql2`, `mssql`) para evitar exaustão de conexões no banco ou contenção no cliente Node.js.
