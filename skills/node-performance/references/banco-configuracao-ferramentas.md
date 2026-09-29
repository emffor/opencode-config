# Banco, Configuração E Ferramentas De Profiling

## Dimensionamento De Pools De Conexão

- Configurar o pool de conexões do driver de banco (`pg`, `mysql2`, `mssql`, `typeorm` connection options):
  - `min`: conexões mantidas sempre abertas (evitar picos de latência na inicialização);
  - `max`: limite superior de conexões simultâneas permitidas por processo.
- Evitar pools excessivamente grandes: um pool muito alto satura o CPU do banco de dados com trocas de contexto e esgota conexões máximas do SGBD; um pool muito baixo causa enfileiramento e timeout de requisições no cliente Node.js.
- Considerar o uso de connection poolers externos (PgBouncer para PostgreSQL) quando houver múltiplos processos ou réplicas horizontais da aplicação.

## Ferramentas De Profiling E Testes De Carga

- **Profiling De CPU E Heap**:
  - `node --inspect` ou `--inspect-brk`: integração direta com o Chrome DevTools;
  - `0x`: gerador de flamegraphs de alta resolução para identificar funções que travam a CPU;
  - `clinic.js` (`clinic doctor`, `clinic flame`, `clinic bubbleprof`): diagnóstico automatizado de saúde do processo Node.js.
- **Testes De Carga**:
  - `autocannon`: ferramenta de benchmarking HTTP de alto desempenho escrita em Node.js;
  - `k6`: testes de carga baseados em cenários e métricas p95/p99.
- Medir sempre o baseline antes de qualquer alteração de código para comprovar a eficácia da otimização.
