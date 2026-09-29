# Integrações HTTP E Uploads Nos Testes

## Mocks De Requisições HTTP Externas

- Não permitir que testes automatizados realizem chamadas reais para a internet ou APIs de terceiros.
- Usar ferramentas especializadas para interceptar requisições HTTP no nível de rede:
  - MSW (Mock Service Worker): intercepta requisições `fetch` / `axios` de forma limpa e declarativa;
  - Nock (`nock('https://api.pagamento.com').post('/charge').reply(200, ...)`): padrão estabelecido em projetos Node/Jest;
  - Undici MockAgent: quando o projeto utilizar `fetch` nativo do Node.js.
- Testar cenários de falha na integração: timeout, erro 500 do parceiro, payload malformado e retentativas.

## Testes De Upload E Arquivos

- Usar buffers em memória (`Buffer.from(...)`) para simular arquivos em testes de upload, evitando arquivos pesados versionados no git:
  ```typescript
  await request(app)
    .post('/api/v1/avatars')
    .set('Authorization', `Bearer ${token}`)
    .attach('file', Buffer.from('conteudo-fake'), {
      filename: 'avatar.png',
      contentType: 'image/png'
    })
    .expect(201);
  ```
- Testar rejeição de arquivos com extensões proibidas ou tipos MIME não autorizados.
- Testar comportamento quando o arquivo excede o limite máximo configurado (status 413 ou 400).
- Mockar a camada de envio para o storage (S3/GCS) para verificar os parâmetros do upload sem enviar arquivos para a nuvem.
