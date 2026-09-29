# Ambiente E Execução De Testes

## Configuração De Ambiente

- Garantir que `NODE_ENV=test` esteja sempre configurado antes da execução de qualquer comando de teste.
- Centralizar variáveis de teste em arquivo específico (ex: `.env.test` ou `.env.testing`), nunca utilizando credenciais de bancos de desenvolvimento ou produção.
- Desativar logs detalhados e coloridos durante a execução dos testes (`LOG_LEVEL=silent` ou `error`) para manter a saída do runner legível e rápida.
- Garantir que conexões abertas (DataSources TypeORM, clientes Prisma, instâncias Redis, servidores HTTP) sejam fechadas explicitamente em hooks globais (`afterAll(async () => { await db.destroy(); })`).

## Execução Paralela E Isolamento

- Configurar o runner para executar testes isolados por processo ou worker quando houver paralelismo.
- Quando testes compartilharem o mesmo banco de dados relacional:
  - Executar os arquivos de integração sequencialmente (`--runInBand` no Jest, `threads: false` ou `singleThread` no Vitest);
  - Ou utilizar bancos de dados/schemas dinâmicos por worker (ex: `test_db_${process.env.VITEST_POOL_ID}`).
- Evitar portas fixas para servidores de teste; usar porta `0` (`app.listen(0)`) ou injeção sem binding de rede (`supertest(app)` / `fastify.inject()`).
