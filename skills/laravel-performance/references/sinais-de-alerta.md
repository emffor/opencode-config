# Sinais De Alerta

Analisar com atenção:

- `Model::all()`;
- `get()` sem limite em tabela grande;
- queries em loops;
- múltiplos acessos ao mesmo relacionamento;
- `count()` após `get()`;
- filtros em Collection após carregar todos os dados;
- `SELECT *`;
- paginação em memória;
- Jobs com payloads grandes;
- chamadas HTTP em loops;
- transações longas;
- cache sem invalidação;
- `Cache::rememberForever()` sem estratégia;
- `KEYS *` no Redis;
- eager loading excessivo;
- serialização de relações não utilizadas;
- loops que fazem writes individuais quando batch seria possível.

Um sinal de alerta não é automaticamente um gargalo. Confirmar frequência, volume e impacto.
