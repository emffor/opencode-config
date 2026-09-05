# Consultas, Performance, API E Resources

## Consultas E Performance

- Verificar N+1.
- Verificar consultas dentro de loops.
- Verificar eager loading ausente ou excessivo.
- Verificar `SELECT *` em fluxos críticos.
- Verificar carregamento de grandes Collections.
- Verificar uso de `get()` onde paginação ou processamento em lotes seria necessário.
- Verificar `count()` em Collection quando poderia ocorrer no banco.
- Verificar uso de `exists()`, `value()`, `withCount()` e `withExists()` quando aplicável.
- Verificar filtros e ordenações sem índice em fluxos relevantes.
- Verificar queries duplicadas.
- Verificar paginação feita em memória.
- Não apontar micro-otimizações sem impacto plausível.

## API E Resources

- Verificar quebra de nomes, tipos ou estrutura de campos.
- Verificar alteração de envelope de resposta.
- Verificar status HTTP incorreto ou alterado.
- Verificar campos sensíveis expostos.
- Verificar IDs internos expostos.
- Verificar consultas dentro de Resources.
- Verificar regra de negócio em Resources.
- Verificar relacionamentos acessados sem carregamento.
- Verificar paginação, filtros e ordenação.
- Verificar compatibilidade com clientes existentes.
- Verificar endpoints `GET` com efeitos colaterais.
- Verificar documentação desatualizada quando aplicável.
