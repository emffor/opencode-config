# ORM, Query Builder E Relacionamentos

## Mapeamento De Relacionamentos

- Declarar explicitamente os relacionamentos nas entidades/schemas conforme o ORM adotado:
  - TypeORM: `@OneToOne`, `@ManyToOne`, `@OneToMany`, `@ManyToMany`, `@JoinColumn`, `@JoinTable`.
  - Prisma: relações `@relation` com campos e referências declarados.
  - Kysely/Knex: chaves estrangeiras tipadas nas interfaces de tabelas.
- Prevenir problemas de N+1 queries:
  - Nunca iterar coleções realizando consultas individuais em laço (`for ... await of items { await findRelation(item) }`).
  - Utilizar eager loading com moderação apenas para relacionamentos estritamente necessários (`relations: ['items', 'user']` ou `include: { items: true }`).
  - Preferir joins explícitos (`leftJoinAndSelect`, `innerJoinAndSelect`) no QueryBuilder quando precisar filtrar ou ordenar pelos relacionamentos.
- Evitar o carregamento em cascata indiscriminado (`cascade: true`) que possa gerar escritas não intencionais no banco de dados.
- Mapear corretamente as regras de deleção (`onDelete: 'CASCADE'`, `'SET NULL'`, `'RESTRICT'`) refletindo as restrições reais de integridade referencial do schema.
