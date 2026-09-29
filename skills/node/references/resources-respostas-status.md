# Respostas, Envelopes E Status HTTP

## Padrão De Respostas HTTP

- Manter coerência estrutural nas respostas de sucesso e erro em toda a API.
- Quando o projeto utilizar envelope de dados, seguir o formato adotado (ex: `{ data: ... }` ou `{ success: true, result: ... }`).
- Para listagens paginadas, incluir metadados de paginação padronizados:
  ```json
  {
    "data": [...],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
  ```
- Para paginação por cursor:
  ```json
  {
    "data": [...],
    "meta": {
      "limit": 20,
      "hasNextPage": true,
      "nextCursor": "eyJpZCI6MTIzfQ=="
    }
  }
  ```

## Tratamento De Erros Padronizado

- Não expor stack traces em ambientes que não sejam de desenvolvimento local.
- Fornecer respostas de erro informativas para o cliente consumidor, estruturadas com código de erro, mensagem e detalhes de campos quando aplicável:
  ```json
  {
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Dados de entrada inválidos",
      "details": [
        { "field": "email", "message": "E-mail inválido" }
      ]
    }
  }
  ```
- Utilizar os códigos de status HTTP correspondentes de forma semântica e inequívoca.
