# Banco De Dados/Locks, Configuração Laravel, Ferramentas E Profiling

## Banco De Dados E Locks

- Manter transações curtas; evitar chamadas externas dentro de transações.
- Evitar processamento demorado enquanto locks estiverem ativos.
- Avaliar deadlocks e ordem de locks; avaliar `lockForUpdate()` somente quando necessário.
- Não usar locks amplos sem justificativa; considerar isolamento da transação.
- Avaliar impacto de concorrência; não aumentar paralelismo sem considerar capacidade do banco.
- Aplicar também os critérios da skill `laravel-database`.

## Configuração Laravel

Quando seguro e aplicável, avaliar: `php artisan config:cache`; `php artisan route:cache`; `php artisan view:cache`; otimização do autoload do Composer; OPcache; cache de eventos quando compatível; workers persistentes.

Não executar comandos de deploy ou alteração de ambiente sem autorização.

Não usar caches de configuração durante desenvolvimento quando isso dificultar diagnóstico.

## Ferramentas De Diagnóstico

Quando disponíveis, considerar: Laravel Telescope; Laravel Debugbar; Clockwork; Laravel Pulse; Horizon; Blackfire; Xdebug profiler; Tideways; `EXPLAIN`; `EXPLAIN ANALYZE`; slow query log; métricas de APM; logs estruturados; métricas de infraestrutura.

Não adicionar ferramentas ou dependências sem confirmação explícita.

Não ativar ferramentas pesadas em produção sem avaliar impacto e segurança.

## Profiling

- Medir o fluxo completo antes de otimizar uma função isolada.
- Separar tempo de aplicação, banco, cache, fila e serviços externos.
- Repetir medições para reduzir ruído; usar dados representativos.
- Evitar benchmark com volume irreal.
- Comparar antes e depois no mesmo ambiente.
- Não declarar ganho sem evidência; documentar limitações da medição.
