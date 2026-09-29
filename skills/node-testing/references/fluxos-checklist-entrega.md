# Fluxos, Checklist E Entrega De Testes

## Fluxo Para Criação E Execução De Testes

1. Inspecionar o package.json e scripts existentes (`npm test`, `pnpm test`, etc.).
2. Confirmar que o ambiente de teste está devidamente isolado do banco de desenvolvimento/produção.
3. Para novas funcionalidades:
   - Escrever testes cobrindo o caminho feliz;
   - Escrever testes cobrindo validações de erro, autenticação e restrições de unicidade.
4. Para correção de bugs:
   - Escrever teste que reproduza a falha informada;
   - Confirmar a reprovação do teste antes do fix;
   - Aplicar a correção no código-fonte;
   - Confirmar a aprovação do teste de regressão.
5. Executar os testes localmente com o comando real e verificar o resultado.

## Checklist Antes De Finalizar

- [ ] Todos os testes criados ou alterados passam na execução local.
- [ ] O banco de dados de testes foi configurado e isolado adequadamente.
- [ ] Mocks externos foram limpos ou restaurados (`vi.restoreAllMocks()` / `jest.restoreAllMocks()`).
- [ ] Timers falsos foram restaurados para timers reais (`useRealTimers()`).
- [ ] Nenhuma asserção foi enfraquecida ou removida apenas para passar no teste.
- [ ] Recursos abertos (conexões, servidores) são fechados no encerramento dos testes.
- [ ] Nenhuma credencial ou secret real foi inserida nos arquivos de teste.
