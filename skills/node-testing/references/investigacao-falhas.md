# Investigação De Falhas E Testes Flaky

## Causas Comuns De Falhas Em Testes Node.js

- **Open Handles E Timers Pendentes**:
  - Mensagem `Jest did not exit one second after the test run has completed`: indica conexões de banco não fechadas, `setInterval` ativo ou sockets abertos.
  - Usar `--detectOpenHandles` no Jest para localizar a linha exata do recurso não fechado.
- **Unhandled Promise Rejections**:
  - Promessas disparadas sem `await` ou sem bloco `.catch()` em callbacks de teste.
  - Adicionar listener de diagnóstico quando necessário (`process.on('unhandledRejection', ...)`).
- **Testes Flaky (Intermitentes)**:
  - Dependência de ordem de execução dos testes: estado vazando de um teste anterior devido a falta de limpeza no `beforeEach` / `afterEach`.
  - Concorrência de banco: dois testes tentando inserir registros com a mesma chave única em paralelo.
  - Dependência de fuso horário ou relógio do sistema: datas instanciadas com `new Date()` sem fake timers.
  - Race conditions no código assíncrono: asserções executadas antes da conclusão de eventos em background.

## Diagnóstico Passo A Passo

1. Executar o teste que falhou de forma isolada com `--bail` ou modo verboso.
2. Inspecionar o diff exato retornado pelo `expect`.
3. Verificar se a falha é reproduzível com semente aleatória fixa se o runner usar randomização.
4. Conferir logs de banco ou de aplicação para identificar erros 500 silenciosos que geraram asserções com status incorreto.
5. Não resolver falhas aumentando timeouts indiscriminadamente (`testTimeout: 60000`) sem investigar a causa do atraso.
