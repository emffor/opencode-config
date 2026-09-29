# Dependências E Compatibilidade Na Revisão

## Revisão De Dependências (package.json E Lockfiles)

- Verificar se novas dependências foram adicionadas no `package.json` sem necessidade justificada ou sem autorização do usuário.
- Conferir se o lockfile correspondente (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`) foi atualizado de forma consistente com o `package.json`.
- Verificar se a versão do pacote adicionado possui vulnerabilidades conhecidas (executar `npm audit` quando relevante).
- Conferir se a dependência adicionada suporta a versão de Node.js e o sistema de módulos (ESM vs CommonJS) adotado pelo repositório.

## Sinais De Alerta No Diff

- Adição de `any` ou `@ts-ignore` / `@ts-expect-error` sem justificativa formal.
- Desativação de regras de lint com comentários `eslint-disable`.
- Modificações em scripts de build ou inicialização sem explicação no PR.
- Presença de credenciais, chaves de API ou arquivos de ambiente (`.env`) no diff.
- Timeouts exagerados ou sleeps artificiais (`setTimeout`) inseridos para resolver problemas de sincronização assíncrona.
