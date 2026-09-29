# Fluxos, Checklist E Entrega De Performance

## Fluxo De Investigação De Gargalos

1. Reproduzir o cenário ou coletar métricas reais do ambiente impactado.
2. Identificar se o problema é dominado por CPU (event loop bloqueado), I/O de banco (slow queries, N+1), I/O de rede ou memória.
3. Coletar medições de baseline (latência p50/p95/p99, req/s, consumo de memória).
4. Formular hipótese testável baseada em dados concretos.
5. Aplicar a menor intervenção necessária (ex: adicionar índice específico, paginar consulta, introduzir cache-aside pontual).
6. Repetir o teste sob as mesmas condições e comparar métricas antes e depois.
7. Validar que contratos de API, testes unitários e de integração continuam passando com sucesso.

## Checklist Antes Da Entrega

- [ ] A melhoria foi mensurada com dados objetivos antes e depois da intervenção.
- [ ] O comportamento funcional e contratos de resposta da API foram integralmente preservados.
- [ ] Se houve adição de índice, o plano de execução (`EXPLAIN`) comprovou a redução de custo.
- [ ] Se houve adição de cache, foi definido TTL finito e mecanismo de invalidação nas mutações.
- [ ] Nenhum código temporário de profiling ou logs excessivos permaneceu no repositório.
- [ ] Riscos remanescentes e limitações foram documentados de forma transparente.
