# Fluxos E Checklist De Banco De Dados

## Fluxo Para Alterações Em Banco De Dados

1. Identificar driver, versão do SGBD, schema e ambiente ativo.
2. Inspecionar entidades e migrations já existentes no repositório.
3. Avaliar impacto estrutural, volumetria e presença de dados em produção.
4. Elaborar migration com métodos `up` e `down` reversíveis e determinísticos.
5. Em alterações destrutivas ou de alto risco, apresentar plano de migração em fases (expand and contract).
6. Não executar comandos de escrita ou migrations automaticamente sem autorização explícita.
7. Testar migrations localmente em banco de testes limpo.
8. Validar consultas geradas com parâmetros preparados e planos de execução (`EXPLAIN`).

## Checklist Antes De Finalizar

- [ ] A migration possui método de reversão (`down`) testado.
- [ ] Colunas adicionadas possuem valor default ou são nuláveis para não quebrar dados legados.
- [ ] Chaves estrangeiras e índices necessários foram devidamente criados.
- [ ] As entidades TypeScript refletem exatamente os tipos e nulabilidades do schema.
- [ ] Não há consultas interpolando variáveis diretamente em SQL.
- [ ] Transações são liberadas em blocos `finally` ou tratadas pelo gerenciador de transações do ORM.
- [ ] Nenhuma chamada externa assíncrona ou demorada ocorre dentro de transações de banco.
