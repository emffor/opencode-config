---
name: react
description: Desenvolver, corrigir, revisar e refatorar aplicações React seguindo a arquitetura, os contratos e os padrões existentes no repositório. Usar em tarefas envolvendo componentes, hooks, estado, formulários, roteamento, consumo de APIs, TypeScript, JavaScript, acessibilidade, performance, testes e arquitetura frontend.
license: MIT
compatibility: codex, opencode
metadata:
  language: typescript
  framework: react
  area: frontend
---

# React

## Objetivo

Desenvolver, corrigir e refatorar aplicações React de forma segura, previsível e compatível com a arquitetura, os contratos e as convenções existentes em cada repositório.

As instruções do `AGENTS.md` do projeto têm prioridade sobre esta skill.

## Hierarquia De Decisão

Quando houver mais de uma solução possível, seguir esta ordem:

1. Preferências explícitas do usuário.
2. Componentes, hooks e serviços já existentes no projeto.
3. Padrão já usado no domínio ou módulo alterado.
4. A solução mais explícita, direta e com menos camadas de abstração.

Não inventar um padrão novo, alterar componentes CORE ou tornar a solução mais genérica sem necessidade comprovada. Ao alterar um componente compartilhado, localizar seus consumidores reais e avaliar primeiro uma correção no módulo/página solicitada.

## Antes De Implementar

1. Ler o `AGENTS.md` e a documentação relevante.
2. Identificar versões de Node.js, React, TypeScript e dependências principais.
3. Identificar o package manager (`package-lock.json` = npm, `yarn.lock` = Yarn, `pnpm-lock.yaml` = pnpm).
4. Inspecionar `package.json`, scripts de build, lint e testes.
5. Identificar o bundler/framework (Vite, Next.js, CRA, Webpack).
6. Localizar componentes, hooks e fluxos semelhantes já existentes.
7. Identificar contratos públicos de componentes, rotas e APIs.
8. Identificar se o projeto adota uma arquitetura modular, incluindo módulos aninhados; seguir essa estrutura quando ela já existir, sem impô-la a projetos que usam outra organização.
9. Não introduzir arquitetura, biblioteca ou padrão novo quando já houver solução consolidada.

## Classificar O Contexto

- **Legado**: preservar versões, não migrar JS→TS, não trocar libs de estado/forms/estilo sem solicitação, preferir correção incremental e localizada. Detalhes → `references/legado-e-novos.md`.
- **Novo**: pode usar recursos atuais, definir padrões desde o início, evitar abstrações prematuras.
- **Módulo novo em legado**: seguir contratos de integração existentes, evitar arquitetura paralela.

## Arquitetura Modular Recomendada

Quando o projeto usar organização por domínio, preferir módulos autocontidos e recursivos:

```text
modules/[modulo]/
├── components/  # componentes específicos do módulo
├── constants/   # textos, constantes de UI e query keys
├── contexts/    # estado e lógica compartilhados pela subárvore
├── hooks/       # hooks próprios do módulo
├── models/      # DTOs, schemas e tipos
├── pages/       # páginas do módulo
├── services/    # serviços de API
└── modules/     # submódulos, quando houver uma fronteira funcional real
```

- Manter cada responsabilidade próxima do domínio que a utiliza; só mover algo para uma área compartilhada quando houver consumidores reais em mais de um módulo.
- Em módulos grandes, criar submódulos com a mesma estrutura em vez de concentrar tudo em uma pasta única ou criar uma arquitetura paralela.
- Usar `components` para apresentação específica, `hooks` para comportamento reutilizável, `contexts` para fluxos compartilhados, `services` para integração HTTP e `models` para contratos/tipos. A separação deve seguir o padrão real do repositório.
- Em módulos simples, não criar todas as pastas por obrigação; a arquitetura deve ser proporcional ao fluxo e evitar arquivos vazios ou camadas artificiais.
- Ao criar arquivos, seguir a convenção de nomes do projeto. Prefixos por módulo são úteis para descoberta, mas não devem ser impostos quando o repositório adota outra convenção.

## Princípios Gerais

- Priorizar correção, simplicidade, legibilidade e previsibilidade; corrigir a causa-raiz.
- Preservar comportamento e contratos existentes; preferir composição a abstrações excessivas.
- Não adicionar dependências, trocar bibliotecas ou alterar arquitetura sem necessidade comprovada.
- Verificar disponibilidade/compatibilidade de qualquer API antes de usá-la.
- Não modernizar ou reformatar código fora do escopo da tarefa.
- Quando houver uma preferência arquitetural explícita do usuário, incorporá-la ao desenho da solução sem ignorar os padrões já consolidados no repositório.
- Em diagnósticos, separar causa-raiz comprovada, hipótese, melhoria opcional e validação ainda pendente; não apresentar comportamento mockado ou validação estática como integração real.
- Em mudanças end-to-end, rastrear o contrato ponta a ponta entre tela, hooks/serviços, API, persistência e integrações; não parar em uma correção apenas visual quando as outras camadas forem afetadas.
- Se um componente compartilhado puder quebrar consumidores, procurar primeiro uma correção localizada no módulo/página solicitada e só alterar o compartilhado quando o contrato e o impacto estiverem confirmados.

## Referências Por Domínio

Carregar apenas o arquivo relevante à tarefa atual:

- Hooks, estado, effects, Context/Redux → `references/hooks-estado-effects.md`
- APIs, fetching, React Query/SWR, formulários, validação → `references/dados-remotos-forms.md`
- Performance, memoização, lazy loading/code splitting → `references/performance-memorizacao.md`
- Acessibilidade, segurança, autenticação, estilos, design system, assets → `references/acessibilidade-seguranca-estilos.md`
- Testes, mocks, testes de componente → `references/testes.md`
- Fluxos passo a passo, checklist e formato de entrega → `references/fluxos-e-checklist.md`
- Regras detalhadas de projetos legados vs. novos → `references/legado-e-novos.md`

## TypeScript/JavaScript (regras rápidas)

- Respeitar linguagem e `tsconfig.json` existentes; não migrar arquivos sem solicitação.
- Evitar `any` e `@ts-ignore`/`@ts-expect-error` sem justificativa.
- Preferir tipos explícitos em contratos públicos; reutilizar tipos já existentes.
- Separar, quando o projeto adotar essa distinção, DTOs de entrada/saída da API, schemas de validação e tipos internos de UI; não misturar o contrato externo com o estado do formulário.

## Componentes E Props (regras rápidas)

- Manter responsabilidade clara e API de props estável; avaliar consumidores antes de mudar props.
- Extrair componentes só com ganho real de reuso/leitura; evitar over-fragmentação.
- Não espalhar props indiscriminadamente em elementos DOM.
- Para componentes complexos, preferir Contexto para parâmetros, configuração, estado e ações compartilhados por uma subárvore, especialmente quando a alternativa seria prop drilling entre vários níveis.
- Definir um Contexto por domínio/responsabilidade, com Provider próximo da subárvore que o consome; evitar um contexto global genérico que esconda dependências ou cause re-renderizações amplas.
- Manter por props os dados realmente específicos da instância e as dependências que tornam um componente simples, reutilizável e fácil de testar; Contexto não deve ser usado apenas para evitar uma ou duas props.
- Expor um hook de consumo do contexto com erro claro quando usado fora do Provider; tipar valor, Provider e hook sem `any`.

## Comandos De Validação

Executar somente os comandos existentes no projeto (identificar package manager antes):

- `lint`, `test`, `typecheck`, `build` conforme `npm run`, `yarn` ou `pnpm`.
- Não executar todos automaticamente nem usar comandos de outro package manager.
- Informar quais validações passaram, quais falharam e quais não foram executadas; distinguir erros preexistentes de erros introduzidos pela alteração. Build aprovado não substitui lint, TypeScript, testes ou validação end-to-end quando forem relevantes.

## Sinais De Alerta

hooks condicionais; deps ausentes em effects; estado derivado duplicado; índice como key em lista mutável; requests em loop/duplicadas; `dangerouslySetInnerHTML`; secrets no frontend; `any`/`@ts-ignore` sem justificativa; `eslint-disable` amplo; memoização indiscriminada; `setTimeout` para sincronização; catch vazio; dependência nova para tarefa simples; `.env` no diff; testes removidos/enfraquecidos.

Um sinal de alerta não é bug automático — confirmar contexto e impacto.
