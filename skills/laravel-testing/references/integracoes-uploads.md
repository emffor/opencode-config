# Integrações Externas, Uploads E Arquivos

## Integrações Externas

- Usar fakes ou mocks para chamadas HTTP.
- Não realizar chamadas reais a APIs externas.
- Testar sucesso, timeout, indisponibilidade e resposta inválida quando relevantes.
- Não registrar ou expor tokens e payloads sensíveis.
- Verificar retry apenas quando a operação for idempotente.
- Não depender de disponibilidade externa para a suíte passar.
- Não utilizar credenciais reais em testes.

## Uploads E Arquivos

- Usar arquivos falsos ou temporários.
- Utilizar `Storage::fake()` quando aplicável.
- Testar tamanho, MIME type, extensão e quantidade de arquivos.
- Não acessar armazenamento de produção.
- Não deixar arquivos temporários após os testes.
- Não usar arquivos reais com dados sensíveis.
- Testar autorização de downloads quando aplicável.
