# Índices E Integridade De Dados

## Índices

- Avaliar índices para colunas usadas em `WHERE`, `JOIN`, `ORDER BY` e constraints.
- Não criar índices indiscriminadamente.
- Avaliar seletividade, volume, frequência de leitura e custo de escrita.
- Verificar índices compostos e ordem das colunas.
- Evitar índices duplicados ou redundantes.
- Avaliar impacto em inserts, updates, armazenamento e manutenção.
- Não remover índices sem evidência e confirmação explícita.
- Considerar índices únicos para garantir integridade quando aplicável.

## Integridade De Dados

- Preferir constraints do banco para regras que exigem garantia estrutural.
- Usar foreign keys quando compatíveis com o padrão do projeto.
- Definir comportamento de exclusão explicitamente.
- Usar `cascade`, `restrict`, `set null` ou equivalente com intenção clara.
- Não depender apenas de validações da aplicação.
- Aplicar unique constraints quando duplicidade não puder ocorrer.
- Considerar colunas nullable somente quando o domínio permitir.
- Não alterar tipos de dados sem avaliar dados existentes e compatibilidade.
