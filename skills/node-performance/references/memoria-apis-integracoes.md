# Memória, APIs E Integrações Na Performance

## Investigação De Vazamentos De Memória (Memory Leaks)

- Sintomas comuns de vazamento de memória: crescimento contínuo do heap ao longo do tempo (visível via `process.memoryUsage().heapUsed`), aumento de latência por excesso de Garbage Collection e reinicializações por OOM (SIGKILL).
- Causas frequentes de memory leak em Node.js:
  - Event listeners registrados em objetos de longa duração sem serem removidos (`emitter.removeListener` ou `AbortSignal`);
  - Variáveis globais ou closures mantendo referências a objetos grandes da requisição;
  - Caches em memória baseados em objetos ou `Map` sem limite de tamanho ou política de despejo (LRU);
  - Timers pendentes (`setInterval`) que nunca são cancelados.
- Capturar e analisar Heap Snapshots (via Chrome DevTools / `node --inspect` ou biblioteca `v8`) comparando dois momentos no tempo para identificar objetos retidos.

## Integrações HTTP E Pool De Conexões

- Configurar keep-alive HTTP nas conexões de saída (via `http.Agent({ keepAlive: true })` ou cliente Undici) para reutilizar conexões TCP existentes e evitar o custo de handshakes TLS repetidos.
- Ajustar limites de conexões simultâneas (`maxSockets`) adequados para serviços externos integrados.
- Configurar timeouts de conexão (`connectionTimeout`) e de resposta (`socketTimeout`) em todas as chamadas HTTP.
