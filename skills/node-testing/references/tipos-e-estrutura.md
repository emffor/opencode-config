# Tipos E Estrutura De Testes

## Níveis De Teste

- **Testes Unitários**:
  - Testam funções puras, métodos de domínio, services e lógica de negócio isolada.
  - Não dependem de I/O externo, rede ou banco de dados real.
  - Rápidos, leves e executados com dublês de teste (stubs, fakes, mocks) mínimos.
- **Testes De Integração**:
  - Testam a interação entre múltiplas camadas: HTTP -> Middleware -> Service -> Repositório -> Banco de Dados.
  - Validam contratos, queries SQL reais, constraints e serialização.
  - Executados contra banco de testes isolado ou container local.
- **Testes E2E (Ponta A Ponta)**:
  - Disparam requisições simulando clientes externos contra a aplicação iniciada.
  - Validam fluxos completos de negócio e autenticação.

## Estrutura E Convenções

- Seguir a convenção do repositório para localização de testes:
  - Co-localizados ao lado do código fonte (ex: `user.service.ts` e `user.service.spec.ts`);
  - Em diretório centralizado (ex: `test/` ou `tests/`).
- Adotar o padrão AAA (Arrange, Act, Assert) para legibilidade:
  1. **Arrange**: preparar dados, mocks e estado inicial;
  2. **Act**: executar a operação a ser testada;
  3. **Assert**: verificar o resultado retornado ou efeitos colaterais esperados.
- Manter descrições de teste em estilo comportamental (`describe('UserService', () => { it('should throw ConflictError when email already exists', ... ) })`).
