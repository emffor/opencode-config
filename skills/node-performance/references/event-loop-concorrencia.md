# Event Loop, Assincronicidade E Concorrência

## Diagnóstico E Proteção Do Event Loop

- O Node.js executa JavaScript em uma única thread principal (Single Thread Event Loop). Qualquer computação síncrona bloqueia todas as demais requisições concorrentes.
- Monitorar a latência do event loop utilizando `perf_hooks` (`monitorEventLoopDelay`) ou ferramentas de APM.
- Evitar operações síncronas bloqueantes:
  - Nunca usar APIs síncronas do sistema de arquivos (`fs.*Sync`) em rotas de produção;
  - Criptografia pesada de forma síncrona: usar métodos assíncronos (`bcrypt.hash` com worker pools em vez de chamadas bloqueantes);
  - Parsing de JSONs gigantescos: usar parsers em stream quando o JSON ultrapassar dezenas de megabytes.

## Paralelismo E Concorrência

- Usar `Promise.all` para executar operações de I/O assíncronas independentes em paralelo em vez de encadear múltiplos `await` em série.
- Controlar o grau de concorrência com `p-limit` ou bibliotecas similares ao processar grandes listas de tarefas assíncronas em paralelo para não esgotar sockets de rede ou o pool de conexões do banco de dados.
- Para processamento estritamente CPU-bound (cálculos matemáticos complexos, compressão de imagens, processamento de vídeo), delegar para Worker Threads (`worker_threads`) ou filas com processos dedicados.
- Em ambientes com múltiplos núcleos de CPU, utilizar o modo cluster do Node.js ou orquestração com instâncias múltiplas (PM2 cluster mode, containers Docker/Kubernetes) para utilizar todos os cores disponíveis.
