# Performance E Renderização

## Renderização

- Verificar re-renders excessivos com impacto plausível.
- Verificar contextos atualizando árvores grandes.
- Verificar cálculos pesados durante render.
- Verificar listas grandes.
- Verificar componentes recriados desnecessariamente.
- Verificar selectors retornando referências instáveis.

## Memoização

- Verificar `useMemo` somente quando houver benefício.
- Verificar `useCallback` somente quando houver benefício.
- Verificar `React.memo` somente quando houver benefício.
- Verificar memoização com dependências incorretas.
- Verificar memoização escondendo problema arquitetural.
- Não sugerir memoização por padrão.

## Recursos

- Verificar requests duplicados.
- Verificar imports pesados.
- Verificar bundles excessivos.
- Verificar carregamento antecipado desnecessário.
- Verificar lazy loading quando houver impacto real.
- Verificar imagens ou arquivos excessivamente grandes.
- Não apontar micro-otimizações sem impacto plausível.

Aplicar também os critérios da skill
`react-performance` quando necessário.
