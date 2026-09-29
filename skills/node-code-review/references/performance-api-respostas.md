# Performance, API E Respostas Na Revisão

## Revisão De Performance E Event Loop

- Identificar operações síncronas bloqueantes no event loop:
  - `fs.readFileSync`, `fs.writeFileSync` ou `child_process.execSync` em handlers de requisição;
  - Algoritmos com complexidade cúbica/exponencial sobre arrays grandes;
  - Regexes suscetíveis a backtracking catastrófico (ReDoS);
  - `JSON.parse` / `JSON.stringify` sobre payloads de múltiplos megabytes sem streaming.
- Verificar consultas a banco em laços (`for`, `forEach`, `map`) causando problema de N+1.
- Verificar se coleções volumosas são paginadas obrigatoriamente.

## Revisão De Respostas HTTP

- Conferir se o contrato de resposta preserva compatibilidade com clientes existentes.
- Garantir que objetos de erro não vazem stack traces para o cliente em respostas 500.
- Conferir se a estrutura do JSON de saída segue o envelope padronizado do projeto.
- Verificar se recursos grandes ou relatórios são enviados via streams para não estourar a memória RAM do processo Node.
