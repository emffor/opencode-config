# Testes E Mocks

## Testes Gerais

- Usar a stack já adotada (não trocar Jest↔Vitest sem solicitação).
- Testar comportamento visível ao usuário; evitar testar detalhes internos.
- Criar teste de regressão para bugs; não remover/enfraquecer testes para "fazer passar".
- Não afirmar que testes passaram sem executá-los; não atualizar snapshots sem revisar.

## Testes De Componentes

- Testar estados relevantes (loading, erro, vazio, sucesso) e interação do usuário.
- Testar acessibilidade essencial; evitar acessar estado interno/métodos privados.
- Usar dados mínimos e previsíveis; evitar timers/waits arbitrários — usar ferramentas assíncronas apropriadas.

## Mocks

- Mockar APIs e integrações externas, não hooks internos indiscriminadamente nem a árvore inteira de componentes.
- Restaurar mocks entre testes; não permitir requests reais.
- Verificar resultado/comportamento, não apenas chamadas internas.
