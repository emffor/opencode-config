# Versionamento, Compatibilidade E Documentação OpenAPI

## Versionamento De API

- Respeitar a estratégia de versionamento adotada no projeto:
  - Prefixo de URI (ex: `/api/v1/usuarios`, `/api/v2/usuarios`).
  - Cabeçalhos customizados (ex: `Accept-Version: 1.0.0`).
- Tratar mudanças que alterem tipos de campos existentes, removam propriedades de resposta ou adicionem campos obrigatórios de entrada como breaking changes (exigindo nova versão).
- Manter compatibilidade retroativa com clientes existentes sempre que operar dentro da mesma versão maior de API.
- Sinalizar campos obsoletos com anotações `@deprecated` e headers HTTP adequados (`Deprecation`, `Sunset`) antes de sua remoção definitiva.

## Documentação E OpenAPI / Swagger

- Manter a especificação OpenAPI (Swagger) sincronizada com os endpoints, schemas de entrada e DTOs de saída.
- Usar as ferramentas configuradas no repositório (NestJS Swagger decorators, `@fastify/swagger`, `tsoa`, `zod-to-openapi`).
- Documentar os diferentes códigos de retorno HTTP (200, 201, 400, 401, 403, 404, 422, 500) com seus respectivos schemas.
- Incluir descrições claras para propriedades, formatos esperados (UUID, ISO date, email) e exemplos representativos.
- Não expor endpoints de desenvolvimento, rotas internas de diagnóstico não autorizadas ou segredos na documentação pública.
