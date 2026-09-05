---
name: laravel-testing
description: Criar, corrigir e executar testes Laravel com PHPUnit ou Pest de forma segura, determinística e isolada.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  area: testing
---

# Testes Laravel

## Objetivo

Criar e executar testes Laravel de forma segura,
determinística e compatível com o projeto.

Esta skill complementa a skill `laravel`.

## Antes De Criar Ou Executar

1. Ler o `AGENTS.md`.
2. Identificar versões do PHP, Laravel, PHPUnit e Pest.
3. Inspecionar o `composer.json`.
4. Inspecionar as configurações da suíte.
5. Localizar testes semelhantes.
6. Identificar factories, traits e helpers existentes.
7. Confirmar o ambiente efetivamente carregado.
8. Confirmar o banco efetivamente utilizado.
9. Não executar testes sem confirmar o isolamento.

## Princípios

- Testar comportamento e contratos.
- Criar testes determinísticos e independentes.
- Preservar testes existentes.
- Criar teste de regressão para bugs quando possível.
- Seguir o framework e os padrões de teste existentes no projeto.
- Não enfraquecer testes para fazê-los passar.
- Não trocar PHPUnit por Pest ou vice-versa sem solicitação.
- Não afirmar que testes passaram sem executá-los.

## Proteção De Ambiente

- Nunca executar testes na branch `production`.
- Nunca executar testes contra ambiente de produção.
- Confirmar que o banco utilizado é exclusivo para testes.
- Não confiar apenas em `.env.testing`.
- Considerar Docker, CI, variáveis de shell e configurações da suíte.
- Não executar testes se o isolamento não puder ser confirmado.

## Uso Das Referências

Antes de criar, corrigir ou executar testes:

1. Identificar os domínios afetados pela tarefa.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a tarefa atual.

## Referências Por Domínio

- Tipos e estrutura → `references/tipos-e-estrutura.md`
- PHPUnit, Pest e factories → `references/phpunit-pest-factories.md`
- Auth, validação, API e banco → `references/autenticacao-validacao-banco.md`
- Mocks, tempo e filas → `references/mocks-tempo-filas.md`
- Integrações e uploads → `references/integracoes-uploads.md`
- Ambiente e execução → `references/ambiente-traits-execucao.md`
- Investigação de falhas → `references/investigacao-falhas.md`
- Fluxos e checklist → `references/fluxos-checklist-entrega.md`
