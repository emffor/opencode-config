# Eloquent E Relacionamentos

## Eloquent

- Seguir os Models e padrões existentes no projeto.
- Declarar relacionamentos com tipos de retorno quando compatível.
- Usar casts para datas, booleanos, enums, arrays e valores estruturados.
- Revisar `$fillable`, `$guarded`, `$hidden`, `$visible`, `$casts` e `$appends`.
- Não usar `$guarded = []` sem avaliar os riscos.
- Não executar consultas em accessors, mutators ou Resources.
- Evitar observers para regras centrais difíceis de rastrear.
- Usar scopes para filtros reutilizáveis ligados à entidade.
- Não carregar Models completos quando apenas poucos campos forem necessários.
- Usar `findOrFail()` ou comportamento equivalente quando ausência for excepcional.
- Usar `firstOrCreate()`, `updateOrCreate()` ou `upsert()` apenas quando a semântica e a concorrência estiverem compreendidas.

## Relacionamentos

- Definir relacionamentos de acordo com as foreign keys existentes.
- Validar cardinalidade e direção do relacionamento.
- Preservar nomes e padrões já adotados.
- Não criar relacionamento apenas para esconder uma consulta específica.
- Validar pertencimento antes de alterar recursos relacionados.
- Usar eager loading quando necessário.
- Evitar lazy loading em loops.
- Usar `withCount()` ou `withExists()` quando aplicável.
- Não carregar relacionamentos não utilizados.
