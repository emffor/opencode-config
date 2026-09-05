# API, Data Fetching E Cache

## API

- Verificar contratos de request e response.
- Verificar nomes e tipos de campos.
- Verificar campos removidos ou renomeados.
- Verificar status HTTP esperados.
- Verificar tratamento de 401, 403, 404 e 422.
- Verificar parâmetros opcionais e obrigatórios.
- Verificar paginação, filtros e ordenação.
- Verificar quebra de compatibilidade.

## Data Fetching

- Verificar requests duplicados.
- Verificar requests durante render.
- Verificar loading, error e empty state.
- Verificar cancelamento quando necessário.
- Verificar refetch excessivo.
- Verificar stale data.
- Verificar dados antigos após troca de parâmetro.

## Cache

- Verificar chave de cache.
- Verificar invalidação após mutation.
- Verificar dados de usuários ou tenants misturados.
- Verificar optimistic update sem rollback.
- Verificar cache indefinido sem estratégia.
- Verificar dados sensíveis armazenados.
