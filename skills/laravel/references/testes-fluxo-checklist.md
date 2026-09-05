# Testes De API, Fluxo, Checklist E Entrega

## Testes De API

- Criar ou atualizar testes de Feature para alterações de comportamento.
- Testar autenticação e autorização.
- Testar validação e estrutura de erro.
- Testar estrutura e tipos da resposta.
- Testar status HTTP.
- Testar pertencimento e acesso indevido.
- Testar paginação, filtros e ordenação quando aplicável.
- Criar teste de regressão para bugs.
- Não enfraquecer testes para fazer a suíte passar.
- Antes de executar testes com banco, aplicar as regras da skill `laravel-testing`.
- Não executar testes quando não for possível confirmar isolamento seguro do banco.

## Fluxo Para Criar Ou Alterar Endpoint

1. Ler o `AGENTS.md` e identificar o padrão do módulo.
2. Localizar endpoint semelhante.
3. Confirmar rota, método HTTP, autenticação e autorização.
4. Confirmar contrato de entrada e saída.
5. Definir validação.
6. Implementar a regra na camada adotada pelo projeto.
7. Validar vínculos e pertencimento.
8. Transformar a resposta conforme o padrão existente.
9. Aplicar status HTTP compatível.
10. Criar ou atualizar testes de Feature.
11. Atualizar documentação quando aplicável.
12. Revisar compatibilidade e segurança.
13. Revisar o diff antes de concluir.

## Checklist

- Rota e método HTTP corretos.
- Autenticação aplicada.
- Autorização e pertencimento validados.
- Entrada validada.
- Controller fino.
- Regra de negócio na camada adequada.
- Resource sem consultas ou regra de negócio.
- Contrato existente preservado.
- Status HTTP compatível.
- IDs e dados sensíveis protegidos.
- Paginação e limites aplicados quando necessários.
- Risco de N+1 verificado.
- Testes criados ou atualizados.
- Documentação atualizada quando aplicável.

## Entrega

Ao concluir uma alteração de API, informar:

- Rotas e endpoints afetados.
- Contratos de entrada e saída alterados.
- Arquivos, classes e métodos modificados.
- Impactos de compatibilidade.
- Riscos de segurança ou performance.
- O que foi validado.
- O que não foi validado.
- Mensagem de commit sugerida em pt-BR, curta e imperativa.
