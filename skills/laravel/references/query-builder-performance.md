# Query Builder, SQL E Performance

## Query Builder E SQL

- Preferir Eloquent ou Query Builder quando forem adequados e alinhados ao projeto.
- Usar SQL bruto somente quando houver justificativa clara.
- Usar parâmetros preparados.
- Nunca concatenar valores externos diretamente em SQL.
- Validar nomes de colunas utilizados em ordenação ou filtros dinâmicos.
- Usar whitelist para colunas permitidas.
- Evitar funções que impeçam o uso de índices em filtros críticos.
- Verificar diferenças de sintaxe e comportamento entre drivers.
- Não presumir compatibilidade entre MySQL, PostgreSQL, SQL Server e SQLite.

## Performance

- Verificar risco de N+1.
- Evitar consultas dentro de loops.
- Usar `exists()` quando apenas a existência for necessária.
- Usar `value()` quando apenas um campo for necessário.
- Usar `count()` no banco em vez de carregar uma Collection para contar.
- Usar `pluck()` quando apenas uma lista de valores for necessária.
- Usar paginação em listagens potencialmente grandes.
- Usar `chunkById()`, `lazyById()` ou cursor para grandes volumes.
- Evitar `get()` quando o conjunto puder ser muito grande.
- Evitar converter queries em Collections antes do necessário.
- Não otimizar prematuramente sem evidência.
- Medir ou inspecionar a query antes de introduzir complexidade.
