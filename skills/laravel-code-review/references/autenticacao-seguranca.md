# Autenticação, Autorização E Segurança

## Autenticação E Autorização

- Verificar middleware, guards, Policies e Gates.
- Verificar ausência de autorização em leitura, alteração ou exclusão.
- Verificar validação de pertencimento.
- Verificar acesso entre usuários ou tenants.
- Verificar bypass por parâmetros controlados pelo cliente.
- Verificar enumeração de recursos sensíveis.
- Verificar exposição de tokens, cookies ou headers.
- Verificar desativação de autenticação para testes.
- Verificar confiança excessiva no frontend.
- Verificar permissões amplas ou defaults inseguros.

## Segurança

- Procurar SQL concatenado com entrada externa.
- Procurar mass assignment de campos sensíveis.
- Procurar XSS em Blade, HTML ou conteúdo não escapado.
- Procurar SSRF em URLs controladas pelo usuário.
- Procurar path traversal em uploads e downloads.
- Verificar validação de MIME type, extensão e tamanho.
- Verificar exposição de caminhos internos.
- Verificar logs com dados sensíveis.
- Verificar secrets, tokens, chaves e `.env` no diff.
- Verificar desativação de CSRF, rate limiting ou validações.
- Verificar uso inseguro de serialização.
- Verificar comandos shell com entrada externa.
