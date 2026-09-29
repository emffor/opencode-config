# Uploads, Streams, Downloads E Webhooks

## Uploads E Streams

- Processar uploads de arquivos grandes através de streams em vez de carregar arquivos inteiros em buffers na memória RAM do Node.js.
- Respeitar a biblioteca adotada no projeto (`multer`, `@fastify/multipart`, `busboy`).
- Validar tipo MIME real (através de magic numbers/file signature) e extensão permitida antes de salvar ou repassar arquivos.
- Impor limites rígidos de tamanho máximo de arquivo (`fileSize limit`) e número máximo de arquivos simultâneos.
- Armazenar arquivos em serviços de storage dedicados (S3, GCS, Azure Blob Storage) gerando URLs pré-assinadas para upload direto do cliente sempre que possível.
- Respeitar backpressure ao manipular streams do Node.js (`pipeline`, `Readable.pipe()`, `stream/promises`).

## Downloads De Arquivos

- Servir arquivos grandes ou relatórios exportados utilizando streams HTTP (`Readable.toWeb()` ou piping para a resposta).
- Configurar cabeçalhos `Content-Type`, `Content-Disposition` e `Content-Length` adequadamente.
- Não carregar relatórios CSV/Excel de centenas de milhares de linhas em arrays na memória; gerar as linhas e enviá-las sob demanda.

## Webhooks

- Validar a assinatura criptográfica (HMAC com secret compartilhado, ex: `crypto.createHmac('sha256', secret)`) no payload bruto (`raw body`) antes de processar qualquer webhook de terceiros.
- Preservar o buffer bruto do corpo da requisição especificamente para rotas de webhook que exigem validação de assinatura.
- Tratar o processamento do webhook de forma assíncrona: registrar o evento, responder `200 OK` imediatamente ao remetente e enfileirar o processamento do payload em background.
- Garantir idempotência no processamento de webhooks através do ID único do evento enviado pelo provedor.
