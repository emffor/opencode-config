# Service Container, Dependências, Filas, Jobs E Eventos

## Service Container E Dependências

- Preferir injeção de dependência.
- Evitar chamadas a `app()` ou `resolve()` sem necessidade.
- Usar interfaces quando houver múltiplas implementações ou ganho real de desacoplamento.
- Não criar interfaces automaticamente para toda classe.
- Registrar bindings no local apropriado.
- Evitar Service Providers excessivamente grandes.
- Não adicionar dependências Composer sem confirmação explícita.

## Filas, Jobs E Eventos

- Usar filas quando houver benefício real de processamento assíncrono.
- Tornar Jobs idempotentes quando puderem ser repetidos.
- Definir retries, timeout e tratamento de falhas.
- Não serializar dados sensíveis desnecessariamente.
- Evitar Jobs excessivamente genéricos.
- Avaliar `ShouldBeUnique` quando duplicidade for um risco.
- Avaliar `ShouldBeEncrypted` para payloads sensíveis.
- Disparar Jobs após o commit quando dependerem de dados recém-persistidos.
- Não esconder regra central de negócio em Listeners difíceis de rastrear.
- Usar Events quando houver desacoplamento útil, não apenas para mover código de lugar.
