# Performance, Memorização E Lazy Loading

## Performance

- Não otimizar sem evidência de impacto; medir antes/depois quando possível.
- Identificar re-renders reais antes de memoizar; considerar custo da memoização.
- Avaliar paginação/lazy loading/virtualização só para grandes conjuntos; avaliar code splitting em rotas grandes.

## Em Projetos Legados

- Não sugerir APIs de performance incompatíveis com a versão instalada.
- Preferir corrigir re-renders/queries/cálculos localmente; não converter a app inteira por um componente lento.
- Separar: melhoria no ambiente atual / melhoria dependente de atualização / custo e risco.

## Lazy Loading E Code Splitting

- Aplicar em rotas/módulos de peso relevante; evitar fragmentar componentes pequenos sem ganho.
- Tratar loading e erro; verificar compatibilidade com o bundler; medir impacto real.

## Memorização

- `React.memo` só com props estáveis e re-render custoso comprovado.
- `useMemo` para cálculo relevante, não como padrão; `useCallback` quando a identidade da função importa.
- Não envolver todo handler em `useCallback`; remover memoização que aumenta complexidade sem benefício.
