# API Resources, Respostas E Status HTTP

## API Resources

- Usar Resources quando o projeto adotar esse padrão.
- Não realizar consultas no banco dentro de Resources.
- Não colocar regra de negócio em Resources.
- Trabalhar com dados já preparados pela camada de negócio.
- Preservar nomes, tipos e estrutura dos campos existentes.
- Usar `whenLoaded()` para relacionamentos opcionais quando aplicável.
- Evitar acessar relacionamentos não carregados.
- Não expor atributos internos, sensíveis ou não documentados.
- Não expor IDs brutos quando o projeto usar identificadores protegidos.

## Respostas

- Seguir o envelope e os helpers de resposta existentes.
- Não alterar a estrutura raiz sem confirmação explícita.
- Não adicionar ou remover campos globalmente por preferência.
- Preservar mensagens, códigos internos e metadados existentes.
- Retornar JSON consistente.
- Não retornar HTML acidentalmente em endpoints de API.
- Não expor exceções, SQL, caminhos internos ou stack traces.
- Preservar headers relevantes, como paginação, cache ou localização.

## Status HTTP

Seguir primeiro o contrato existente.

Quando não houver padrão definido, considerar:

- `200 OK`: consulta ou atualização concluída.
- `201 Created`: recurso criado e persistido.
- `202 Accepted`: processamento assíncrono aceito.
- `204 No Content`: sucesso sem corpo.
- `400 Bad Request`: entrada inválida fora de uma semântica mais específica.
- `401 Unauthorized`: autenticação ausente ou inválida.
- `403 Forbidden`: usuário autenticado sem autorização.
- `404 Not Found`: recurso inexistente ou não acessível conforme política.
- `409 Conflict`: conflito de estado, duplicidade ou concorrência.
- `422 Unprocessable Entity`: falha de validação semântica.
- `429 Too Many Requests`: limite excedido.
- `500 Internal Server Error`: falha interna não tratável pelo cliente.

Não alterar status HTTP existente sem avaliar integrações consumidoras.
