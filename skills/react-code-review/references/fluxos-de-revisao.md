# Fluxos De Revisão E Formato De Saída

## Revisão De PR

1. Ler descrição e objetivo do PR.
2. Identificar arquivos e contratos afetados.
3. Inspecionar o diff completo.
4. Ler componentes e hooks relacionados.
5. Verificar state e effects.
6. Verificar comportamento assíncrono.
7. Verificar segurança e permissões.
8. Verificar contratos de API.
9. Verificar performance.
10. Verificar testes.
11. Verificar acessibilidade quando relevante.
12. Separar bloqueantes de sugestões.
13. Resumir risco geral.

## Revisão De Bugfix

1. Confirmar cenário original.
2. Confirmar causa-raiz.
3. Verificar se o fix resolve a causa-raiz.
4. Verificar regressões.
5. Confirmar teste de regressão.
6. Verificar state e effects relacionados.
7. Verificar concorrência e async.
8. Confirmar que o teste falharia antes do fix.

## Gravidade

- CRÍTICO: vulnerabilidade grave, perda de dados ou fluxo inutilizável.
- ALTO: bug funcional relevante ou regressão provável.
- MÉDIO: problema real em cenário específico.
- BAIXO: impacto limitado, mas tecnicamente válido.
- SUGESTÃO: melhoria não bloqueante.

Não elevar gravidade sem impacto compatível.

## Saída Da Revisão

Apresentar primeiro os achados, ordenados por gravidade.

Formato:

[ALTO] Resposta antiga pode sobrescrever busca atual

Arquivo: src/hooks/useSearch.ts:42

Comportamento atual:
Uma requisição anterior permanece ativa após uma nova busca.

Impacto:
Uma resposta antiga pode substituir os dados mais recentes.

Cenário:
O usuário realiza duas buscas rapidamente e a primeira
requisição termina por último.

Correção sugerida:
Cancelar a requisição anterior com AbortController
ou ignorar respostas obsoletas.

Se não houver achados relevantes, informar objetivamente.
