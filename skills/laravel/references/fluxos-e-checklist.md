# Fluxos, Checklist E Entrega

## Fluxo Para Consulta

1. Confirmar que a solicitação exige somente leitura.
2. Identificar ambiente, conexão, banco e schema.
3. Verificar tamanho e sensibilidade das tabelas.
4. Criar consulta com filtros e limites adequados.
5. Selecionar somente as colunas necessárias.
6. Revisar risco de locks e impacto.
7. Executar apenas se for uma operação de leitura segura.
8. Informar resultados e limitações.

## Fluxo Para Migration

1. Ler o `AGENTS.md`.
2. Localizar migrations semelhantes.
3. Identificar driver, schema e convenções.
4. Avaliar dados e dependências existentes.
5. Avaliar impacto, locks e reversão.
6. Gerar a migration com Artisan.
7. Implementar `up()` e `down()` quando seguro.
8. Não executar a migration.
9. Informar comando de execução apenas como instrução.
10. Informar riscos e estratégia de rollback.

## Fluxo Para Alteração De Dados

1. Identificar exatamente os registros afetados.
2. Criar consulta de leitura equivalente.
3. Informar quantidade estimada de registros.
4. Definir operação, impacto e reversão.
5. Gerar código ou comando.
6. Solicitar confirmação explícita.
7. Executar somente após confirmação e validação do ambiente.
8. Validar o resultado após a execução.
9. Informar registros afetados e limitações.

## Checklist

- `AGENTS.md` lido.
- Driver e versão do banco identificados.
- Ambiente, branch e conexão verificados.
- Operação classificada como leitura ou escrita.
- Nenhuma escrita executada sem confirmação.
- Schema e convenções preservados.
- Risco de N+1 verificado.
- Consultas em loops verificadas.
- Paginação ou processamento em lotes aplicado quando necessário.
- Índices avaliados.
- Integridade e foreign keys avaliadas.
- Concorrência e transações avaliadas.
- Impacto em produção analisado.
- Estratégia de reversão definida.
- Migration gerada, mas não executada.

## Entrega

Ao concluir uma tarefa de banco de dados, informar:

- Models, tabelas, schemas ou migrations afetados.
- Consultas criadas ou alteradas.
- Impacto esperado.
- Risco para os dados.
- Estratégia de reversão.
- O que foi validado.
- O que não foi validado.
- Operações não executadas.
- Mensagem de commit sugerida em pt-BR, curta e imperativa.
