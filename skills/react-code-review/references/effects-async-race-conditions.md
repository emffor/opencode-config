# Effects, Async E Race Conditions

## Effects

- Verificar `useEffect` usado para estado derivado.
- Verificar dependências ausentes.
- Verificar dependências excessivas ou instáveis.
- Verificar loops de renderização.
- Verificar efeitos sem cleanup.
- Verificar subscriptions não removidas.
- Verificar timers não cancelados.
- Verificar event listeners não removidos.
- Verificar lógica que deveria estar em event handlers.
- Verificar comportamento duplicado no Strict Mode.

## Async

- Verificar erros ignorados.
- Verificar Promises sem tratamento.
- Verificar atualização após componente não ser mais relevante.
- Verificar loading incorreto com múltiplas requisições.
- Verificar `finally` sobrescrevendo estado recente.
- Verificar requests sem cancelamento quando necessário.

## Race Conditions

- Verificar resposta antiga sobrescrevendo resposta nova.
- Verificar buscas disparadas rapidamente.
- Verificar mudança de rota durante request.
- Verificar requisições concorrentes do mesmo recurso.
- Verificar necessidade de `AbortController`.
- Verificar ordem incorreta entre operações async.
