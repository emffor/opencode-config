# Rotas, Métodos HTTP E Controllers

## Rotas

- Seguir o padrão de organização existente em `routes/api.php` ou arquivos equivalentes.
- Preservar prefixos, grupos, middleware, nomes e versionamento existentes.
- Usar route model binding quando fizer sentido e estiver alinhado ao projeto.
- Não expor rotas administrativas sem autenticação e autorização adequadas.
- Não criar rotas duplicadas ou sobrepostas.
- Não alterar método HTTP apenas por preferência.
- Usar nomes de rotas quando o projeto adotar esse padrão.
- Não adicionar versionamento novo sem necessidade ou confirmação.

## Métodos HTTP

Usar os métodos conforme a semântica do contrato:

- `GET`: consultar recursos sem efeitos colaterais.
- `POST`: criar recurso ou executar operação não idempotente.
- `PUT`: substituir ou atualizar integralmente conforme o padrão da API.
- `PATCH`: atualizar parcialmente.
- `DELETE`: remover ou solicitar remoção.

Não introduzir efeitos colaterais em endpoints `GET`.

Não trocar `PUT`, `PATCH` ou `POST` sem avaliar compatibilidade com clientes existentes.

## Controllers

- Manter Controllers finos.
- Receber a entrada HTTP, validar, autorizar, orquestrar e devolver resposta.
- Delegar regras de negócio à camada adotada pelo projeto.
- Não concentrar consultas complexas ou regra de negócio no Controller.
- Não acessar diretamente Models quando existir Service, Action ou camada equivalente.
- Não capturar exceções apenas para ocultá-las ou relançá-las sem tratamento.
- Não expor stack traces, queries ou mensagens internas.
- Não montar manualmente estruturas já atendidas por Resources ou helpers existentes.
