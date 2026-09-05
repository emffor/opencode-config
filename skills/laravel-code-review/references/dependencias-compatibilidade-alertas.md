# Dependências, Configuração, Compatibilidade E Sinais De Alerta

## Dependências E Configuração

- Verificar novas dependências Composer.
- Confirmar necessidade e manutenção do pacote.
- Verificar alterações em `composer.json` e `composer.lock`.
- Verificar atualizações fora do escopo.
- Verificar novas variáveis em `.env.example`.
- Verificar defaults seguros em arquivos de config.
- Verificar alteração de providers, aliases ou bindings.
- Verificar impacto em deploy e ambientes existentes.
- Verificar edição indevida de `.env`.

## Compatibilidade

- Verificar compatibilidade com a versão do PHP.
- Verificar compatibilidade com a versão do Laravel.
- Verificar compatibilidade com o driver do banco.
- Verificar quebra de API.
- Verificar impacto em filas, caches e workers existentes.
- Verificar alterações em eventos, payloads ou contratos assíncronos.
- Verificar migração gradual quando houver consumidores ativos.
- Não aprovar modernização não relacionada ao escopo.

## Sinais De Alerta

Tratar com atenção especial:

- `dd()`, `dump()`, `ray()` ou logs temporários;
- `env()` fora de config;
- `$guarded = []`;
- `Model::all()`;
- `get()` sem limite em tabela grande;
- queries dentro de loops;
- `delete()` ou `update()` sem filtro claro;
- `DB::statement()` com entrada dinâmica;
- `unserialize()` com dados externos;
- chamadas shell;
- `forceDelete()`;
- `withoutGlobalScopes()`;
- `withoutMiddleware()`;
- `Http::withoutVerifying()`;
- autenticação ou autorização comentada;
- exceptions ignoradas;
- catch vazio;
- migrations destrutivas;
- testes removidos;
- secrets ou credenciais no diff.

Um sinal de alerta não é automaticamente um bug. Confirmar contexto e impacto.
