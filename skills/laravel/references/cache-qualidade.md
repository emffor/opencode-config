# Cache E Qualidade

## Cache

- Não adicionar cache antes de identificar um gargalo real.
- Definir chave, escopo, TTL e estratégia de invalidação.
- Considerar isolamento por usuário, tenant ou contexto.
- Não armazenar dados sensíveis sem necessidade.
- Evitar cache indefinido sem invalidação.
- Avaliar locks distribuídos quando houver concorrência.
- Não usar cache para mascarar consultas ou arquitetura inadequadas.

## Qualidade

- Verificar risco de N+1.
- Verificar consultas repetidas ou desnecessárias.
- Verificar paginação em listagens potencialmente grandes.
- Verificar uso adequado de índices.
- Evitar `SELECT *` em consultas críticas ou de grande volume.
- Não otimizar prematuramente sem evidência.
- Preferir clareza quando a diferença de performance for irrelevante.
- Remover logs temporários, código morto e alterações acidentais antes de finalizar.
- Não alterar formatação de arquivos não relacionados à tarefa.
