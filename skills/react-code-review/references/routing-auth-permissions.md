# Routing, Autenticação E Permissões

## Routing

- Verificar rotas quebradas ou removidas.
- Verificar parâmetros obrigatórios.
- Verificar query parameters.
- Verificar redirects incorretos.
- Verificar loops de redirect.
- Verificar navegação antes de operações concluírem.
- Verificar acesso direto por URL.
- Verificar estado perdido ao navegar.

## Autenticação

- Verificar estado de autenticação inicial.
- Verificar sessão expirada.
- Verificar tratamento de 401.
- Verificar logout.
- Verificar redirecionamento após login.
- Verificar race condition durante carregamento da sessão.
- Verificar conteúdo protegido renderizado antes da validação.

## Permissões

- Verificar permissões inconsistentes.
- Verificar menus e rotas divergentes.
- Verificar permissões antigas ainda utilizadas.
- Verificar parâmetros manipuláveis pelo cliente.
- Verificar ausência de fallback seguro.

Permissão no frontend é controle de interface,
não mecanismo definitivo de segurança.
