# Serialização E Respostas De API

## Serialização E Mappers

- Nunca expor a entidade de banco de dados diretamente na resposta da API sem filtragem prévia.
- Usar serializers, mappers, DTOs de saída ou schemas de resposta (class-transformer, Zod parse/transform, Fastify response schema) para modelar o contrato público.
- Garantir que campos confidenciais (ex: `password_hash`, `refresh_token`, segredos, dados fiscais protegidos) nunca sejam incluídos na resposta.
- Padronizar formatação de datas (preferir ISO 8601 UTC: `YYYY-MM-DDTHH:mm:ss.sssZ`).
- Padronizar valores numéricos e monetários (usar inteiros em centavos ou string com precisão fixa para evitar perdas de ponto flutuante do JS).

## Estrutura De Respostas E Status Codes

- Retornar o código de status HTTP correto para cada operação:
  - `200 OK`: sucesso em consultas ou atualizações com corpo.
  - `201 Created`: criação bem-sucedida de recurso, preferencialmente acompanhado de cabeçalho `Location` ou ID do recurso.
  - `204 No Content`: sucesso em exclusões ou operações sem corpo de retorno.
  - `400 Bad Request`: dados de entrada malformados ou validação sintática reprovada.
  - `401 Unauthorized`: ausência ou invalidade de token/credencial de autenticação.
  - `403 Forbidden`: usuário autenticado sem permissão para acessar o recurso.
  - `404 Not Found`: recurso solicitado não encontrado.
  - `409 Conflict`: conflito de estado atual (ex: unicidade violada, slug duplicado).
  - `422 Unprocessable Entity`: validação semântica ou regra de negócio reprovada.
  - `429 Too Many Requests`: taxa de requisições excedida (rate limit).
  - `500 Internal Server Error`: erro inesperado do servidor, sem vazar detalhes internos ao cliente.
- Seguir o envelope de resposta adotado pelo projeto (ex: `{ data: ... }` ou retorno direto de payload).
- Em casos de erro, fornecer formato padronizado e previsível (ex: RFC 7807 Problem Details ou `{ message, code, errors }`).
