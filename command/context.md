---
description: Gera ou retoma CONTEXT.md com decisões, arquivos alterados, pendências e próximos passos
agent: build
---

$ARGUMENTS

Se $ARGUMENTS estiver vazio ou pedir para criar/fazer/salvar CONTEXT.md:
1. Detectar branch: `git branch --show-current`.
2. Se branch em main/master/staging/development/production: `git log -10 --pretty=format:"%h %ad %s" --date=short --name-status`.
3. Se outro nome: achar base via `git merge-base` contra origin/development, development, origin/main, main e rodar `git log BASE..HEAD` com mesmo formato para pegar todas as implementações. Fallback: `git log -20`.
4. Cruzar com `git status --short`, `git diff --stat` e conversa atual.
5. Crie/sobrescreva `./CONTEXT.md` na raiz do projeto com:

# CONTEXT.md

## Objetivo
[...]

## Estado Atual
[...]

## Decisões
- [...]

## Arquivos Alterados
- `path/arquivo` — [...]

## Histórico da Branch [...]
- [hash + data + mensagem; base = últimos 10, feature = todos BASE..HEAD]

## Pendências
- [ ] [...]

## Próximos Passos
1. [...]

## Como Continuar
> Leia CONTEXT.md e continue a implementação a partir desse estado.

Levante o estado real via git status/diff. Não invente.

Se $ARGUMENTS pedir para ler/retomar/continuar a partir do CONTEXT.md:
1. Leia ./CONTEXT.md e AGENTS.md
2. Resuma o estado em 3-5 linhas
3. Continue pelos Próximos Passos
4. Atualize o CONTEXT.md ao final.
