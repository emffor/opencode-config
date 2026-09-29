# Autorização, Segurança E Integrações Externas

## Autenticação E Autorização

- Validar e verificar tokens (JWT, session cookies, API keys) em middlewares ou guards dedicados antes de atingir handlers protegidos.
- Validar assinatura, expiração (`exp`), emissor (`iss`) e público (`aud`) de JWTs.
- Aplicar autorização refinada (RBAC, ABAC, CASL ou checks de pertencimento) antes de ler, alterar ou excluir recursos.
- Sempre validar o pertencimento do recurso ao usuário autenticado ou tenant ativo (evitar vulnerabilidades IDOR/BOLA).
- Não confiar exclusivamente em IDs fornecidos no corpo ou query da requisição quando puderem ser obtidos com segurança do token autenticado.
- Utilizar algoritmos criptográficos robustos para hashing de senhas (bcrypt, argon2, scrypt) com salt adequado.

## Segurança Em Node.js

- Utilizar `helmet` ou headers equivalentes para proteção básica (Content-Security-Policy, X-Frame-Options, Strict-Transport-Security, etc.).
- Configurar CORS de forma restritiva; nunca usar `origin: '*'` quando cookies ou credenciais forem permitidos (`credentials: true`).
- Prevenir Prototype Pollution: evitar deep merges inseguros de objetos arbitrários vindo do usuário sem sanitização (`__proto__`, `constructor`, `prototype`).
- Prevenir SQL Injection: nunca interpolar strings do usuário em queries SQL; usar exclusivamente parâmetros preparados e bindings do ORM/QueryBuilder.
- Prevenir NoSQL Injection: sanitizar inputs quando trabalhar com MongoDB ou queries baseadas em objetos de filtro.
- Prevenir DoS no event loop (ReDoS): validar expressões regulares para evitar backtracking catastrófico e limitar o tamanho do payload com `body-parser` ou configuração do Fastify.
- Sanitizar logs: nunca registrar senhas, tokens de acesso, chaves privadas, números de cartão ou dados sensíveis (LGPD/GDPR) nos logs da aplicação.

## Integrações Externas

- Configurar timeout explícito para todas as requisições HTTP de saída (Axios, Fetch com AbortController, Undici, Got).
- Tratar falhas de rede, respostas 4xx/5xx e payloads inesperados de serviços terceiros.
- Aplicar retentativas (retries) com backoff exponencial exclusivamente em operações seguras e idempotentes (GET, PUT idempotente) ou quando suportado pelo serviço.
- Centralizar configurações em variáveis de ambiente tipadas e validadas na inicialização do serviço.
- Não expor segredos ou chaves de API externas no código-fonte nem em mensagens de erro enviadas ao cliente.
