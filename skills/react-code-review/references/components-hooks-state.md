# Components, Hooks E State

## Components

- Verificar responsabilidades excessivas.
- Verificar lógica de negócio misturada com UI.
- Verificar props incompatíveis.
- Verificar defaults alterando comportamento existente.
- Verificar renderizações condicionais incorretas.
- Verificar `key` instável ou não única.
- Verificar componentes controlled e uncontrolled.
- Verificar duplicação relevante de comportamento.
- Verificar componentes com efeitos colaterais durante render.

## Hooks

- Verificar Hooks chamados condicionalmente.
- Verificar Hooks chamados fora do nível superior.
- Verificar dependências incorretas.
- Verificar stale closures.
- Verificar custom Hooks com responsabilidades excessivas.
- Verificar retorno inconsistente.
- Verificar callbacks capturando valores obsoletos.

## State

- Verificar estado derivado duplicado.
- Verificar mutação direta.
- Verificar atualização dependente do valor anterior.
- Verificar sincronização incorreta entre estados.
- Verificar estado inicial incompatível.
- Verificar estado global sem necessidade.
- Verificar dados duplicados em múltiplas fontes.
