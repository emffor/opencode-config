# Memória, APIs/Serialização, Integrações Externas E Uploads

## Memória

- Evitar carregar grandes Collections; evitar duplicar estruturas em memória.
- Processar dados em streaming ou lotes; liberar referências grandes quando necessário.
- Evitar serialização desnecessária; evitar carregar relacionamentos grandes sem uso.
- Avaliar payloads de Resources; não manter arquivos grandes inteiros em memória.
- Verificar Jobs que crescem continuamente em memória.
- Considerar reinício controlado de workers quando aplicável.

## APIs E Serialização

- Evitar payloads maiores que o necessário; não retornar campos e relacionamentos não utilizados.
- Usar Resources de forma previsível; evitar consultas dentro de Resources.
- Verificar custo de serialização de grandes coleções.
- Aplicar paginação e limites; avaliar compressão apenas quando suportada pela infraestrutura.
- Evitar transformar repetidamente os mesmos dados.
- Preservar contrato existente; não reduzir payload quebrando consumidores sem confirmação.

## Integrações Externas

- Configurar timeout explícito; evitar chamadas repetidas para o mesmo recurso.
- Avaliar cache para respostas estáveis.
- Aplicar retry somente quando seguro e idempotente.
- Evitar chamadas síncronas demoradas em requisições críticas; delegar processamento para Jobs quando apropriado.
- Agrupar requisições quando a API externa suportar batch.
- Não aumentar concorrência sem avaliar rate limits.
- Medir tempo externo separadamente do tempo interno; não registrar payloads sensíveis.

## Uploads E Downloads

- Usar streaming quando apropriado; evitar carregar arquivos grandes inteiros em memória.
- Processar arquivos grandes em background; trabalhar em lotes.
- Evitar conversões repetidas; não manter arquivos temporários além do necessário.
- Avaliar limites de tamanho e timeout.
- Verificar custo de armazenamento e transferência; preservar segurança e autorização.
