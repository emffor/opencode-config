# PHP E Controllers

## PHP

- Respeitar a versão configurada no projeto.
- Usar recursos compatíveis com a versão atual do PHP.
- Usar type declarations e return types quando compatíveis com o padrão existente.
- Usar enums, readonly properties e constructor property promotion quando compatíveis.
- Evitar métodos extensos e responsabilidades misturadas.
- Evitar boolean flags que alterem excessivamente o comportamento de métodos.
- Não criar métodos privados que apenas ocultem uma linha simples.
- Não capturar exceções apenas para relançá-las sem contexto ou tratamento.
- Não usar recursos de versões posteriores à configurada no projeto.

## Controllers

- Manter controllers finos.
- Não concentrar regra de negócio complexa.
- Validar e autorizar antes de executar a operação.
- Delegar regras de negócio à camada adotada pelo projeto.
- Não fazer consultas complexas no controller.
- Não acessar diretamente Models quando existir camada específica para a ação.
- Retornar respostas conforme o padrão existente.
- Não montar manualmente estruturas já atendidas por Resources ou helpers.
- Não expor queries, exceções internas ou stack traces.
- Não transformar o controller em um service disfarçado.
