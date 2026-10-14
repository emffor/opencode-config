---
name: react-code-review
description: Revisar código React, JavaScript e TypeScript com foco em bugs, regressões, segurança, acessibilidade, performance e testes.
compatibility: opencode
metadata:
  language: typescript
  framework: react
  area: code-review
---

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

1. Identificar os domínios afetados pela alteração.
2. Selecionar somente as referências relacionadas.
3. Carregar apenas as referências selecionadas.
4. Não carregar todas automaticamente.
5. Carregar referências adicionais somente quando necessário.

## Referências Por Domínio

- Escopo, JS e TS → `references/escopo-diff-js-ts.md`
- Components, Hooks e State → `references/components-hooks-state.md`
- Effects e Async → `references/effects-async-race-conditions.md`
- Forms → `references/forms-validation.md`
- API e cache → `references/api-data-fetching-cache.md`
- Performance → `references/performance-renderizacao.md`
- Segurança → `references/seguranca-frontend.md`
- Routing e Auth → `references/routing-auth-permissions.md`
- Testes → `references/testing.md`
- Acessibilidade → `references/accessibility-ui.md`
- Dependências → `references/dependencias-compatibilidade.md`
- Fluxos → `references/fluxos-de-revisao.md`
