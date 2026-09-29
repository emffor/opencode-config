# Fluxos De Revisão E Formato De Saída

## Fluxo Para Revisão De Pull Request

1. Ler a descrição e motivação do PR.
2. Identificar arquivos, rotas e entidades afetadas.
3. Inspecionar o diff completo.
4. Ler implementações e consumidores relacionados no código existente.
5. Verificar se testes adequados acompanham a alteração.
6. Revisar segurança e autorização (autenticação, IDOR, injeções).
7. Revisar integridade de banco e consistência de migrations.
8. Revisar concorrência, transações e bloqueio do event loop.
9. Revisar performance de consultas e serialização.
10. Separar achados bloqueantes de sugestões opcionais de melhoria.
11. Resumir o risco geral da alteração.

## Formato Dos Achados

Quando houver problemas identificados, apresentar os achados ordenados por gravidade decrescente (`[CRÍTICO]`, `[ALTO]`, `[MÉDIO]`, `[BAIXO]`, `[SUGESTÃO]`).

### Modelo De Achado:

`[ALTO] Vulnerabilidade IDOR na atualização de usuário`

Arquivo: `src/modules/users/users.controller.ts:42`

Comportamento atual: O método busca e atualiza o perfil do usuário utilizando apenas o `:id` fornecido nos parâmetros da rota, sem verificar se o `req.user.id` autenticado possui permissão para alterar esse identificador.

Risco ou impacto: Qualquer usuário autenticado na API pode alterar o perfil, e-mail e dados de qualquer outro usuário cadastrado no sistema.

Cenário: Usuário A com id `10` envia `PUT /api/v1/users/20` com payload contendo novo e-mail.

Correção sugerida: Validar se `req.user.id === req.params.id` ou delegar para uma Policy/Guard de autorização que bloqueie a operação com `403 Forbidden`.
