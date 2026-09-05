# Listagens, Filtros, Ordenação, Segurança De Consultas E Idempotência

## Listagens, Filtros E Ordenação

- Preservar nomes e formatos dos parâmetros existentes.
- Validar filtros e campos permitidos para ordenação.
- Não aceitar nomes arbitrários de colunas vindos do cliente.
- Usar whitelist para campos ordenáveis e filtráveis.
- Aplicar paginação em listagens potencialmente grandes.
- Definir limites máximos de página quando aplicável.
- Evitar `SELECT *` em consultas críticas.
- Verificar risco de N+1.
- Usar eager loading somente para dados necessários.
- Não carregar coleções completas para paginar em memória.
- Preservar metadados e links de paginação existentes.

## Segurança De Consultas

- Usar Eloquent, Query Builder ou parâmetros preparados.
- Não concatenar valores externos em SQL.
- Não permitir ordenação ou filtros SQL arbitrários.
- Validar pertencimento antes de retornar recursos relacionados.
- Evitar mass assignment de campos sensíveis.
- Não confiar em IDs recebidos sem validação e autorização.
- Aplicar limites em buscas, exports e endpoints potencialmente caros.
- Avaliar rate limiting para autenticação, buscas e operações críticas.

## Idempotência E Concorrência

- Avaliar idempotência em endpoints que possam ser repetidos.
- Evitar duplicidade em criação, pagamentos, webhooks e integrações.
- Usar chaves idempotentes quando o domínio exigir.
- Aplicar constraints, locks ou operações atômicas quando necessário.
- Não depender apenas de uma consulta prévia para impedir duplicidade.
- Tratar conflitos de concorrência de forma previsível.
- Não repetir efeitos externos automaticamente sem verificar segurança.
