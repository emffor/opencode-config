# Entidades, Models E Repositórios

## Entidades E Models

- Respeitar a estratégia do ORM adotado (TypeORM Entity, Prisma Schema/Model, Kysely Table Type, Knex Model).
- Definir tipos de colunas, nulabilidade e relacionamentos de forma estrita no TypeScript.
- Evitar colocar lógica complexa de apresentação ou transporte dentro da entidade.
- Centralizar regras de negócio intrínsecas da entidade (métodos de domínio, invariantes, cálculos derivados) quando o projeto usar DDD ou modelos ricos.
- Não expor campos sensíveis (como hashes de senha, tokens e chaves secretas) nos métodos de toJSON ou serialização.
- Preservar convenções de nomenclatura de tabelas (snake_case vs camelCase) e colunas existentes.

## Repositórios E Acesso A Dados

- Usar a camada de repositório adotada pelo projeto (TypeORM Custom Repository, Repository injetado, Data Mapper ou Data Access Object).
- Não criar abstrações genéricas (`BaseRepository<T>`) desnecessárias quando o ORM ou QueryBuilder já atender plenamente.
- Encapsular consultas específicas de persistência no repositório quando a arquitetura do repositório exigir.
- Não expor detalhes de banco vazando entidades não gerenciadas para camadas superiores quando houver mapeamento definido.
- Ao atualizar registros, atualizar somente os campos permitidos e alterados; evitar overwrite cego de colunas protegidas.
- Garantir que métodos de consulta retornem tipos bem definidos, incluindo possibilidade de `null` ou `undefined` quando o registro puder não existir.
