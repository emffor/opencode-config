# Índices E Integridade Referencial

## Índices

- Criar índices somente para colunas frequentemente utilizadas em:
  - Cláusulas `WHERE` com alta seletividade;
  - Junções (`JOIN`);
  - Cláusulas `ORDER BY` em paginações volumosas;
  - Restrições de unicidade (`UNIQUE`).
- Projetar índices compostos respeitando a regra do prefixo mais à esquerda (leftmost prefix rule), posicionando colunas de igualdade antes de colunas de intervalo.
- Evitar sobreindexação: cada índice adiciona sobrecarga de escrita em operações de `INSERT`, `UPDATE` e `DELETE`.
- Avaliar índices parciais (Filtered Indexes / Partial Indexes com cláusula `WHERE`) quando a consulta filtrar apenas um subconjunto específico dos dados (ex: `WHERE status = 'ACTIVE'`).

## Integridade Referencial E Constraints

- Delegar a garantia de integridade relacional ao banco de dados através de Foreign Keys, Unique Constraints e Check Constraints, em vez de depender exclusivamente de validação na camada de aplicação.
- Definir nomes explícitos e padronizados para constraints e índices nas migrations para facilitar manutenção e futuras alterações.
- Não desativar checagens de chaves estrangeiras para contornar erros de inserção ou deleção sem autorização e justificativa explícita.
