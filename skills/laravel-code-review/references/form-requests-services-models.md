# Form Requests, Validação, Services, Actions, Models E Eloquent

## Form Requests E Validação

- Verificar campos obrigatórios, opcionais e condicionais.
- Verificar uso de `validated()` ou `safe()`.
- Verificar consumo de campos não validados.
- Verificar mass assignment com payload bruto.
- Verificar mensagens e estrutura de erro.
- Verificar regras de pertencimento e integridade no local adequado.
- Verificar validações que permitam enumeração ou bypass.
- Verificar mudanças que tornem campos obrigatórios e quebrem clientes existentes.
- Verificar validação de arrays, arquivos, datas, IDs e enums.
- Verificar duplicação desnecessária de regras.

## Services E Actions

- Verificar se há regra HTTP dentro da camada de negócio.
- Verificar retorno de response, JSON ou status HTTP.
- Verificar responsabilidades excessivas.
- Verificar transações ausentes em múltiplas escritas dependentes.
- Verificar chamadas externas dentro de transações.
- Verificar exceções engolidas ou relançadas sem contexto.
- Verificar validação de vínculos e pertencimento.
- Verificar idempotência em operações repetíveis.
- Verificar efeitos colaterais ocultos.
- Verificar métodos auxiliares sem ganho real.

## Models E Eloquent

- Verificar risco de mass assignment.
- Revisar `$fillable`, `$guarded`, `$hidden`, `$visible`, `$casts` e `$appends`.
- Verificar relacionamentos incorretos ou incompatíveis com foreign keys.
- Verificar casts ausentes ou incorretos.
- Verificar accessors, mutators e observers com efeitos colaterais.
- Verificar consultas em accessors, mutators ou Resources.
- Verificar scopes globais removidos ou ignorados.
- Verificar comportamento de `SoftDeletes`.
- Verificar lazy loading inesperado.
- Verificar Models completos carregados sem necessidade.
- Verificar uso inadequado de `firstOrCreate()`, `updateOrCreate()` ou `upsert()`.
