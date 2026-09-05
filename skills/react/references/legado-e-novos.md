# Projetos Legados, Novos E Módulos Novos

## Em Projetos Legados

- Respeitar versões atuais de React, Node.js, TypeScript e dependências.
- Não usar APIs inexistentes nas versões instaladas nem exigir atualização para corrigir problema localizado.
- Não migrar JS→TS, não converter class→function fora do escopo.
- Não substituir Redux/Context/MobX/Zustand, Axios/Fetch, React Router, lib de forms/estilos/testes sem solicitação.
- Não introduzir React Query, SWR, Zustand, Redux Toolkit automaticamente.
- Não usar Server Components, Suspense, transitions sem confirmar compatibilidade.
- Preferir mudanças incrementais e localizadas; preservar contratos, rotas e payloads.
- Avaliar impacto em componentes compartilhados; não modernizar arquivos não relacionados.
- Separar: correção compatível com a versão atual / melhoria pós-atualização / riscos da atualização.

## Em Projetos Novos

- Usar recursos atuais compatíveis com as versões definidas; preferir TypeScript se fizer parte da decisão do projeto.
- Definir padrões claros para componentes, estado, requests, forms e testes.
- Evitar bibliotecas sem benefício comprovado e abstrações para necessidades hipotéticas.
- Manter arquitetura proporcional ao tamanho da aplicação; considerar a11y e testes desde o início.

## Em Módulos Novos Dentro De Legado

- Seguir contratos necessários para integração com o sistema existente.
- Usar recursos modernos só quando compatíveis com o ambiente atual.
- Não criar arquitetura paralela; melhorar gradualmente sem virar migração completa.
- Documentar diferenças relevantes entre módulo novo e código legado.
- Preservar package manager, build, roteamento e estratégia de estado existentes.

## Dependências, Build E Package Manager

- Não adicionar/remover/atualizar dependências sem confirmação explícita; avaliar manutenção, licença, tamanho.
- Usar exclusivamente o package manager identificado pelo lockfile; não gerar lockfile de outro gerenciador.
- Não alterar Babel/ESLint/Prettier/TS/bundler fora do escopo; não editar `.env` automaticamente.
- Seguir ESLint/Prettier existentes; não reformatar arquivos inteiros; não desativar regras para esconder problemas.
