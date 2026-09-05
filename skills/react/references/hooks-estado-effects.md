# Hooks, Estado, Effects, Context E Estado Global

## Hooks

- Respeitar Rules of Hooks; não chamar condicionalmente ou fora de componentes/custom hooks.
- Manter dependências corretas em `useEffect`/`useMemo`/`useCallback`; não silenciar `exhaustive-deps` sem justificativa.
- Limpar subscriptions, timers, observers e listeners; evitar loops de renderização.
- Criar custom hooks só com reuso real; verificar stale closures em callbacks assíncronos.

## useEffect

- Usar para sincronizar com sistemas externos, não como substituto de eventos/cálculos derivados.
- Definir cleanup; tratar concorrência e respostas obsoletas; não usar timeout para sincronização.
- Evitar requests duplicadas por deps incorretas; separar effects independentes.

## Estado

- Estado local quando o dado pertence ao componente; elevar só quando necessário.
- Não duplicar estado derivável; manter atualizações imutáveis; usar atualização funcional quando depender do valor anterior.
- Usar reducer para transições complexas; respeitar a solução de estado já adotada (não trocar por preferência).

## Context

- Manter escopo do Provider adequado; separar contexts por domínio quando houver benefício real.
- Evitar recriar valores do Provider sem necessidade (re-render); não usar Context como substituto automático de lib de estado.
- Para componentes complexos, preferir Context para parâmetros, configuração, estado e ações compartilhados pela subárvore, evitando prop drilling por componentes intermediários.
- Usar o Context mais próximo do limite funcional do componente/módulo, com um Provider e hook tipados; não transformar toda a aplicação em um único contexto.
- Não esconder no Context dependências específicas da instância: props continuam preferíveis para dados locais, APIs públicas simples e componentes que precisam ser facilmente reutilizados fora daquela subárvore.
- Em telas complexas, o Context pode coordenar estado local, queries, mutations, filtros, uploads, reorder, abertura de modais e invalidação de cache quando esses elementos compõem um único fluxo.
- Quando esse padrão fizer sentido, concentrar a lógica em `use[NomeModulo]ContextData`, inferir o tipo com `ReturnType<typeof use[NomeModulo]ContextData>` e criar o Context com valor inicial `undefined`.
- O hook público deve lançar um erro claro quando for usado fora do Provider; tipar também `children`, o Provider e o valor do Context, sem `any`.
- Memorizar o valor do Provider quando ele combinar estado e callbacks, e separar contexts quando consumidores independentes puderem evitar re-renderizações desnecessárias.
- Ao alterar Contexto ou Provider, localizar consumidores reais e verificar o impacto no contrato, nos testes e nas renderizações antes de concluir a mudança.

## Redux/Estado Global

- Seguir a biblioteca e padrões existentes; não introduzir abordagem paralela.
- Manter estado normalizado; evitar dados derivados no store; preservar actions/selectors/reducers existentes.
- Não substituir Redux clássico por Toolkit, ou Redux por Zustand/Context, sem solicitação.
