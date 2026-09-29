---
name: node-code-review
description: Revisar código Node.js/TypeScript com foco em bugs, regressões, segurança, integridade, contratos, performance e testes.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  area: code-review
---

# Code Review Node.js

## Objetivo

Revisar alterações em backends Node.js e TypeScript de forma técnica,
objetiva e orientada a risco.

Esta skill complementa a skill `node`.

## Antes De Revisar

1. Ler o `AGENTS.md` e a documentação relevante do repositório.
2. Identificar versões do Node.js, TypeScript e dependências principais.
3. Inspecionar o escopo completo da alteração (PR, diff, commits).
4. Ler o diff e arquivos relacionados.
5. Localizar implementações e contratos semelhantes no projeto.
6. Identificar contratos públicos (rotas, DTOs, schemas) afetados.
7. Verificar testes relacionados e cobertura dos novos cenários.
8. Identificar impactos em banco de dados, filas, cache, integrações ou segurança.
9. Inspecionar callers e consumidores quando interfaces forem modificadas.

## Prioridades

Revisar nesta ordem:

1. Bugs e regressões funcionais.
2. Segurança e autorização (autenticação, IDOR, injeções, vazamento de dados).
3. Integridade de dados e consistência relacional.
4. Quebras de contrato público (rotas, parâmetros, respostas de API).
5. Concorrência, transações e bloqueio do event loop.
6. Performance, queries de banco e consumo de memória.
7. Testes (qualidade, isolamento, asserções reais).
8. Compatibilidade de versões e dependências.
9. Complexidade desnecessária e acoplamento.
10. Estilo e convenções.

Não priorizar preferências pessoais de estilo sobre problemas funcionais ou de segurança.

## Forma Dos Achados

Cada achado deve informar:

- gravidade (`[CRÍTICO]`, `[ALTO]`, `[MÉDIO]`, `[BAIXO]`, `[SUGESTÃO]`);
- arquivo e localização com link e número de linha;
- comportamento atual identificado no código;
- risco ou impacto concreto;
- cenário em que o problema ocorre;
- correção sugerida objetiva.

Não inventar problemas sem evidência ou cenário plausível.

## Uso Das Referências

Antes de revisar:

1. Identificar os domínios afetados pela alteração.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a revisão atual.

## Referências Por Domínio

- Escopo, Node.js e Controllers → `references/escopo-diff-node-controllers.md`
- Schemas, Services e Entidades → `references/schemas-services-entidades.md`
- Performance, API e Respostas → `references/performance-api-respostas.md`
- Segurança e Autorização → `references/autenticacao-seguranca.md`
- Banco, Migrations e Transações → `references/banco-migrations-transacoes.md`
- Jobs, Cache, Integrações e Testes → `references/jobs-cache-integracoes-testes.md`
- Dependências e Compatibilidade → `references/dependencias-compatibilidade-alertas.md`
- Fluxos de Revisão → `references/fluxos-de-revisao.md`
