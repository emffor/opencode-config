# Soft Deletes E Multi-Tenancy

## Soft Deletes

- Respeitar a estratégia de exclusão lógica configurada na entidade (`@DeleteDateColumn()` no TypeORM, campo `deletedAt: Date | null`).
- Garantir que todas as consultas e joins apliquem o filtro de registros ativos (`deletedAt IS NULL`) quando o ORM não aplicar globalmente.
- Ajustar índices únicos quando usar soft deletes: um índice único padrão em `(email)` impedirá recadastros de emails excluídos; criar índice parcial com `WHERE deleted_at IS NULL` se o banco suportar.
- Avaliar impacto de soft deletes em consultas analíticas e relatórios; fornecer métodos explícitos para restaurar (`restore`) ou expurgar definitivamente (`hard delete`) registros obsoletos quando previsto no domínio.

## Multi-Tenancy

- Isolar dados entre tenants respeitando a arquitetura adotada no repositório:
  - Row-Level / Discriminator Column (coluna `tenantId` obrigatória em todas as entidades afetadas);
  - Schema-per-tenant (múltiplos schemas no mesmo banco);
  - Database-per-tenant (conexões dinâmicas por banco).
- Em arquitetura por coluna (`tenantId`), propagar o contexto do tenant da requisição utilizando `AsyncLocalStorage` do Node.js ou injeção de escopo.
- Validar estritamente o `tenantId` em todas as operações de leitura, inserção, atualização e deleção.
- Nunca confiar no `tenantId` vindo do corpo ou query do cliente sem validação contra o token de autenticação.
- Criar índices compostos incluindo `tenantId` como primeira coluna para otimizar filtros multi-tenant.
