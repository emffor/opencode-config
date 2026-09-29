# Listagens, Filtros, Segurança E Idempotência

## Listagens E Paginação

- Nunca retornar coleções inteiras sem paginação obrigatória em tabelas que possam crescer.
- Definir limites padrão seguros (ex: `default: 20`, `max: 100`).
- Avaliar paginação por offset (`OFFSET / LIMIT` ou `skip / take`) para pequenos volumes e paginação de UI simples.
- Preferir paginação por cursor (keyset pagination baseada em ID ou timestamp ordenado) para grandes volumes e feeds infinitos, evitando degradação de performance por offsets elevados.
- Garantir ordenação determinística em consultas paginadas, incluindo sempre a chave primária ou coluna única como desempate no `ORDER BY`.

## Filtros E Ordenação Segura

- Validar e sanitizar parâmetros de busca e ordenação contra uma lista de campos permitidos (whitelist).
- Nunca permitir que o cliente passe nomes arbitrários de colunas para o `ORDER BY` diretamente do query param.
- Tratar caracteres curinga em buscas textuais para prevenir comportamento inesperado ou DoS.
- Escapar termos de busca antes de aplicar em operadores `LIKE`/`ILIKE` quando não utilizar Full-Text Search.

## Idempotência E Rate Limiting

- Aplicar cabeçalho `Idempotency-Key` em operações críticas (criação de pedidos, pagamentos, emissão de notas).
- Armazenar a chave de idempotência com TTL no Redis juntamente com a resposta original para retornar o mesmo resultado em caso de reenvio de requisições de rede.
- Aplicar rate limiting por IP, token ou tenant nas rotas de autenticação (login, recuperação de senha) e rotas públicas sensíveis para mitigar ataques de força bruta.
