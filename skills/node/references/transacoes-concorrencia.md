# Transações, Concorrência E Isolamento

## Controle De Transações

- Agrupar múltiplas operações de escrita dependentes dentro de uma única transação atômica.
- Respeitar a estratégia de transação do ORM/QueryBuilder:
  - TypeORM: `dataSource.transaction(async transactionalEntityManager => { ... })` ou controle manual com `queryRunner.startTransaction()`, `commitTransaction()`, `rollbackTransaction()`, sempre liberando com `queryRunner.release()` em bloco `finally`.
  - Prisma: `prisma.$transaction([ ... ])` ou `prisma.$transaction(async tx => { ... })`.
  - Kysely/Knex: `db.transaction().execute(async trx => { ... })`.
- Manter transações o mais curtas e objetivas possível:
  - Nunca executar chamadas HTTP externas, envio de emails ou I/O demorado dentro de transações de banco de dados.
  - Preparar e validar os dados na memória antes de abrir a transação.
- Garantir rollback obrigatório em caso de qualquer exceção lançada durante a transação.

## Concorrência E Estratégias De Lock

- Prevenir condições de corrida (Race Conditions) em recursos compartilhados (como estoque, saldo ou reserva de vagas):
  - Lock Otimista (Optimistic Locking): através de coluna de versão (`@VersionColumn()` no TypeORM) quando a contenção for baixa.
  - Lock Pessimista (Pessimistic Locking): `SELECT ... FOR UPDATE` (TypeORM: `setLock('pessimistic_write')`) quando a contenção for alta e a consistência for crítica.
- Ordenar os recursos acessados de forma consistente em transações concorrentes para evitar deadlocks.
