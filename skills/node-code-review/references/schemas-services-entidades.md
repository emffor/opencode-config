# Schemas, Services E Entidades Na Revisão

## Revisão De Schemas E Validações

- Conferir se os schemas de validação rejeitam propriedades desconhecidas e se campos opcionais foram tipados corretamente.
- Verificar se as mensagens de validação não expõem detalhes de banco ou infraestrutura interna.
- Conferir se valores numéricos, datas e strings possuem validações de limites (min/max, regex, formato de e-mail/UUID).

## Revisão De Services E Use Cases

- Verificar se a regra de negócio central atende rigorosamente aos requisitos sem introduzir cenários de exceção não tratados.
- Conferir se o serviço é idempotente quando exigido pela operação.
- Verificar se o serviço não está fortemente acoplado com o framework web (não deve depender de objetos `Request` ou `Response`).
- Conferir se erros de domínio lançados possuem tipos ou classes claras e diferenciáveis.

## Revisão De Entidades E Mapeamento

- Verificar se decorators de ORM (TypeORM, Prisma) estão configurados corretamente com nomes de colunas, tipos e restrições.
- Garantir que dados sensíveis (hashes de senhas, chaves) não sejam retornados por padrão na serialização da entidade.
- Verificar se relacionamentos estão configurados com integridade referencial adequada (`onDelete`).
