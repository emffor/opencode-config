# Transações, Concorrência E Idempotência

## Transações

- Quando uma escrita autorizada envolver múltiplas operações dependentes, avaliar `DB::transaction(...)`.
- Não abrir transação para uma única operação atômica sem necessidade.
- Manter transações curtas.
- Evitar chamadas HTTP, filas, e-mails ou operações externas dentro da transação.
- Evitar processamento demorado enquanto locks estiverem ativos.
- Não executar efeitos externos irreversíveis antes do commit.
- Considerar deadlocks, retries e idempotência.
- Não assumir que uma transação protege operações realizadas em conexões diferentes.

## Concorrência E Idempotência

- Avaliar condições de corrida em operações críticas.
- Não confiar apenas em uma consulta prévia para impedir duplicidade.
- Usar constraints, locks ou operações atômicas quando necessário.
- Considerar `lockForUpdate()` somente dentro de transação e quando houver justificativa.
- Evitar locks amplos ou demorados.
- Tornar comandos, Jobs e integrações idempotentes quando puderem ser repetidos.
- Tratar conflitos de concorrência de forma previsível.
- Avaliar retries sem duplicar efeitos.
