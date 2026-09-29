# Migrations E Transformação De Dados

## Boas Práticas Em Migrations

- Nunca alterar o schema do banco de dados em produção através de sincronização automática (`synchronize: true` no TypeORM ou db push em produção é terminantemente proibido).
- Criar migrations explícitas e versionadas utilizando o CLI do ORM adotado (TypeORM CLI, Prisma Migrate, Knex migrate, Umzug).
- Toda migration deve implementar método de aplicação (`up`) e método de reversão (`down`) simétrico e idempotente.
- Nunca alterar ou reescrever arquivos de migration que já tenham sido executados em ambientes compartilhados ou em produção.
- Em adições de colunas obrigatórias (`NOT NULL`) a tabelas com registros existentes:
  1. Adicionar a coluna como nulável (`NULL`) ou com valor padrão (`DEFAULT`);
  2. Preencher os dados existentes em lotes se necessário;
  3. Alterar a coluna para `NOT NULL` em etapa posterior.
- Criar índices em tabelas grandes preferencialmente sem lock exclusivo (ex: `CREATE INDEX CONCURRENTLY` no PostgreSQL).

## Transformação E Carga De Dados

- Manter migrations de schema separadas de scripts de transformação massiva ou seeds de dados.
- Processar atualizações de dados em lotes (chunks) com commits intermediários para evitar locks prolongados e esgotamento de logs de transação.
- Confirmar sempre o ambiente e o banco de dados antes de executar comandos de migration.
- Nunca executar comandos de migration automaticamente sem solicitação e confirmação prévia explícita do usuário.
