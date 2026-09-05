# Autorização, Segurança E Integrações Externas

## Autorização E Segurança

- Autorizar antes de ler, alterar ou excluir recursos protegidos.
- Usar Policies ou Gates conforme o padrão do projeto.
- Validar pertencimento de registros.
- Não confiar somente em controles do frontend.
- Evitar mass assignment de campos sensíveis.
- Usar ORM, Query Builder ou parâmetros preparados.
- Não concatenar valores externos em SQL.
- Preservar autenticação, autorização, CSRF e rate limiting existentes.
- Não enfraquecer controles de segurança para facilitar testes.
- Não retornar dados internos ou sensíveis.
- Não registrar senhas, tokens, JWTs, cookies, headers de autorização ou dados privados.
- Não alterar mecanismos de proteção existentes sem confirmação explícita.

## Integrações Externas

- Configurar timeout explícito.
- Tratar falhas de rede, respostas inválidas e indisponibilidade.
- Aplicar retry somente quando a operação for segura e idempotente.
- Não registrar tokens ou payloads sensíveis.
- Centralizar configuração em arquivos de config.
- Não acessar `env()` fora dos arquivos de configuração, salvo padrão existente.
- Não editar `.env` automaticamente.
- Quando houver nova variável, atualizar `.env.example` e documentação aplicável.
- Usar fakes ou mocks nos testes quando disponíveis.
- Manter chamadas externas fora de transações sempre que possível.
