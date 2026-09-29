# Validação, Autenticação, Autorização E Contrato De API

## Validação De Contratos De API

- Manter os schemas de requisição e resposta alinhados com o contrato público documentado.
- Validar tipos de parâmetros de rota (ex: garantir que `:id` seja um UUID válido ou número inteiro positivo).
- Validar query strings com valores padrão e limites seguros (ex: `page`, `limit` com valor máximo obrigatório).
- Rejeitar payloads que excedam limites permitidos para mitigar ataques de negação de serviço.
- Não introduzir campos obrigatórios adicionais em endpoints existentes sem versionamento, para não quebrar clientes antigos.

## Autenticação E Autorização Nos Endpoints

- Proteger rotas privadas por padrão; rotas públicas devem ser declaradas de forma explícita e justificada.
- Extrair o token do cabeçalho `Authorization: Bearer <token>` de forma resiliente a espaços e maiúsculas/minúsculas.
- Aplicar verificações de permissões e escopos (scopes/roles) logo após a autenticação.
- Verificar se o usuário ativo possui acesso ao recurso específico solicitado antes de qualquer mutação.
- Retornar `401 Unauthorized` quando a autenticação falhar ou não for fornecida.
- Retornar `403 Forbidden` quando o usuário for reconhecido mas não possuir autorização suficiente.
- Retornar `404 Not Found` em vez de `403` quando a existência do recurso for uma informação confidencial (prevenção contra enumeração de recursos).
