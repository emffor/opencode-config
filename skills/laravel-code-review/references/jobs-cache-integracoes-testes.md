# Jobs, Filas, Eventos, Cache, Integrações Externas E Testes

## Jobs, Filas E Eventos

- Verificar idempotência.
- Verificar timeout, retries e backoff.
- Verificar payloads sensíveis serializados.
- Verificar Jobs disparados antes do commit.
- Verificar necessidade de `ShouldBeUnique`.
- Verificar necessidade de criptografia do payload.
- Verificar tratamento de falhas.
- Verificar chamadas externas repetíveis.
- Verificar Listeners escondendo regra central.
- Verificar Jobs genéricos com responsabilidades excessivas.

## Cache

- Verificar chave, TTL e invalidação.
- Verificar vazamento entre usuários ou tenants.
- Verificar dados sensíveis armazenados.
- Verificar cache indefinido sem estratégia de invalidação.
- Verificar cache usado para esconder consulta inadequada.
- Verificar race conditions em criação ou atualização.
- Verificar compatibilidade com ambiente distribuído.

## Integrações Externas

- Verificar timeout.
- Verificar retry e idempotência.
- Verificar tratamento de falhas e respostas inválidas.
- Verificar chamadas reais em testes.
- Verificar tokens e payloads sensíveis em logs.
- Verificar configuração fora de `config`.
- Verificar uso direto de `env()` fora dos arquivos permitidos.
- Verificar efeitos externos dentro de transações.
- Verificar webhooks sem validação de assinatura.
- Verificar processamento duplicado de webhooks.

## Testes

- Verificar se mudança de comportamento tem cobertura.
- Verificar teste de regressão para bugs.
- Verificar cenários de autenticação e autorização.
- Verificar validação e contratos de resposta.
- Verificar uso de banco isolado.
- Verificar dependência de dados existentes.
- Verificar IDs fixos, tempo real ou aleatoriedade não controlada.
- Verificar mocks excessivamente acoplados.
- Verificar integrações externas não simuladas.
- Verificar assertions frágeis ou insuficientes.
- Verificar testes removidos, ignorados ou enfraquecidos.
- Aplicar também os critérios da skill `laravel-testing`.
