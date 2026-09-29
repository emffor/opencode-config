---
name: node-testing
description: Criar, corrigir e executar testes automatizados Node.js/TypeScript com Vitest, Jest ou test runners nativos de forma segura, determinística e isolada.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  area: testing
---

# Testes Node.js

## Objetivo

Criar e executar testes automatizados Node.js e TypeScript de forma segura,
determinística, isolada e compatível com o projeto.

Esta skill complementa a skill `node`.

## Antes De Criar Ou Executar

1. Ler o `AGENTS.md` e a documentação do projeto.
2. Identificar runner configurado no repositório (Vitest, Jest, node:test, Mocha).
3. Inspecionar o `package.json` e os scripts de teste (`test`, `test:unit`, `test:e2e`).
4. Inspecionar configurações do runner (`vitest.config.ts`, `jest.config.js`).
5. Localizar testes semelhantes existentes no projeto.
6. Identificar factories, fixtures, test doubles e helpers já criados.
7. Confirmar o ambiente efetivamente carregado (`NODE_ENV=test`, `.env.test`).
8. Confirmar o banco de dados efetivamente utilizado nos testes.
9. Não executar testes sem confirmar isolamento total.

## Princípios

- Testar comportamento, invariantes e contratos de integração.
- Criar testes determinísticos, independentes e paralelizáveis quando suportado.
- Preservar testes existentes e convenções de nomenclatura (.spec.ts, .test.ts).
- Criar testes de regressão automatizados para bugs antes de aplicar correções.
- Seguir o runner e os utilitários de teste já existentes no repositório.
- Não enfraquecer asserções ou desativar testes para fazê-los passar.
- Não trocar Vitest por Jest ou vice-versa sem solicitação explícita.
- Não afirmar que testes passaram sem execução real no terminal.

## Proteção De Ambiente

- Nunca executar testes na branch `production` ou contra instâncias de produção.
- Confirmar que o banco de dados utilizado é exclusivo para testes (ex: banco local de teste, SQLite em memória para testes unitários ou container isolado).
- Não confiar cegamente apenas em arquivos `.env.test`; inspecionar variáveis de ambiente ativas.
- Considerar o isolamento de concorrência quando múltiplos workers de teste executarem em paralelo.
- Não executar testes se o isolamento de dados não puder ser plenamente confirmado.

## Uso Das Referências

Antes de criar, corrigir ou executar testes:

1. Identificar os domínios afetados pela tarefa.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a tarefa atual.

## Referências Por Domínio

- Tipos e estrutura de testes → `references/tipos-e-estrutura.md`
- Runners e factories → `references/runners-factories.md`
- Auth, validação, API e banco → `references/autenticacao-validacao-banco.md`
- Mocks, tempo e filas → `references/mocks-tempo-filas.md`
- Integrações HTTP e uploads → `references/integracoes-uploads.md`
- Ambiente e execução → `references/ambiente-execucao.md`
- Investigação de falhas e testes flaky → `references/investigacao-falhas.md`
- Fluxos, checklist e entrega → `references/fluxos-checklist-entrega.md`
