# Acessibilidade, Segurança, Roteamento, Estilos E Assets

## Acessibilidade

- Usar elementos semânticos; associar labels a campos; preservar navegação por teclado.
- Gerenciar foco em modais/menus; usar `aria-*` só quando necessário; garantir nomes acessíveis.
- Não depender só de cor para comunicar estado; respeitar preferência de movimento reduzido.

## Roteamento E Auth

- Preservar rotas, params e URLs públicas; não trocar biblioteca de roteamento sem solicitação.
- Não confiar no frontend como mecanismo final de autorização; confirmar sempre no backend.
- Preservar estratégia de auth existente; não armazenar secrets no frontend; tratar expiração de sessão.

## Segurança

- Não renderizar HTML não confiável com `dangerouslySetInnerHTML` sem sanitização.
- Não expor secrets no bundle nem logar tokens/cookies/dados pessoais.
- Verificar XSS e URLs controladas pelo usuário; preservar CSP/CORS existentes.

## Estilos E Design System

- Respeitar estratégia existente (CSS Modules, Tailwind, styled-components etc.); não misturar sem necessidade.
- Reutilizar componentes/tokens do design system; não duplicar; avaliar impacto antes de alterar componente compartilhado.
- Preservar responsividade e estados de hover/focus/active/disabled/erro.

## Imagens E Assets

- Usar estratégia existente; definir dimensões para evitar layout shift; preservar textos alternativos.
- Não usar texto importante só dentro de imagem; verificar caminhos no build de produção.
