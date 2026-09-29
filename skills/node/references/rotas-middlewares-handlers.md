# Rotas, Métodos HTTP E Middlewares

## Rotas E Métodos HTTP

- Estruturar rotas seguindo os princípios RESTful:
  - `GET /recursos`: listagem com paginação e filtros.
  - `GET /recursos/:id`: obtenção de um único recurso por identificador.
  - `POST /recursos`: criação de um novo recurso.
  - `PUT /recursos/:id`: substituição completa de um recurso existente.
  - `PATCH /recursos/:id`: atualização parcial de campos específicos.
  - `DELETE /recursos/:id`: exclusão de recurso.
- Respeitar a convenção de rotas do framework utilizado (Express Router, Fastify plugins/routes, NestJS `@Controller` e decorators de rota).
- Manter nomes de rotas no plural, em minúsculas e separados por hífens (`kebab-case`).
- Evitar verbos nas URLs de recursos (ex: preferir `POST /pedidos/:id/cancelamentos` ou `POST /pedidos/:id/cancel` em vez de `GET /cancelarPedido`).

## Middlewares E Interceptors

- Usar middlewares para responsabilidades transversais: autenticação, autorização, logging de requisições, rate limiting, compressão e parsing.
- Não executar lógica de negócio ou persistência complexa dentro de middlewares.
- Sempre chamar `next()` ou retornar a resposta apropriada para evitar requisições travadas no ciclo de vida do Node.js.
- Passar dados contextuais (ex: usuário autenticado, correlation ID, tenant ID) através do objeto de requisição tipado via declaração de módulo (`declare global { namespace Express { ... } }`) ou `AsyncLocalStorage`.
- Configurar o middleware central de tratamento de erros ao final da cadeia de middlewares (com 4 argumentos no Express: `(err, req, res, next)`).
