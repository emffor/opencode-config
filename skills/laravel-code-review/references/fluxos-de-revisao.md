# Fluxos De Revisão E Formato De Saída

## Revisão De PR

1. Ler descrição e objetivo do PR.
2. Identificar arquivos e contratos afetados.
3. Inspecionar o diff completo.
4. Ler implementações relacionadas.
5. Verificar testes.
6. Revisar segurança e autorização.
7. Revisar integridade e banco.
8. Revisar concorrência e transações.
9. Revisar performance.
10. Revisar compatibilidade.
11. Separar achados bloqueantes de sugestões.
12. Resumir risco geral.

## Revisão De Bugfix

1. Confirmar o cenário original.
2. Verificar se a correção ataca a causa-raiz.
3. Verificar regressões em fluxos relacionados.
4. Confirmar teste de regressão.
5. Verificar se a correção amplia ou altera contrato.
6. Verificar tratamento de dados antigos.
7. Verificar comportamento em concorrência.
8. Verificar que o teste falharia antes da correção.

## Revisão De Migration

1. Confirmar objetivo da mudança.
2. Verificar padrão do projeto.
3. Avaliar dados existentes.
4. Avaliar locks e tempo de execução.
5. Verificar reversibilidade.
6. Verificar índices e foreign keys.
7. Verificar transformação de dados.
8. Verificar impacto em produção.
9. Confirmar que não houve execução automática.

## Saída Da Revisão

Quando houver achados, apresentar primeiro os problemas, ordenados por gravidade.

Formato recomendado:

[ALTO] Validação de pertencimento ausente

Arquivo: app/Services/PedidoService.php:84

O registro é buscado apenas pelo ID, sem restringir pelo usuário ou tenant.
Um usuário autenticado pode acessar dados pertencentes a outro contexto.

Correção sugerida: incluir o escopo de pertencimento na consulta ou aplicar Policy antes da operação.
