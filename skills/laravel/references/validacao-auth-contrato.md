# Validação, Autenticação, Autorização E Contrato De Entrada

## Validação

- Usar `FormRequest` quando esse for o padrão do projeto.
- Preservar regras, mensagens e estrutura de erros existentes.
- Consumir dados com `validated()` ou `safe()` quando aplicável.
- Não confiar em campos controlados pelo cliente.
- Validar IDs, enums, datas, arrays, arquivos e campos condicionais.
- Validar regras de negócio e vínculos na camada apropriada.
- Não aceitar campos extras sensíveis por mass assignment.
- Não enfraquecer validações para acomodar payload inválido sem confirmação.
- Preservar compatibilidade com clientes existentes ao tornar campos obrigatórios.

## Autenticação E Autorização

- Identificar o mecanismo existente, como Sanctum, Passport, JWT ou sessão.
- Preservar middleware e guards existentes.
- Autorizar antes de retornar, alterar ou excluir recursos protegidos.
- Usar Policies ou Gates conforme o padrão do projeto.
- Validar pertencimento de registros.
- Não confiar apenas em controles do frontend.
- Não retornar diferença de erro que permita enumerar recursos sensíveis.
- Não registrar tokens, cookies ou headers de autorização.
- Não desativar autenticação ou autorização para facilitar testes.

## Contrato De Entrada

- Preservar nomes, tipos, formatos e obrigatoriedade dos campos.
- Não renomear campos entre `camelCase` e `snake_case` sem confirmação.
- Não alterar formatos de datas, valores monetários, enums ou IDs sem avaliar clientes existentes.
- Não remover campos aceitos sem estratégia de compatibilidade.
- Não aceitar campos internos ou sensíveis enviados pelo cliente.
- Documentar novas entradas quando houver documentação existente.
