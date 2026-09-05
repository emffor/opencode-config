---
name: laravel-performance
description: Investigar e otimizar performance Laravel com evidências, métricas e preservação de contratos.
compatibility: opencode
metadata:
  language: php
  framework: laravel
  area: performance
---

# Performance Laravel

## Objetivo

Investigar e otimizar gargalos reais em aplicações Laravel,
preservando comportamento, segurança e contratos.

Esta skill complementa a skill `laravel`.

## Princípios

- Confirmar o gargalo antes de otimizar.
- Medir quando possível antes e depois.
- Separar aplicação, banco, cache, filas e serviços externos.
- Priorizar a maior fonte de custo.
- Aplicar a menor otimização segura.
- Não adicionar cache sem estratégia de invalidação.
- Não aumentar workers ou paralelismo sem avaliar dependências.
- Não introduzir complexidade sem benefício comprovado.
- Não declarar ganho sem evidência.
- Preservar contratos e comportamento existentes.

## Antes De Otimizar

1. Definir o comportamento lento.
2. Reproduzir quando possível.
3. Identificar frequência, volume e impacto.
4. Coletar métricas disponíveis.
5. Formular hipótese baseada em evidência.
6. Identificar o domínio responsável pelo maior custo.

## Uso Das Referências

Antes de otimizar:

1. Identificar os domínios relacionados ao gargalo.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a investigação atual.

## Referências Por Domínio

- Eloquent, SQL e índices → `references/eloquent-sql-indices.md`
- Paginação, lotes e Collections → `references/paginacao-lote-collections.md`
- Cache e Redis → `references/cache-redis.md`
- Filas, Jobs, Horizon e Octane → `references/filas-horizon-octane.md`
- Memória, APIs e integrações → `references/memoria-apis-integracoes.md`
- Banco, locks e profiling → `references/banco-configuracao-ferramentas.md`
- Sinais de alerta → `references/sinais-de-alerta.md`
- Fluxos e checklist → `references/fluxos-checklist-entrega.md`

Sinais de alerta são hipóteses, não evidências de gargalo.

Confirmar frequência, volume e impacto antes de concluir
que determinado trecho é responsável pelo problema.
