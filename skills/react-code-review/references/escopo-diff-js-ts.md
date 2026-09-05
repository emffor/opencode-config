# Escopo, Diff, JavaScript E TypeScript

## Escopo E Diff

- Confirmar quais arquivos foram alterados.
- Identificar mudanças fora do escopo declarado.
- Verificar alterações acidentais de formatação.
- Verificar arquivos gerados, dumps ou segredos.
- Procurar `console.log`, debugger e logs temporários.
- Procurar código comentado ou morto.
- Verificar remoções de validação, autorização ou testes.
- Verificar mudanças em dependências e configuração.
- Não revisar somente linhas adicionadas.
- Inspecionar contexto adjacente quando afetar comportamento.

## JavaScript

- Verificar coerções inesperadas.
- Verificar comparações frouxas quando perigosas.
- Verificar acesso a propriedades potencialmente inexistentes.
- Verificar tratamento incorreto de `null` e `undefined`.
- Verificar mutação acidental de objetos e arrays.
- Verificar Promises não tratadas.
- Verificar exceptions engolidas.

## TypeScript

- Verificar uso indevido de `any`.
- Verificar assertions inseguras com `as`.
- Verificar nullable types.
- Verificar tipos divergentes da API real.
- Verificar unions incompletas.
- Verificar contratos alterados.
- Não exigir tipagem extra sem benefício claro.
