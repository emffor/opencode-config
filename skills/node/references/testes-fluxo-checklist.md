# Testes De API, Fluxo E Checklist

## Estrutura De Testes De API

- Escrever testes de integração para endpoints utilizando a ferramenta configurada (Supertest, Fastify `inject`, Vitest ou Jest).
- Testar o fluxo completo: requisição HTTP -> middlewares -> validação -> service -> persistência -> resposta HTTP.
- Cobrir o caminho feliz (happy path) com verificação de status code, headers e payload de saída.
- Cobrir caminhos de exceção e borda:
  - Payload com campos inválidos ou ausentes (verificar status 400 ou 422).
  - Requisição sem cabeçalho de autenticação ou com token expirado/inválido (401).
  - Requisição com credencial sem autorização para o recurso (403 ou 404).
  - Consulta a identificador inexistente (404).
  - Tentativa de duplicação de dados com restrição de unicidade (409).
- Não utilizar mocks excessivos em testes de integração de API; priorizar banco de teste real ou container de testes quando o repositório suportar.

## Checklist De API Antes Da Entrega

- [ ] Todas as novas rotas possuem validação de entrada configurada.
- [ ] Middlewares de autenticação e autorização foram aplicados e testados.
- [ ] O status HTTP retornado é consistente com o padrão RESTful.
- [ ] Nenhum dado sensível (senhas, tokens, dados internos de infraestrutura) está exposto na saída.
- [ ] O contrato público (schemas OpenAPI/Swagger) foi atualizado.
- [ ] O diff foi revisado e não contém código temporário nem logs residuais.
- [ ] Testes automatizados cobrem os cenários principais e de erro.
