# Ambiente De Testes, Traits, Execução Segura E Comandos

## Ambiente De Testes

Preferir, nesta ordem: banco exclusivo para testes; container isolado; SQLite em memória, quando compatível com o banco real.

- Não usar SQLite em memória quando diferenças de driver puderem invalidar o comportamento.
- Considerar diferenças específicas de PostgreSQL, MySQL, MariaDB e SQL Server.
- Não trocar o driver apenas para fazer os testes passarem.
- Não alterar configurações de banco sem confirmação explícita.
- Não criar automaticamente banco, schema ou usuário sem autorização.
- Confirmar isolamento de Redis, filas, cache, storage e serviços externos quando utilizados.

## Traits E Limpeza De Banco

- Identificar quais traits de banco são utilizadas.
- Entender o comportamento de `RefreshDatabase`, `DatabaseTransactions`, `DatabaseMigrations` e `DatabaseTruncation`.
- Não assumir que transações tornam qualquer teste seguro.
- Considerar múltiplas conexões de banco.
- Considerar Jobs ou processos separados que não compartilhem a mesma transação.
- Não misturar estratégias de limpeza sem compreender o efeito.
- Verificar se o trait executa migrations ou truncates implicitamente.
- Não adicionar traits destrutivas sem validar o ambiente.

## Execução Segura

- Executar primeiro o menor escopo possível.
- Preferir `php artisan test --filter=NomeDoTeste`.
- Preferir `vendor/bin/phpunit --filter NomeDoTeste` em projetos PHPUnit.
- Preferir `vendor/bin/pest --filter NomeDoTeste` em projetos Pest.
- Executar um arquivo específico antes da suíte completa.
- Executar testes relacionados antes de executar todos os testes.
- Executar a suíte completa somente quando necessário.
- Confirmar novamente o ambiente antes de comandos de escopo amplo.
- Não executar testes em paralelo sem confirmar isolamento entre processos.
- Não habilitar paralelismo quando os testes compartilharem banco, filesystem, cache ou serviços.

## Comandos De Validação

Comandos possíveis, quando configurados e seguros: `php artisan test`; `php artisan test --filter=...`; `vendor/bin/phpunit`; `vendor/bin/phpunit --filter ...`; `vendor/bin/pest`; `vendor/bin/pest --filter ...`; `vendor/bin/pint --test`; `vendor/bin/phpstan analyse`; `vendor/bin/psalm`; `composer validate`.

Lint, análise estática e `composer validate` não substituem testes de comportamento.

Não executar comandos de teste com banco até confirmar o isolamento.
