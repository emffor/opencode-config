# Models, Eloquent E Collections

## Models E Eloquent

- Manter relacionamentos, casts e scopes ligados à entidade.
- Declarar tipos de retorno nos relacionamentos quando compatível.
- Usar casts para datas, booleanos, enums, arrays e valores estruturados.
- Evitar lógica HTTP no Model.
- Evitar mass assignment inseguro.
- Não usar `$guarded = []` sem avaliar o padrão e os riscos.
- Revisar `$fillable`, `$guarded`, `$hidden`, `$visible`, `$casts` e `$appends`.
- Não criar accessors ou mutators com efeitos colaterais inesperados.
- Usar scopes para filtros reutilizáveis ligados à entidade.
- Evitar observers para regras centrais difíceis de rastrear.
- Não executar consultas dentro de accessors, mutators ou Resources.
- Verificar risco de N+1.
- Usar eager loading quando necessário.
- Evitar consultas dentro de loops.
- Selecionar somente as colunas necessárias em consultas relevantes.
- Usar paginação em listagens potencialmente grandes.
- Usar `exists()` quando apenas a existência for necessária.
- Usar `value()` quando apenas um valor for necessário.
- Usar `count()` no banco em vez de carregar uma coleção para contar.
- Usar `withCount()` ou `withExists()` quando aplicável.
- Usar `chunkById()`, `lazyById()` ou cursor em grandes volumes.

## Collections

- Usar Collections quando melhorarem clareza e composição.
- Preferir filtros e agregações no banco quando reduzirem volume e memória.
- Não usar `map()` para efeitos colaterais.
- Usar `each()` para efeitos colaterais e `map()` para transformação.
- Avaliar `pluck()`, `keyBy()`, `groupBy()` e `mapWithKeys()` antes de criar loops manuais.
- Evitar encadeamentos excessivamente longos ou difíceis de interpretar.
- Não carregar grandes conjuntos apenas para processá-los em memória.
