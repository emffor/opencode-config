# Cache E Qualidade De Código

## Cache E Redis

- Utilizar clientes Redis maduros (ioredis, redis nativo) ou bibliotecas de cache em memória/unificadas (cache-manager, keyv) conforme o projeto.
- Definir sempre um TTL (Time To Live) explícito para chaves cacheadas; nunca salvar dados em cache indefinidamente sem justificativa.
- Projetar chaves de cache com namespaces claros e previsíveis (ex: `users:v1:${userId}:profile`).
- Implementar estratégia de invalidação consistente quando a entidade correspondente for atualizada ou excluída (cache-aside / write-through).
- Proteger consultas contra Cache Stampede (múltiplas requisições simultâneas buscando a mesma chave expirada e sobrecarregando o banco) através de locks distribuídos ou lazy renewal.
- Nunca usar comandos perigosos como `KEYS *` em produção no Redis; utilizar `SCAN` quando for estritamente necessária uma iteração paginada.

## Qualidade De Código E TypeScript

- Manter o TypeScript com modo estrito (`strict: true`) e sem regras desativadas injustificadamente no `tsconfig.json`.
- Respeitar e rodar linters e formatadores configurados no projeto (ESLint, Prettier, Biome).
- Não desativar regras do ESLint com comentários `eslint-disable` sem justificativa técnica clara.
- Evitar casts com `as any` ou `as unknown as Type`; preferir type guards e refinamentos de tipo com predicates (`is Type`).
- Manter código legível, modular e aderente ao princípio da responsabilidade única.
- Tratar e tipar de forma explícita parâmetros opcionais e valores nuláveis (`null | undefined`).
