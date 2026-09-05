# Fluxos, Checklist E Entrega

## Fluxo Para Investigar Gargalo

1. Definir o comportamento lento.
2. Reproduzir em ambiente seguro.
3. Coletar métricas.
4. Separar aplicação, banco, cache e integrações.
5. Identificar o maior custo.
6. Formular hipótese.
7. Aplicar a menor otimização segura.
8. Medir novamente.
9. Verificar regressões.
10. Documentar ganho, custo e limitações.

## Fluxo Para Otimizar Query

1. Identificar a query real.
2. Medir frequência e tempo.
3. Verificar volume e cardinalidade.
4. Inspecionar plano de execução quando necessário.
5. Verificar filtros, joins e ordenações.
6. Verificar índices.
7. Reduzir colunas e dados carregados.
8. Eliminar queries duplicadas ou N+1.
9. Medir novamente.
10. Preservar comportamento e contrato.

## Fluxo Para Adicionar Cache

1. Confirmar gargalo real.
2. Identificar dado e escopo.
3. Definir chave.
4. Definir TTL.
5. Definir estratégia de invalidação.
6. Avaliar concorrência e stampede.
7. Avaliar sensibilidade dos dados.
8. Implementar a menor solução.
9. Testar hit, miss e invalidação.
10. Medir ganho e custo.

## Fluxo Para Otimizar Job

1. Medir tempo e consumo de memória.
2. Identificar etapa mais cara.
3. Avaliar volume e concorrência.
4. Reduzir payload.
5. Processar em lotes quando necessário.
6. Garantir idempotência.
7. Ajustar timeout e retries com base em evidência.
8. Verificar impacto em banco e serviços externos.
9. Medir throughput e falhas.
10. Documentar limitações.

## Checklist

- Gargalo real identificado.
- Métricas coletadas.
- Baseline registrada.
- N+1 verificado.
- Queries duplicadas verificadas.
- Colunas selecionadas avaliadas.
- Paginação avaliada.
- Processamento em lote avaliado.
- Índices avaliados.
- Cache avaliado com invalidação.
- Redis avaliado quando aplicável.
- Filas e Jobs avaliados.
- Memória avaliada.
- Integrações externas avaliadas.
- Locks e transações avaliados.
- Contratos preservados.
- Testes e regressões verificados.
- Métricas posteriores coletadas.
- Ganhos e limitações documentados.

## Entrega

Ao concluir uma análise ou otimização, informar:

- gargalo identificado;
- evidências e métricas;
- alterações realizadas;
- impacto esperado;
- métricas antes e depois, quando disponíveis;
- riscos e trade-offs;
- contratos preservados;
- o que foi validado;
- o que não foi validado;
- limitações da análise;
- mensagem de commit sugerida em pt-BR, curta e imperativa.
