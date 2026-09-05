# API E Resources

- Preservar nomes, tipos e estrutura dos campos existentes.
- Não alterar envelope, status HTTP ou paginação sem confirmação.
- Usar Resources quando o projeto adotar esse padrão.
- Não fazer consultas dentro de Resources.
- Não colocar regra de negócio em Resources.
- Utilizar códigos HTTP coerentes com o contrato existente.
- Usar status `201` quando um recurso for criado e persistido, salvo contrato diferente.
- Não expor IDs internos quando o projeto usar identificadores protegidos.
- Preservar filtros, ordenação, paginação e versionamento existentes.
- Considerar idempotência em endpoints que possam ser repetidos.
- Não alterar contratos de API por preferência pessoal.
