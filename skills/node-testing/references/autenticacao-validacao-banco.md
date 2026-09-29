# Autenticação, Validação De Schemas E Banco Nos Testes

## Autenticação Nos Testes

- Fornecer helpers para geração de tokens de teste válidos (`generateTestJwt(user)` ou `authenticateAs(user)`).
- Testar cenários com tokens ausentes, tokens expirados, tokens com assinatura inválida e tokens de usuários com diferentes papéis/permissões.
- Garantir que testes de autorização verifiquem se um usuário não consegue acessar dados de outro usuário/tenant.

## Validação De Schemas E Contratos

- Testar schemas de entrada (Zod, class-validator) garantindo rejeição com status 400/422 quando campos obrigatórios estiverem ausentes ou em formato inválido.
- Testar limites de tamanho (min/max length) e regexes de campos sensíveis (como CPF, CNPJ, e-mail, telefone).
- Validar se a resposta contém exatamente as propriedades esperadas no contrato e se campos confidenciais foram omitidos.

## Banco De Dados E Limpeza De Estado

- Garantir que o banco de dados seja limpo entre execuções de testes ou que cada teste execute dentro de uma transação com rollback automático no `afterEach`.
- Quando usar truncagem de tabelas (`TRUNCATE CASCADE`), respeitar a ordem de dependências e evitar conflitos de lock entre workers paralelos.
- Usar migrations para preparar a estrutura do banco de testes em vez de `synchronize: true` para garantir paridade com o schema real.
- Nunca executar testes contra bancos com dados de produção ou homologação.
