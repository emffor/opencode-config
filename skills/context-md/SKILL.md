---
name: context-md
description: Use when usuário pedir Faça um arquivo CONTEXT.md, criar CONTEXT.md, gerar CONTEXT.md, salvar contexto, Leia CONTEXT.md e continue a implementação. Gerencia handoff de sessão com decisões, arquivos alterados, pendências e próximos passos.
compatibility: opencode
---

# CONTEXT.md - Handoff de Sessão

## Quando Ativar

- Usuário escrever `Faça um arquivo CONTEXT.md`, `crie CONTEXT.md`, `gere contexto`, `salve o contexto` → modo GERAR.
- Usuário escrever `Leia CONTEXT.md e continue`, `retome pelo CONTEXT.md` → modo RETOMAR.

Não ativar para outros arquivos .md. Não confundir com AGENTS.md.

## Modo GERAR: Criar CONTEXT.md

1. Levantar estado real da sessão atual + branch atual:
   a. Executar `git branch --show-current`, `git status --short`, `git diff --stat`.
   b. Histórico por tipo de branch:
      - Se branch atual em `main, master, staging, development, production`: executar `git log -10 --pretty=format:"%h %ad %s" --date=short --name-status` para pegar os últimos 10 commits.
      - Se outro nome (feature/fix/chore/branch de projeto): descobrir a base (primeira existente entre `origin/development`, `development`, `origin/main`, `main`, `origin/master`, `master` via `git merge-base`) e executar `git log BASE..HEAD --pretty=format:"%h %ad %s" --date=short --name-status` para pegar todas as implementações da branch. Fallback sem base: `git log -20` com mesmo formato.
   c. Cruzar commits + diff atual + histórico da conversa para extrair decisões, arquivos alterados e pendências.
2. Não inventar. Se algo não foi feito, vai em Pendências, não em Concluído.
3. Criar/sobrescrever `./CONTEXT.md` na raiz do projeto com este template:

```markdown
# CONTEXT.md

## Objetivo
[1-3 linhas: o que a tarefa tenta resolver]

## Estado Atual
[onde parou, o que está funcionando, o que não está]

## Decisões
- [decisão + motivo curto]

## Arquivos Alterados
- `path/arquivo.ext` — [o que mudou]

## Histórico da Branch `[nome-da-branch]`
- [hash curto + data + mensagem — ex.: `a1b2c3 2026-09-04 adiciona filtro`]
- [se branch base: últimos 10 commits; se feature: todos `BASE..HEAD`]

## Pendências
- [ ] [o que falta]

## Próximos Passos
1. [passo objetivo e verificável]

## Como Continuar
> Leia CONTEXT.md e continue a implementação a partir desse estado.
```

4. Responder curto confirmando criação + listar próximos passos.

## Modo RETOMAR: Ler e Continuar

1. Ler `./CONTEXT.md`. Se não existir, avisar e pedir para gerar primeiro.
2. Ler `AGENTS.md` do projeto + global para respeitar padrões.
3. Resumir em 3-5 linhas o estado encontrado.
4. Continuar a implementação a partir de `Próximos Passos`, sem recomeçar do zero.
5. Ao final, atualizar o `CONTEXT.md` com novo estado.
