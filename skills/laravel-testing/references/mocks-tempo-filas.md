# Mocks, Fakes, Spies, Tempo, Aleatoriedade, Filas E Eventos

## Mocks, Fakes E Spies

- Usar fakes oficiais do Laravel quando disponíveis.
- Avaliar `Http::fake()`, `Queue::fake()`, `Bus::fake()`, `Event::fake()`, `Notification::fake()`, `Mail::fake()` e `Storage::fake()`.
- Mockar limites externos, não toda a aplicação.
- Não mockar Eloquent indiscriminadamente.
- Evitar mocks excessivamente acoplados à implementação.
- Verificar efeitos relevantes, não apenas chamadas internas.
- Não permitir chamadas reais a serviços externos.
- Não enviar e-mails, notificações ou mensagens reais.
- Não acessar armazenamento externo real.
- Restaurar configurações globais alteradas pelo teste.

## Tempo E Aleatoriedade

- Fixar o tempo com `Carbon::setTestNow()` ou recurso equivalente quando necessário.
- Restaurar o tempo após o teste.
- Evitar dependência do horário, timezone ou data real.
- Controlar UUIDs, tokens e valores aleatórios quando afetarem assertions.
- Não usar esperas reais como `sleep()` para sincronização.
- Preferir mecanismos determinísticos para filas, eventos e processos assíncronos.

## Filas, Jobs E Eventos

- Testar dispatch de Jobs quando esse for o comportamento esperado.
- Testar o Job diretamente quando sua lógica precisar ser validada.
- Verificar idempotência quando houver retries.
- Verificar timeout, backoff e tratamento de falha quando relevantes.
- Usar fakes para filas, eventos e integrações.
- Não executar workers reais durante testes comuns.
- Não publicar eventos em infraestrutura externa.
- Considerar o comportamento após commit quando o fluxo depender de transação.
- Verificar duplicidade quando o Job puder ser executado novamente.
