# Uploads, Downloads, Integrações E Webhooks

## Uploads E Downloads

- Validar tipo, extensão, MIME type e tamanho.
- Não confiar apenas na extensão do arquivo.
- Validar arrays e quantidade máxima de arquivos.
- Não expor caminhos internos de armazenamento.
- Aplicar autorização antes de permitir download ou visualização.
- Validar vínculo do arquivo com o recurso solicitado.
- Usar streaming quando apropriado.
- Definir headers de conteúdo e nome de arquivo com segurança.
- Não armazenar arquivos executáveis ou perigosos sem controle explícito.

## Integrações E Webhooks

- Configurar timeout explícito.
- Validar assinatura e origem de webhooks quando disponível.
- Tornar processamento de webhooks idempotente.
- Responder rapidamente e delegar processamento pesado para Job quando apropriado.
- Aplicar retry apenas em operações seguras.
- Não registrar payloads sensíveis integralmente.
- Tratar respostas inválidas e indisponibilidade externa.
- Não retornar detalhes internos ao provedor externo.
