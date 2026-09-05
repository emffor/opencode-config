---
name: laravel
description: Desenvolver, corrigir e refatorar aplicações e APIs Laravel preservando arquitetura, contratos, segurança e padrões existentes.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  audience: developers
---

# Laravel

## Objetivo

Desenvolver aplicações e APIs Laravel de forma segura, consistente,
previsível e compatível com os padrões e contratos existentes no repositório.

As instruções do `AGENTS.md` do projeto têm prioridade sobre esta skill.

## Antes De Implementar

1. Ler o `AGENTS.md` e a documentação do repositório.
2. Identificar as versões do PHP e do Laravel.
3. Inspecionar o `composer.json`.
4. Localizar implementações semelhantes no mesmo módulo.
5. Identificar arquitetura, convenções, helpers e abstrações existentes.
6. Verificar contratos públicos afetados.
7. Verificar testes relacionados à funcionalidade.
8. Identificar autenticação, autorização e middleware aplicáveis.
9. Quando envolver API, confirmar contratos de entrada e saída.
10. Quando envolver banco, identificar driver, conexão e estruturas afetadas.
11. Não introduzir arquitetura nova quando já existir padrão consolidado.
12. Não alterar contrato público sem confirmação explícita.

## Princípios

- Priorizar segurança, correção, legibilidade, previsibilidade e simplicidade.
- Corrigir a causa-raiz do problema.
- Aplicar Clean Code e SOLID sem abstrações desnecessárias.
- Preferir reutilização a duplicação.
- Manter alterações dentro do escopo solicitado.
- Preservar compatibilidade quando não houver autorização para quebrá-la.
- Não atualizar PHP, Laravel ou pacotes fora do escopo.
- Não adicionar dependências Composer sem confirmação explícita.
- Não modernizar arquivos não relacionados por preferência de estilo.

## Arquitetura

Seguir primeiro a arquitetura existente no repositório.

Quando não houver padrão consolidado, considerar:

- `Controller`: entrada HTTP, autorização, orquestração e resposta.
- `FormRequest`: validação e autorização da entrada.
- `Service` ou `Action`: regra de negócio e coordenação do caso de uso.
- `Model`: relacionamentos, casts, scopes e comportamento da entidade.
- `Resource`: transformação da saída HTTP.
- `Policy` ou `Gate`: autorização.
- `Job`: processamento assíncrono.
- `Event` e `Listener`: efeitos desacoplados quando houver benefício real.

Não criar todas as camadas automaticamente.

Não adicionar `Repository`, `Service`, `Action`, `Trait`, `Helper`
ou interface quando a abstração não trouxer ganho claro de organização,
reutilização, desacoplamento ou teste.

## Banco De Dados

Quando a tarefa envolver banco de dados:

- Identificar driver, conexão, schema, banco e ambiente utilizados.
- Inspecionar Models, migrations, relacionamentos e queries relacionados.
- Preservar convenções de nomes, chaves e tipos existentes.
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

### Laravel

- PHP, Controllers → `references/php-controllers.md`
- Form Requests, validação, Services, Actions → `references/form-requests-services.md`
- Models, Eloquent, Collections → `references/models-eloquent-collections.md`
- API e Resources → `references/api-resources.md`
- Autorização, segurança, integrações externas → `references/autorizacao-seguranca.md`
- Service Container, dependências, Jobs, Filas, Eventos → `references/container-jobs-eventos.md`
- Cache e qualidade de código → `references/cache-qualidade.md`
- Fluxos de implementação, correção de bug e entrega → `references/fluxos-e-entrega.md`

### API

- Rotas, métodos HTTP, Controllers → `references/rotas-metodos-controllers.md`
- Validação, autenticação, autorização e contrato → `references/validacao-auth-contrato.md`
- Resources, respostas e status HTTP → `references/resources-respostas-status.md`
- Listagens, filtros, segurança e idempotência → `references/listagens-seguranca-idempotencia.md`
- Uploads, downloads, integrações e webhooks → `references/uploads-webhooks.md`
- Versionamento, compatibilidade e documentação → `references/versionamento-documentacao.md`
- Testes de API, fluxo e checklist → `references/testes-fluxo-checklist.md`

### Banco De Dados

- Eloquent e relacionamentos → `references/eloquent-relacionamentos.md`
- Query Builder, SQL e performance de consultas → `references/query-builder-performance.md`
- Índices e integridade → `references/indices-integridade.md`
- Transações, concorrência e idempotência → `references/transacoes-concorrencia.md`
- Migrations e transformação de dados → `references/migrations-alteracoes-dados.md`
- Soft Deletes, multi-tenancy e SQL Server → `references/soft-deletes-multitenancy-sqlserver.md`
- Fluxos, checklist e entrega → `references/fluxos-e-checklist.md`
