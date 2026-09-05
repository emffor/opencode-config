# Fluxos, Checklist E Entrega

## Fluxo Para Criar Teste

1. Identificar o comportamento esperado.
2. Localizar teste semelhante.
3. Definir o tipo adequado de teste.
4. Preparar somente os dados necessários.
5. Executar a ação.
6. Verificar resposta, estado ou efeito observável.
7. Cobrir falhas, validação ou autorização relevantes.
8. Confirmar isolamento do banco e dos serviços utilizados.
9. Executar o teste específico.
10. Revisar legibilidade, determinismo e independência.

## Fluxo Para Corrigir Bug

1. Reproduzir o bug.
2. Criar teste que falhe pelo motivo correto.
3. Confirmar que a falha representa o problema real.
4. Corrigir a causa-raiz.
5. Confirmar que o teste passa.
6. Executar testes relacionados.
7. Verificar que o contrato existente foi preservado.
8. Informar cenários não testados.

## Fluxo Para Testar Endpoint

1. Identificar rota, método HTTP e contrato.
2. Preparar autenticação e autorização.
3. Criar somente os dados necessários.
4. Executar a requisição.
5. Verificar status HTTP.
6. Verificar estrutura e tipos da resposta.
7. Verificar persistência ou efeitos colaterais.
8. Verificar acesso indevido e pertencimento.
9. Verificar validação relevante.
10. Confirmar isolamento antes da execução.

## Fluxo Para Executar Suíte

1. Verificar a branch atual.
2. Verificar o ambiente efetivo.
3. Inspecionar configurações da suíte.
4. Confirmar banco exclusivo e isolado.
5. Confirmar isolamento de cache, filas, storage e integrações.
6. Executar primeiro teste ou arquivo específico.
7. Executar grupo relacionado.
8. Executar suíte completa somente quando necessário.
9. Registrar comandos e resultados.
10. Informar testes não executados ou falhas não relacionadas.

## Checklist

- `AGENTS.md` lido.
- Versões das ferramentas identificadas.
- Branch atual verificada.
- Ambiente efetivo identificado.
- Banco exclusivo para testes confirmado.
- Nenhuma credencial ou conexão de produção identificada.
- Estratégia de limpeza compreendida.
- Teste segue o padrão do projeto.
- Cenário é determinístico e independente.
- Factory, state ou helper existente foi reutilizado.
- Autorização testada quando aplicável.
- Integrações externas foram simuladas.
- Tempo e aleatoriedade foram controlados quando necessário.
- Teste de regressão foi criado para bug quando possível.
- Teste específico foi executado antes da suíte completa.
- Nenhum teste foi removido, ignorado ou enfraquecido.
- Nenhum resultado não executado foi declarado como validado.

## Entrega

Ao concluir uma tarefa de testes, informar:

- testes criados ou alterados;
- comportamentos cobertos;
- ambiente utilizado;
- banco e estratégia de isolamento;
- comandos executados;
- resultados obtidos;
- testes não executados;
- falhas não relacionadas;
- riscos ou limitações;
- mensagem de commit sugerida em pt-BR, curta e imperativa.
