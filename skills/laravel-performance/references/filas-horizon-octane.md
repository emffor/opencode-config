# Filas, Jobs, Horizon E Octane

## Filas E Jobs

- Usar filas para tarefas demoradas, externas ou assíncronas.
- Não mover trabalho para fila apenas para esconder lentidão sem analisar causa.
- Tornar Jobs idempotentes; definir timeout, retries, backoff e tratamento de falhas.
- Evitar Jobs excessivamente grandes; dividir trabalho em lotes quando necessário.
- Não serializar Models ou payloads maiores que o necessário.
- Avaliar `ShouldBeUnique` quando duplicidade for um risco.
- Avaliar `ShouldBeEncrypted` para payloads sensíveis.
- Disparar Jobs após commit quando dependerem de dados persistidos.
- Não manter transações abertas enquanto Jobs são preparados ou enviados.
- Avaliar throughput e concorrência dos workers; verificar gargalos em filas específicas.

## Horizon

Quando o projeto utilizar Horizon:

- Verificar tempo de espera por fila, throughput e quantidade de workers.
- Verificar balanceamento; verificar Jobs com alta taxa de falha e retries excessivos.
- Verificar filas bloqueadas por Jobs longos.
- Separar workloads com perfis diferentes quando necessário.
- Não aumentar workers sem avaliar banco, Redis e serviços externos.
- Considerar limites de memória e reinício de workers.

## Octane

Quando o projeto utilizar Octane:

- Confirmar compatibilidade de dependências.
- Evitar estado mutável compartilhado entre requisições.
- Não assumir reinicialização completa a cada request.
- Evitar singletons com estado específico de usuário ou requisição; limpar estado estático quando necessário.
- Avaliar memory leaks; verificar listeners e services que preservem estado indevidamente.
- Não introduzir Octane apenas como solução automática para gargalos de banco ou arquitetura.
- Medir ganho real antes de adotar.
