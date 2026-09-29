---
name: node
description: Desenvolver, corrigir e refatorar aplicações e APIs Node.js/TypeScript preservando arquitetura, contratos, segurança e padrões existentes.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  area: backend
  audience: developers
---

# Node.js Backend

## Objetivo

Desenvolver aplicações e APIs Node.js/TypeScript de forma segura, consistente,
previsível e compatível com os padrões e contratos existentes no repositório.

As instruções do `AGENTS.md` do projeto têm prioridade sobre esta skill.

## Antes De Implementar

1. Ler o `AGENTS.md` e a documentação do repositório.
2. Identificar as versões do Node.js e do TypeScript.
3. Inspecionar o `package.json` e o lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`).
4. Identificar o runtime/framework adotado (Express, Fastify, NestJS, etc.).
5. Identificar a camada de persistência (TypeORM, Prisma, Kysely, Knex, pg nativo, etc.).
6. Localizar implementações semelhantes no mesmo módulo.
7. Identificar arquitetura, convenções, middlewares, helpers e abstrações existentes.
8. Verificar contratos públicos e DTOs afetados.
9. Verificar testes relacionados à funcionalidade.
10. Identificar autenticação, autorização e middlewares aplicáveis.
11. Quando envolver API, confirmar contratos de entrada e saída.
12. Quando envolver banco, identificar driver, conexão, transações e estruturas afetadas.
13. Não introduzir arquitetura nova quando já existir padrão consolidado.
14. Não alterar contrato público sem confirmação explícita.

## Princípios

- Priorizar segurança, correção, legibilidade, previsibilidade e simplicidade.
- Corrigir a causa-raiz do problema.
- Aplicar Clean Code e SOLID sem abstrações desnecessárias.
- Preferir reutilização a duplicação.
- Manter alterações dentro do escopo solicitado.
- Preservar compatibilidade quando não houver autorização para quebrá-la.
- Não atualizar versões de Node.js, TypeScript ou pacotes fora do escopo.
- Não adicionar dependências npm sem confirmação explícita.
- Não modernizar arquivos não relacionados por preferência de estilo.
- Evitar `any` ou type casts inseguros sem justificativa técnica plausível.
- Nunca bloquear o event loop com operações síncronas pesadas ou regexes catastróficas.

## Arquitetura

Seguir primeiro a arquitetura existente no repositório.

Quando não houver padrão consolidado, considerar:

- `Controller` / `Route Handler`: entrada HTTP, extração de parâmetros, orquestração e resposta.
- `Validation Schema` / `DTO`: validação e parsing da entrada (Zod, class-validator, Joi).
- `Service` ou `Use Case`: regra de negócio e coordenação do caso de uso.
- `Entity` / `Model`: mapeamento de tabelas, tipos e comportamento da entidade.
- `Repository` / `Data Access`: abstração de consultas e persistência quando adotado pelo projeto.
- `Serializer` / `Presenter`: transformação e sanitização da saída HTTP.
- `Middleware` / `Guard`: autenticação, autorização, rate limiting e logging.
- `Job` / `Worker`: processamento assíncrono em background (BullMQ, pg-boss, etc.).
- `Event` e `Listener`: desacoplamento de efeitos colaterais quando houver benefício real.

Não criar todas as camadas automaticamente.

Não adicionar `Repository`, `Service`, `UseCase`, `Factory`, `Adapter`
ou interface quando a abstração não trouxer ganho claro de organização,
reutilização, desacoplamento ou teste.

## Banco De Dados

Quando a tarefa envolver banco de dados:

- Identificar driver, conexão, schema, banco e ambiente utilizados.
- Inspecionar entidades/models, migrations, relacionamentos e queries relacionados.
- Preservar convenções de nomes, chaves, tipos e decorators existentes.
- Avaliar integridade, compatibilidade, reversibilidade e impacto.
- Tratar investigação, análise e auditoria como operações somente de leitura.
- Nunca executar operações de escrita automaticamente.
- Nunca executar migrations, seeds ou alterações estruturais automaticamente.
- Solicitar confirmação explícita imediatamente antes de qualquer escrita.
- Não executar alterações quando não for possível confirmar o ambiente.
- Não executar alterações em produção sem confirmação explícita.
- Preferir alterações pequenas, auditáveis e reversíveis.
- Validar, quando possível, com uma operação equivalente de leitura antes da escrita.

Antes de solicitar confirmação para escrita, informar:

- operação proposta;
- ambiente e banco afetados;
- impacto esperado;
- risco de alteração ou perda de dados;
- estratégia de validação;
- estratégia de reversão.

## Uso Das Referências

Antes de implementar:

1. Identificar os domínios afetados pela tarefa.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a tarefa atual.

## Referências Por Domínio

### Node.js E Backend

- Node.js, TypeScript e Controllers → `references/node-controllers.md`
- Validação, schemas, Services e Use Cases → `references/validacao-schemas-services.md`
- Entidades, Models e Repositórios → `references/models-entidades-repositorios.md`
- Serialização e respostas de API → `references/api-serializers-respostas.md`
- Autorização, segurança e integrações externas → `references/autorizacao-seguranca.md`
- Injeção de dependência, Jobs, Filas e Eventos → `references/injecao-jobs-eventos.md`
- Cache e qualidade de código → `references/cache-qualidade.md`
- Fluxos de implementação, correção de bug e entrega → `references/fluxos-e-entrega.md`

### API

- Rotas, métodos HTTP e middlewares → `references/rotas-middlewares-handlers.md`
- Validação, autenticação, autorização e contratos → `references/validacao-auth-contrato.md`
- Respostas, envelopes e status HTTP → `references/resources-respostas-status.md`
- Listagens, filtros, segurança e idempotência → `references/listagens-seguranca-idempotencia.md`
- Uploads, streams, downloads e webhooks → `references/uploads-streams-webhooks.md`
- Versionamento, compatibilidade e documentação OpenAPI → `references/versionamento-documentacao.md`
- Testes de API, fluxo e checklist → `references/testes-fluxo-checklist.md`

### Banco De Dados

- ORM, Query Builder e relacionamentos → `references/orm-relacionamentos.md`
- Query Builder, SQL nativo e performance de consultas → `references/query-builder-performance.md`
- Índices e integridade referencial → `references/indices-integridade.md`
- Transações, concorrência e isolamento → `references/transacoes-concorrencia.md`
- Migrations e transformação de dados → `references/migrations-alteracoes-dados.md`
- Soft Deletes e multi-tenancy → `references/soft-deletes-multitenancy.md`
- Fluxos, checklist e entrega → `references/fluxos-e-checklist.md`
