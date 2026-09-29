# Injeção De Dependência, Jobs, Filas E Eventos

## Injeção De Dependência (DI) E IoC

- Respeitar a estratégia de composição do projeto: NestJS IoC container, tsyringe, InversifyJS, Awilix ou injeção manual por construtor/factory functions.
- Manter dependências explícitas no construtor ou na factory em vez de importações diretas de singletons mutáveis.
- Programar para interfaces ou abstrações quando o desacoplamento trouxer benefício real para testes e substituição de adaptadores.
- Não introduzir frameworks pesados de DI em projetos que adotam injeção manual simples e modular.

## Jobs E Filas De Processamento

- Delegar tarefas demoradas (envio de emails, geração de PDFs, processamento de imagens, sincronizações pesadas) para filas assíncronas (BullMQ, Bull, pg-boss, Agenda, SQS).
- Manter jobs pequenos, autocontidos e idempotentes: a repetição da execução de um job não deve corromper dados nem duplicar transações financeiras.
- Não passar entidades completas ou objetos complexos/mutáveis no payload do job; trafegar apenas identificadores primitivos (ex: `{ orderId: string }`) e recarregar os dados no worker.
- Configurar estratégias claras de retentativa com backoff exponencial e Dead Letter Queues (DLQ) para falhas permanentes.
- Monitorar a taxa de processamento de filas e o consumo de memória dos workers para evitar OOM (Out Of Memory).

## Eventos E Mensageria

- Usar `EventEmitter` nativo, `eventemitter2` ou brokers externos (Kafka, RabbitMQ, Redis Pub/Sub) para desacoplamento de efeitos colaterais.
- Tratar eventos de erro emitidos por streams ou event emitters (`emitter.on('error', ...)`) para prevenir encerramento abrupto do processo Node.
- Manter handlers de evento assíncronos protegidos contra exceções não tratadas.
- Evitar criar cadeias circulares de eventos que possam disparar loops infinitos e esgotar o heap da aplicação.
