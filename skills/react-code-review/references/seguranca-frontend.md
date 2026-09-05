# Segurança Frontend

## XSS E Conteúdo Externo

- Verificar `dangerouslySetInnerHTML`.
- Verificar HTML externo sem sanitização.
- Verificar URLs controladas pelo usuário.
- Verificar conteúdo externo inserido no DOM.
- Verificar templates ou markdown não sanitizados.

## Tokens E Dados Sensíveis

- Verificar secrets incluídos no bundle.
- Verificar tokens expostos em logs.
- Verificar dados sensíveis em localStorage.
- Verificar dados sensíveis em sessionStorage.
- Verificar informações internas exibidas na UI.
- Verificar dados sensíveis enviados desnecessariamente.

## Autorização

- Verificar confiança excessiva no frontend.
- Verificar permissões baseadas somente na UI.
- Verificar recursos acessíveis alterando parâmetros.
- Verificar IDs manipuláveis pelo usuário.
- Verificar redirects controlados externamente.
- Verificar open redirect.
- Verificar dados de outro usuário ou tenant.

Ocultar botão, rota ou componente não constitui autorização.
A autorização deve ser garantida pelo backend.
