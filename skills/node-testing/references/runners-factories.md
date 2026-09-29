# Runners E Factories

## Test Runners (Vitest, Jest, node:test)

- Identificar e respeitar a API do runner adotado:
  - Vitest: `describe`, `it`, `expect`, `vi.fn()`, `vi.spyOn()`, `vi.mock()`.
  - Jest: `describe`, `test`, `expect`, `jest.fn()`, `jest.spyOn()`, `jest.mock()`.
  - Node Test Runner (`node:test`, `node:assert`): `test`, `describe`, `assert.strictEqual`.
- Executar apenas os testes específicos do arquivo que está sendo alterado durante o desenvolvimento (`vitest run path/to/file.spec.ts` ou `jest path/to/file.spec.ts`).
- Não rodar a suíte inteira repetidamente sem necessidade; rodar a suíte completa somente na validação final.
- Limpar mocks e spies entre testes (`beforeEach(() => { vi.clearAllMocks(); })`) para evitar vazamento de estado entre testes.

## Factories E Fixtures

- Usar factories para construir entidades e payloads com dados padrão válidos e valores sobrescrevíveis:
  - Fishery (`Factory.define(...)`);
  - Builders customizados (`makeUser({ email: 'custom@domain.com' })`);
  - Fixtures estáticas quando o projeto já adotar.
- Gerar dados dinâmicos aleatórios (como emails únicos e nomes com `@faker-js/faker`) nas factories para evitar conflito de unicidade em banco.
- Criar dados estritamente necessários para o cenário que está sendo testado; evitar instanciar árvores inteiras de objetos irrelevantes.
