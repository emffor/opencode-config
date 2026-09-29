# Jobs, Cache, Integrações E Testes Na Revisão

## Revisão De Jobs E Filas

- Verificar se os jobs enfileirados são idempotentes e se trafegam apenas dados primitivos (IDs).
- Conferir se foi configurada estratégia de retentativas com backoff para jobs transitórios.
- Garantir que falhas críticas de jobs sejam logadas com contexto sem quebrar a execução do worker.

## Revisão De Cache E Redis

- Conferir se todas as escritas no cache definem TTL explícito.
- Verificar se a estratégia de invalidação de cache cobre todas as rotas/ações que alteram os dados cacheados.
- Garantir que não há comandos perigosos (`KEYS *`) sendo disparados em produção.

## Revisão De Integrações E Testes

- Conferir se chamadas HTTP externas possuem timeouts explícitos configurados.
- Verificar se foram criados testes automatizados cobrindo a nova funcionalidade ou a regressão corrigida.
- Garantir que nenhum teste existente foi removido, comentado ou enfraquecido injustificadamente.
- Verificar se os novos testes utilizam mocks adequados para dependências externas e banco de teste isolado.
