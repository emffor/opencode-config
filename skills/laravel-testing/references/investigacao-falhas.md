# Investigação De Falhas E Testes Instáveis

## Investigação De Falhas

1. Executar somente o teste que falhou.
2. Ler a mensagem e o stack trace completo.
3. Identificar se a falha vem do código, teste, ambiente ou dados.
4. Confirmar que a falha é reproduzível.
5. Verificar se existe dependência de ordem ou estado residual.
6. Não alterar assertions apenas para aceitar comportamento incorreto.
7. Não adicionar retry para esconder teste instável.
8. Corrigir a causa-raiz.
9. Executar novamente o teste específico.
10. Executar testes relacionados.
11. Informar falhas não relacionadas encontradas.

## Testes Instáveis

- Investigar dependência de tempo, ordem, concorrência, rede ou dados compartilhados.
- Não resolver instabilidade aumentando timeout indiscriminadamente.
- Não adicionar sleeps como correção permanente.
- Controlar aleatoriedade e relógio.
- Isolar recursos compartilhados.
- Não marcar teste instável como ignorado sem explicar a limitação.
- Diferenciar falha intermitente de falha funcional real.
