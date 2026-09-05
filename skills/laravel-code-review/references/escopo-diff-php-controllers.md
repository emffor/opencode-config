# Escopo, Diff, PHP E Controllers

## Escopo E Diff

- Confirmar quais arquivos foram alterados.
- Identificar mudanças fora do escopo declarado.
- Verificar alterações acidentais de formatação.
- Verificar arquivos gerados, dumps, logs ou segredos incluídos.
- Procurar código comentado, debug e `dd()`, `dump()`, `ray()` ou logs temporários.
- Verificar remoções de validação, autorização, testes ou tratamento de erro.
- Verificar mudanças em dependências e configuração.
- Não revisar apenas linhas adicionadas quando o contexto adjacente alterar o comportamento.

## PHP

- Verificar compatibilidade com a versão configurada.
- Verificar tipos de parâmetros e retornos.
- Verificar nullable types e valores possíveis.
- Verificar uso incorreto de enums, readonly e property promotion.
- Verificar exceções ignoradas ou capturadas indevidamente.
- Identificar métodos longos e responsabilidades misturadas quando isso aumentar risco.
- Verificar comparações frouxas ou coerções inesperadas.
- Verificar acesso a índices ou propriedades potencialmente inexistentes.
- Verificar uso de recursos de versão superior à suportada.
- Não exigir tipagem adicional quando ela contrariar o padrão existente sem benefício claro.

## Controllers

- Verificar se o Controller concentra regra de negócio.
- Verificar consultas complexas na camada HTTP.
- Verificar ausência de validação ou autorização.
- Verificar acesso direto a Models quando o projeto adota camada específica.
- Verificar respostas inconsistentes.
- Verificar exposição de exceções, SQL ou stack traces.
- Verificar múltiplos caminhos de resposta difíceis de manter.
- Verificar parsing manual já atendido por helpers ou Form Requests.
- Verificar mudança de status HTTP ou contrato sem justificativa.
