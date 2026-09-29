# Validação, Schemas, Services E Use Cases

## Schemas E Validação De Entrada

- Validar todo dado vindo de fora (`body`, `query`, `params`, headers) na fronteira da aplicação.
- Respeitar a biblioteca de validação do projeto (Zod, class-validator, Joi, Yup).
- Inferir tipos TypeScript diretamente dos schemas de validação (`z.infer<typeof schema>`) para garantir fonte única da verdade.
- Rejeitar propriedades adicionais desconhecidas ou sanitizar a entrada quando o schema suportar (`strip` ou `whitelist: true`).
- Fornecer mensagens de erro de validação claras, estruturadas e sem expor detalhes internos.
- Não misturar validação de schema (formato, tamanho, tipo) com validação de regras de negócio que dependem de banco ou APIs externas.

## Services E Use Cases

- Isolar a regra de negócio e coordenação de fluxo na camada de Service ou Use Case.
- Receber dados já validados e tipados através de DTOs ou interfaces bem definidas.
- Manter Services independentes de objetos HTTP (`Request`, `Response`, `NextFunction`, `FastifyReply`).
- Evitar acoplamento direto com frameworks de transporte (Express/Fastify/NestJS) na camada de serviço para facilitar testes unitários.
- Orquestrar entidades, repositórios, transações, filas e serviços externos.
- Garantir que a lógica de domínio não seja dispersa entre controllers, middlewares e queries SQL.
- Não criar classes de serviço anêmicas que apenas repassam chamadas de repositório sem adicionar validação, coordenação ou regra de negócio.
- Lançar erros de domínio ou aplicação conhecidos (ex: `NotFoundError`, `ConflictError`, `DomainValidationError`) para serem mapeados na camada HTTP.
