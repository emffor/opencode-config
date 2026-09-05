# Paginação, Processamento Em Lote E Collections

## Paginação

- Usar paginação em listagens potencialmente grandes; evitar paginação em memória.
- Avaliar `paginate()` quando total de registros for necessário.
- Avaliar `simplePaginate()` quando o total não for necessário.
- Avaliar `cursorPaginate()` para grandes volumes e ordenação estável.
- Preservar contrato e metadados existentes.
- Definir limite máximo de página quando aplicável; não permitir `perPage` arbitrariamente alto.
- Verificar ordenação determinística.
- Evitar offsets muito altos quando cursor puder resolver melhor.

## Processamento Em Lote

- Usar `chunkById()` quando processar grandes volumes mutáveis.
- Usar `lazyById()` quando fluxo iterativo for mais adequado.
- Usar `cursor()` quando memória for o principal gargalo e o driver permitir.
- Evitar `chunk()` em conjuntos que podem ser alterados durante o processamento.
- Não carregar grandes conjuntos com `get()`.
- Definir tamanho de lote com base em memória, locks e tempo.
- Evitar transações muito longas em processamento em lote.
- Tornar rotinas idempotentes quando puderem ser retomadas.
- Registrar progresso sem expor dados sensíveis; prever retomada em caso de falha.

## Collections

- Preferir filtros, agregações e ordenações no banco quando reduzirem volume e memória.
- Evitar converter query em Collection cedo demais.
- Não carregar grandes conjuntos apenas para usar `filter()`, `sortBy()` ou `groupBy()`.
- Evitar encadeamentos repetidos sobre a mesma Collection.
- Evitar múltiplos `map()` quando uma única transformação resolver.
- Usar `each()` para efeito colateral e `map()` para transformação.
- Avaliar `pluck()`, `keyBy()`, `groupBy()` e `mapWithKeys()` quando melhorarem clareza.
- Não trocar query eficiente por Collection apenas por preferência de estilo.
