# Cache E Redis

## Cache

- Adicionar cache somente quando houver benefício comprovado.
- Definir chave, escopo, TTL e estratégia de invalidação.
- Não usar cache para esconder query ruim ou arquitetura inadequada.
- Evitar cache infinito sem invalidação; evitar cache de dados altamente voláteis sem estratégia clara.
- Considerar isolamento por usuário, tenant, locale e permissões.
- Não armazenar dados sensíveis sem necessidade; avaliar tamanho do payload.
- Evitar stampede com locks ou estratégia equivalente quando necessário.
- Verificar consistência entre cache e banco; medir hit rate quando possível.
- Não criar múltiplas camadas de cache sem necessidade.

## Redis

- Padronizar nomes de chaves; definir expiração quando aplicável.
- Evitar payloads grandes; evitar chaves genéricas que colidam entre contextos.
- Considerar namespace por ambiente, tenant ou aplicação.
- Avaliar estruturas adequadas, como string, hash, set ou sorted set.
- Não usar Redis como banco principal sem decisão arquitetural explícita.
- Avaliar memória e política de eviction; evitar comandos bloqueantes em grandes conjuntos.
- Não executar operações globais como `KEYS *` em produção.
