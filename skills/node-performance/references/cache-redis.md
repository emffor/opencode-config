# Cache E Redis Na Performance

## Estratégias De Cache

- Aplicar cache apenas para dados com alta frequência de leitura e baixa frequência de alteração.
- Utilizar o padrão Cache-Aside (Lazy Loading):
  1. Buscar a chave no Redis;
  2. Se encontrada (cache hit), desserializar e retornar;
  3. Se não encontrada (cache miss), buscar no banco, salvar no Redis com TTL e retornar.
- Definir TTLs finitos e adequados ao dinamismo dos dados (evitar `SET` sem expiração).
- Adicionar variação aleatória de TTL (jitter) para evitar expiração simultânea em massa de múltiplas chaves.

## Prevenção De Stampede E Locks

- Proteger contra Cache Stampede (múltiplas requisições simultâneas em cache miss disparando a mesma query pesada no banco ao mesmo tempo):
  - Utilizar SingleFlight / Mutex em memória ou Redlock distribuído para que apenas uma requisição recalcule o dado enquanto as demais aguardam.
- Monitorar a latência de comandos do Redis (`redis-cli --latency`).
- Não salvar objetos excessivamente grandes no Redis que possam consumir muita largura de banda de rede e tempo de serialização/desserialização JSON no Node.js.
