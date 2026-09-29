# Banco, Migrations E Transações Na Revisão

## Revisão De Migrations

- Verificar se a migration possui método de reversão (`down`) funcional e determinístico.
- Conferir se novas colunas `NOT NULL` possuem valores `DEFAULT` para não quebrar linhas existentes.
- Verificar se foram criados índices para novas Foreign Keys ou colunas de busca frequente.
- Avaliar risco de lock exclusivo em tabelas grandes em produção (avaliar uso de `CONCURRENTLY` no PostgreSQL).
- Garantir que a migration não execute scripts destrutivos (`DROP TABLE`, `DROP COLUMN`) sem validação prévia de compatibilidade retroativa.

## Revisão De Transações E Concorrência

- Verificar se múltiplas operações de escrita dependentes estão envelopadas em transação atômica.
- Conferir se conexões ou instâncias de `QueryRunner` são liberadas com segurança em bloco `finally`.
- Garantir que não há chamadas assíncronas externas (APIs, envios de email, filas) bloqueando transações de banco abertas.
- Avaliar potenciais condições de corrida (Race Conditions) em atualizações de saldo, estoque ou status, checando a presença de locks pessimistas ou otimistas.
