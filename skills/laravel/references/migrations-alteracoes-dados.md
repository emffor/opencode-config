# Migrations, Alterações De Colunas E Transformação De Dados

## Migrations

- Gerar migrations com `php artisan make:migration`.
- Nunca executar `php artisan migrate` automaticamente.
- Seguir o padrão estrutural existente no repositório.
- Respeitar schemas, nomes, tipos, timestamps e convenções do projeto.
- Implementar `down()` quando a reversão for segura e possível.
- Definir foreign keys e comportamento de exclusão explicitamente.
- Adicionar índices somente quando houver justificativa.
- Não misturar alteração estrutural com transformação de dados sem autorização explícita.
- Para transformação de dados, preferir comando ou rotina separada.
- Avaliar locks e tempo de execução em tabelas grandes.
- Não presumir que uma migration é segura para produção.
- Não alterar migrations antigas já executadas, salvo padrão específico e autorização.
- Preferir criar nova migration para alterações posteriores.

## Alterações De Colunas

- Avaliar dados existentes antes de alterar tipo, tamanho ou nulabilidade.
- Não tornar coluna obrigatória sem estratégia para registros existentes.
- Não reduzir tamanho de coluna sem verificar truncamento.
- Não remover coluna sem confirmar dependências.
- Avaliar compatibilidade com versões do banco e bibliotecas necessárias.
- Considerar estratégia em etapas para alterações de alto risco.
- Informar como reverter a mudança.

## Transformação De Dados

- Não realizar transformação de dados silenciosamente dentro de migration.
- Preferir comando Artisan, script controlado ou rotina idempotente.
- Implementar processamento em lotes para grandes volumes.
- Registrar progresso sem expor dados sensíveis.
- Permitir retomada quando a operação puder falhar.
- Validar quantidade de registros antes e depois.
- Criar estratégia de rollback ou compensação.
- Não executar automaticamente.
