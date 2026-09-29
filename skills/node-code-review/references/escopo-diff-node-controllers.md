# Escopo, Diff, Node.js E Controllers

## Revisão De Escopo E Diff

- Verificar se a alteração contém arquivos fora do escopo solicitado (arquivos formatados desnecessariamente, refactors não solicitados).
- Verificar se foram introduzidos arquivos temporários, logs de debug (`console.log`), flags de teste ou `.env`.
- Conferir se o diff mantém compatibilidade com os tipos TypeScript existentes.

## Revisão De Controllers E Handlers

- Conferir se o controller está acumulando regras de negócio que deveriam residir em services ou use cases.
- Verificar se a validação dos parâmetros (`req.params`, `req.query`, `req.body`) é executada antes do acionamento do serviço.
- Conferir se exceções são tratadas corretamente e se não há promessas soltas sem `await` ou `catch`.
- Garantir que o controller retorne os códigos de status HTTP corretos (201 para criação, 204 para exclusão sem retorno, 400/422 para erros de cliente).
- Verificar se headers de resposta sensíveis ou objetos internos da infraestrutura estão sendo vazados.
