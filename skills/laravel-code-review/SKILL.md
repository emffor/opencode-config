---
name: laravel-code-review
description: Revisar código Laravel com foco em bugs, regressões, segurança, integridade, contratos, performance e testes.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  area: code-review
---

# Code Review Laravel

## Objetivo

Revisar alterações Laravel de forma técnica, objetiva e orientada a risco.

Esta skill complementa a skill `laravel`.

## Antes De Revisar

1. Ler o `AGENTS.md` e a documentação relevante.
2. Identificar versões do PHP e Laravel.
3. Inspecionar o escopo completo da alteração.
4. Ler o diff e arquivos relacionados.
5. Localizar implementações semelhantes.
6. Identificar contratos públicos afetados.
7. Verificar testes relacionados.
8. Identificar impactos em banco, filas, integrações ou segurança.
9. Inspecionar callers e dependências quando necessário.

## Prioridades

Revisar nesta ordem:

1. Bugs e regressões.
2. Segurança e autorização.
3. Integridade e perda de dados.
4. Quebras de contrato.
5. Concorrência, transações e idempotência.
6. Performance e consultas.
7. Testes.
8. Compatibilidade.
9. Complexidade.
10. Estilo.

Não priorizar preferências de estilo sobre problemas funcionais.

## Forma Dos Achados

Cada achado deve informar:

- gravidade;
- arquivo e localização;
- comportamento atual;
- risco ou impacto;
- cenário em que ocorre;
- correção sugerida.

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

- Escopo, PHP e Controllers → `references/escopo-diff-php-controllers.md`
- Requests, Services e Models → `references/form-requests-services-models.md`
- Performance, API e Resources → `references/performance-api-resources.md`
- Segurança e autorização → `references/autenticacao-seguranca.md`
- Banco, migrations e concorrência → `references/banco-migrations-transacoes.md`
- Jobs, cache, integrações e testes → `references/jobs-cache-integracoes-testes.md`
- Dependências e compatibilidade → `references/dependencias-compatibilidade-alertas.md`
- Fluxos de revisão → `references/fluxos-de-revisao.md`
