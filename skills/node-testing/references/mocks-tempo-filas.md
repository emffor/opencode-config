# Mocks, Manipulação De Tempo E Filas

## Mocks E Test Doubles

- Usar `vi.fn()` / `jest.fn()` para mockar funções e interfaces específicas.
- Preferir injeção de dependência explícita a mocks de módulos globais (`vi.mock('module')` / `jest.mock('module')`) quando possível.
- Quando mockar módulos externos (ex: AWS S3, Stripe, Twilio), garantir que o retorno mockado simule fielmente a resposta da API real.
- Sempre restaurar implementações originais ao final de cada teste (`vi.restoreAllMocks()` / `jest.restoreAllMocks()`).

## Manipulação De Tempo (Fake Timers)

- Usar timers falsos (`vi.useFakeTimers()` / `jest.useFakeTimers()`) para testar comportamentos baseados em tempo (expiração de tokens, TTL de cache, retries, cron jobs):
  ```typescript
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-01-01T10:00:00Z'));
  // executar lógica dependente de data
  vi.advanceTimersByTime(1000 * 60 * 60); // avançar 1 hora
  vi.useRealTimers();
  ```
- Sempre retornar para timers reais (`useRealTimers()`) no `afterEach` para não travar o runner ou I/O assíncrono subsequente.

## Testes De Filas E Workers

- Mockar filas de processamento (BullMQ, Bull, pg-boss) em testes de unidade e integração rápida, verificando se o job foi adicionado com o nome e payload corretos (`expect(queue.add).toHaveBeenCalledWith('process-order', { orderId })`).
- Em testes dedicados de workers, instanciar a função processadora diretamente passando um objeto de Job fake, verificando o efeito colateral e o tratamento de erros sem precisar de conexão real com broker/Redis.
