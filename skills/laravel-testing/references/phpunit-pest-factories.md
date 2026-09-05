# PHPUnit, Pest, Factories E Arrange/Act/Assert

## PHPUnit E Pest

- Utilizar a ferramenta já adotada pelo projeto.
- Preservar convenções, helpers, plugins e estrutura existentes.
- Usar datasets quando reduzirem duplicação sem prejudicar a leitura.
- Preferir assertions específicas a assertions genéricas.
- Manter mensagens de falha claras quando necessário.
- Não usar snapshots para esconder contratos difíceis de compreender.
- Não marcar testes como skipped ou incomplete sem justificativa explícita.
- Não usar grupos para impedir silenciosamente que testes relevantes sejam executados.

## Factories E Dados

- Usar factories existentes; criar states para cenários reutilizáveis.
- Criar somente os dados necessários para o cenário.
- Evitar fixtures globais difíceis de manter.
- Não depender de IDs fixos; não depender de registros previamente existentes.
- Evitar seeds em testes, salvo padrão consolidado e ambiente isolado.
- Não usar dados reais, pessoais ou sensíveis.
- Controlar datas e valores quando afetarem o resultado.
- Não criar grandes volumes de dados sem necessidade.
- Verificar relacionamentos obrigatórios ao utilizar factories.
- Não usar valores aleatórios quando eles tornarem o teste imprevisível.

## Arrange, Act E Assert

- Organizar claramente preparação, execução e verificação.
- Evitar múltiplas ações independentes no mesmo teste.
- Verificar efeitos observáveis e relevantes.
- Não testar somente que o código não lançou exceção.
- Evitar assertions sobre detalhes não relacionados ao comportamento.
- Não repetir excessivamente o comportamento da implementação dentro do teste.
