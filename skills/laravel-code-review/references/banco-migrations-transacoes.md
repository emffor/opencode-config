# Banco De Dados, Migrations, Transações, Concorrência E Idempotência

## Banco De Dados

- Verificar operações de escrita sem proteção.
- Verificar `update()` ou `delete()` sem filtro adequado.
- Verificar alterações em massa.
- Verificar ausência de transação em múltiplas escritas dependentes.
- Verificar integridade referencial.
- Verificar foreign keys e comportamento de exclusão.
- Verificar nullable e defaults incompatíveis com o domínio.
- Verificar unique constraints ausentes quando necessárias.
- Verificar risco de duplicidade por concorrência.
- Verificar impacto em grandes volumes.
- Verificar alterações destrutivas ou irreversíveis.
- Aplicar também os critérios da skill `laravel-database` quando houver mudanças de banco.

## Migrations

- Verificar se segue o padrão do projeto.
- Verificar schema, tipos, timestamps e nomes.
- Verificar `down()` e reversibilidade.
- Verificar remoção ou alteração de colunas com dados existentes.
- Verificar redução de tamanho ou mudança de tipo.
- Verificar criação de coluna obrigatória sem estratégia para registros existentes.
- Verificar foreign keys e índices.
- Verificar locks e impacto em produção.
- Verificar transformação de dados dentro da migration.
- Verificar alteração de migration antiga já executada.
- Verificar se a migration foi apenas gerada e não executada automaticamente.

## Transações, Concorrência E Idempotência

- Verificar múltiplas escritas sem atomicidade.
- Verificar transações longas.
- Verificar chamadas HTTP ou efeitos externos dentro da transação.
- Verificar deadlocks e ordem de locks.
- Verificar uso inadequado de `lockForUpdate()`.
- Verificar race conditions.
- Verificar duplicidade em Jobs, comandos, webhooks e endpoints.
- Verificar constraints como proteção final.
- Verificar retries que possam repetir efeitos.
- Verificar efeitos externos antes do commit.
