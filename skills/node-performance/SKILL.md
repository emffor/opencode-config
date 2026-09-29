---
name: node-performance
description: Investigar e otimizar performance em backends Node.js/TypeScript com evidências, métricas e preservação de contratos.
compatibility: opencode
metadata:
  language: typescript
  runtime: node.js
  area: performance
---

# Performance Node.js

## Objetivo

Investigar e otimizar gargalos reais em aplicações e backends Node.js/TypeScript,
preservando comportamento, contratos de API e segurança.

Esta skill complementa a skill `node`.

## Princípios

- Confirmar o gargalo com métricas e evidências concretas antes de otimizar.
- Medir antes e depois (latência p50/p95/p99, throughput req/s, uso de CPU e heap de memória).
- Separar gargalos de event loop (CPU-bound), I/O de rede/banco, cache e serviços externos.
- Priorizar a maior fonte de custo.
- Aplicar a menor otimização segura que resolva o problema.
- Não adicionar cache sem estratégia de invalidação e controle de TTL.
- Não introduzir worker threads ou clustering sem avaliar se o gargalo não é I/O mal resolvido.
- Não fazer micro-otimizações sem impacto mensurável.
- Não declarar ganho de performance sem evidência real.
- Preservar contratos e comportamento existentes.

## Antes De Otimizar

1. Definir claramente o comportamento lento ou sobrecarregado.
2. Reproduzir o cenário localmente ou em ambiente de teste com carga representativa.
3. Identificar frequência, volume de requisições e impacto no sistema.
4. Coletar métricas disponíveis (logs de slow queries, CPU profiling, heap dump, APM).
5. Formular hipótese baseada em evidência.
6. Identificar o componente responsável pelo maior atraso (banco, event loop, serialização, rede).

## Uso Das Referências

Antes de otimizar:

1. Identificar os domínios relacionados ao gargalo.
2. Selecionar somente as referências relacionadas a esses domínios.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas as referências automaticamente.
5. Carregar referências adicionais somente quando o contexto exigir.
6. Não carregar referências que não influenciem a investigação atual.

## Referências Por Domínio

- ORM, SQL e Índices → `references/orm-sql-indices.md`
- Paginação, Streams e Processamento Em Lote → `references/paginacao-streams-lote.md`
- Cache e Redis → `references/cache-redis.md`
- Event Loop, Assincronicidade e Concorrência → `references/event-loop-concorrencia.md`
- Memória, APIs e Integrações → `references/memoria-apis-integracoes.md`
- Banco, Configuração e Ferramentas De Profiling → `references/banco-configuracao-ferramentas.md`
- Sinais De Alerta Em Node.js → `references/sinais-de-alerta.md`
- Fluxos, Checklist E Entrega → `references/fluxos-checklist-entrega.md`

Sinais de alerta são hipóteses, não evidências de gargalo.

Confirmar frequência, volume e impacto antes de concluir
que determinado trecho é responsável pelo problema.
