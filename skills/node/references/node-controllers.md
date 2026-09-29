# Node.js E Controllers

## Node.js E TypeScript

- Respeitar a versão de Node.js e TypeScript configuradas no projeto.
- Usar recursos compatíveis com a versão configurada em `tsconfig.json` e `package.json`.
- Evitar o uso de `any`; preferir tipagem explícita em contratos e interfaces públicas.
- Usar `unknown` com asserção/refinamento em vez de `any` para dados não confiáveis.
- Tratar Promises com `async`/`await` de forma consistente; nunca esquecer `await` em operações assíncronas.
- Sempre tratar rejeições de Promise para evitar `UnhandledPromiseRejection`.
- Não bloquear o event loop com operações de CPU intensivas, I/O síncrono (`fs.readFileSync`) ou regex catastrófica.
- Evitar métodos ou funções extensas com responsabilidades misturadas.
- Não capturar exceções apenas para relançá-las sem contexto ou tratamento real.

## Controllers E Route Handlers

- Manter controllers finos e desacoplados de regras de negócio.
- Não concentrar lógica complexa de domínio dentro de handlers HTTP.
- Validar e sanitizar parâmetros de entrada (`params`, `query`, `body`) antes de repassar ao caso de uso.
- Delegar a execução do fluxo à camada de serviço ou caso de uso adotada pelo repositório.
- Não executar consultas diretas a banco ou ORM no controller quando existir camada de serviço ou repositório.
- Tratar erros através do middleware central de erros ou com wrappers controlados; evitar `try/catch` redundante em cada endpoint quando houver error handler global.
- Retornar respostas conforme o padrão existente no projeto (status code apropriado, headers, envelope).
- Não expor dados sensíveis, stack traces, detalhes de queries SQL ou objetos de infraestrutura na resposta.
- Não transformar o controller em um service disfarçado.
