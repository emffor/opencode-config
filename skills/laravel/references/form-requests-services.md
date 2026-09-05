# Form Requests, Validação, Services E Actions

## Form Requests E Validação

- Usar `FormRequest` quando esse for o padrão do projeto.
- Validar formato, presença e tipos na camada de entrada.
- Validar regras de negócio e integridade relacional na camada apropriada.
- Preservar mensagens e estruturas de erro existentes.
- Não confiar em IDs, permissões ou campos enviados pelo cliente.
- Preferir regras nativas, `Rule` e enums antes de criar validações customizadas.
- Não alterar validações existentes sem analisar compatibilidade.
- Usar `validated()` ou `safe()` em vez de consumir indiscriminadamente todos os campos da request.
- Não duplicar validações já executadas em outra camada sem necessidade.

## Services E Actions

- Utilizar a camada de negócio adotada pelo projeto.
- Concentrar regras de negócio e orquestração do caso de uso.
- Não retornar respostas HTTP.
- Não depender diretamente da camada HTTP sem necessidade.
- Validar vínculos, pertencimento e integridade relacional.
- Lançar exceções apropriadas quando a operação não puder continuar.
- Dividir métodos apenas quando a separação melhorar leitura, teste ou reutilização.
- Evitar services genéricos com responsabilidades excessivas.
- Evitar métodos auxiliares que apenas renomeiem operações simples.
- Quando uma escrita autorizada envolver múltiplas alterações dependentes, avaliar `DB::transaction(...)`.
