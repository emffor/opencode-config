# Paginação, Streams E Processamento Em Lote

## Paginação Eficiente

- Evitar offsets elevados (`OFFSET 100000 LIMIT 20`), pois o banco precisa escanear e descartar todas as linhas anteriores antes de retornar os resultados.
- Migrar para Keyset Pagination / Cursor Pagination em consultas com paginação profunda:
  ```sql
  WHERE (created_at, id) < (:cursorCreatedAt, :cursorId)
  ORDER BY created_at DESC, id DESC
  LIMIT 20
  ```
- Exigir limite obrigatório em todas as consultas expostas em endpoints públicos.

## Streams E Processamento Em Lote (Batch)

- Ao processar migrações de dados, relatórios ou sincronizações com milhares de registros:
  - Usar streams do ORM/driver (`queryRunner.stream()` no TypeORM, `prisma.$queryRaw` com cursor, ou cursor do pg);
  - Ou iterar em chunks/batches controlados (`limit: 500, skip: ...`).
- Nunca instanciar arrays de centenas de milhares de objetos na memória do Node.js, pois isso dispara coletas de lixo (Garbage Collection) agressivas que pausam o event loop e podem causar estouro de heap (OOM).
- Utilizar `pipeline` da biblioteca `stream/promises` para garantir gerenciamento adequado de memória e backpressure.
