# Segurança E Autorização Na Revisão

## Checagens Críticas De Segurança

- **Vulnerabilidades IDOR / BOLA**:
  - Verificar se todo endpoint que busca ou altera registros por ID valida se o registro pertence ao usuário ou tenant autenticado.
- **SQL / NoSQL Injection**:
  - Verificar se existem interpolações de strings, template literals ou concatenações em chamadas de QueryBuilder, raw SQL ou queries MongoDB.
- **Prototype Pollution**:
  - Verificar funções de merge ou atribuição recursiva de objetos vindo de entradas não confiáveis sem validação de chaves perigosas (`__proto__`, `constructor`).
- **Autenticação E Sessões**:
  - Verificar se rotas novas não foram esquecidas sem middlewares de autenticação.
  - Verificar expiração de tokens e invalidação correta de refresh tokens.
  - Conferir se senhas são criptografadas com algoritmos adequados (bcrypt/argon2) antes de qualquer persistência.
- **Exposição De Dados Sensíveis**:
  - Conferir se tokens, senhas ou dados confidenciais foram adicionados acidentalmente a mensagens de log ou retornos de API.
