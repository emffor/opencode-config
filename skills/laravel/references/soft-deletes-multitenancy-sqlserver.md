# Soft Deletes, Multi-Tenancy, Procedures E SQL Server

## Soft Deletes

- Verificar se o Model usa `SoftDeletes`.
- Considerar registros removidos em queries de unicidade e relacionamentos.
- Usar `withTrashed()` ou `onlyTrashed()` somente quando necessário.
- Não usar `forceDelete()` sem confirmação explícita.
- Avaliar restauração de relacionamentos dependentes.
- Não alterar comportamento de exclusão existente sem avaliar impacto.

## Multi-Tenancy E Schemas

- Identificar tenant, conexão e schema antes de consultar ou alterar dados.
- Garantir isolamento entre tenants.
- Não confiar apenas em filtros enviados pelo cliente.
- Preservar scopes globais ou mecanismos existentes.
- Não remover scopes de tenant sem autorização.
- Validar schema correto em migrations e queries.
- Não executar alterações em todos os tenants sem estratégia explícita.

## Procedures, Triggers E Functions

- Identificar triggers, procedures e functions relacionadas antes de alterar tabelas.
- Não assumir que uma escrita afeta somente a tabela diretamente acessada.
- Não executar `EXEC` ou procedures com efeito colateral durante investigação.
- Documentar efeitos indiretos relevantes.
- Não criar ou alterar objetos do banco sem confirmação explícita.
- Avaliar portabilidade e manutenção antes de adicionar lógica ao banco.

## SQL Server

Quando o projeto utilizar SQL Server:

- Respeitar schemas configurados no projeto.
- Avaliar diferenças em paginação, tipos, índices e funções.
- Não assumir comportamento de MySQL ou PostgreSQL.
- Considerar impacto de locks e escalonamento.
- Verificar tipos como `datetime2`, `datetimeoffset`, `uniqueidentifier`, `nvarchar` e `bit`.
- Avaliar índices clustered e nonclustered.
- Não usar SQLite como substituto de teste quando a query depender de recursos específicos do SQL Server.
- Verificar compatibilidade de migrations com o driver utilizado.
