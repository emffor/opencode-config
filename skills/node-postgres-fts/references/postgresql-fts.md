# PostgreSQL Full-Text Search Com Node.js, TypeScript E TypeORM

## Escopo

Esta referência trata PostgreSQL Full-Text Search (FTS) integrado a um backend
Node.js/TypeScript. Os exemplos usam SQL parametrizado, TypeORM e Jest. Os nomes
de tabela e coluna são ilustrativos e devem ser substituídos pelos nomes reais do
projeto.

Não usar SQLite para validar comportamento específico de FTS do PostgreSQL.

## Conceitos Centrais

### `to_tsvector`

Transforma texto em um vetor de lexemas. O processamento pode incluir
normalização, stop words, stemming, posição e pesos por campo.

```sql
to_tsvector(
    'portuguese',
    coalesce(name, '') || ' ' || coalesce(description, '')
)
```

A configuração linguística precisa ser explícita quando o resultado depender de
idioma. Não presumir que `portuguese` seja melhor que `simple` para nomes
próprios, termos técnicos, CRM, CPF, CNPJ ou conteúdo multilíngue.

### Funções De Consulta

`plainto_tsquery` transforma texto comum em uma consulta simples, normalmente
combinando os termos com `AND`:

```sql
plainto_tsquery('portuguese', 'telefone sem fio')
```

`phraseto_tsquery` considera a ordem e a proximidade dos lexemas:

```sql
phraseto_tsquery('portuguese', 'telefone sem fio')
```

`websearch_to_tsquery` aceita uma sintaxe semelhante a mecanismos de busca,
incluindo frases entre aspas, `OR` e exclusão. PostgreSQL 16 oferece suporte a
essa função:

```sql
websearch_to_tsquery(
    'portuguese',
    '"telefone sem fio" OR headset -usado'
)
```

`to_tsquery` aceita sintaxe interna, como `&`, `|`, `!`, `<->` e `:*`. Usar
somente com sintaxe construída ou validada pela aplicação. Nunca enviar texto
livre do cliente diretamente para `to_tsquery`.

## Escolha Da Estratégia

FTS é adequado para:

- palavras e lexemas;
- stemming e flexões linguísticas;
- frases e proximidade;
- operadores controlados;
- ranking de relevância.

FTS não é substituto direto para:

- substring arbitrária ou parte interna de uma palavra;
- CPF, CNPJ, CRM, códigos, placas e documentos;
- números parciais;
- erros de digitação e similaridade aproximada.

Para esses casos, avaliar `LIKE`, `ILIKE`, `pg_trgm`, normalização específica ou
busca híbrida. Não adicionar `pg_trgm` ou outra extensão sem autorização para
alteração estrutural.

## Configuração Linguística

Antes de escolher `portuguese`:

1. Confirmar o idioma predominante dos dados.
2. Confirmar que a configuração está disponível na instância.
3. Avaliar nomes próprios, termos médicos e conteúdo multilíngue.
4. Testar stemming e stop words com dados representativos.
5. Comparar com `simple` quando os termos precisarem ser preservados.

Consultar configurações disponíveis:

```sql
SELECT cfgname
FROM pg_ts_config
ORDER BY cfgname;
```

## Índices

### Índice Funcional GIN

Adequado quando a expressão do vetor é estável e não há necessidade de expor
uma coluna `tsvector`:

```sql
CREATE INDEX products_fts_idx
ON public.products
USING gin (
    to_tsvector(
        'portuguese',
        coalesce(name, '') || ' ' || coalesce(description, '')
    )
);
```

A consulta deve usar a mesma expressão do índice. Diferenças em configuração,
`coalesce`, concatenação ou pesos podem impedir o uso do índice.

### Coluna `tsvector`

Considerar uma coluna `tsvector` quando a expressão for complexa, reutilizada
por várias consultas ou usar pesos por campo. A coluna pode ser mantida por:

- coluna gerada, quando compatível com a expressão e a versão;
- trigger;
- processo de escrita da aplicação.

Escolher a estratégia considerando consistência, custo de escrita, backfill e
risco operacional. Não alterar tabela ou criar trigger automaticamente.

### Índice Trigram

`pg_trgm` pode atender substring e similaridade, mas é uma extensão e uma
alteração estrutural. Confirmar necessidade, disponibilidade, impacto em disco
e estratégia de rollback antes de gerar:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

Não executar esse comando automaticamente.

## Pesos Por Campo

Campos podem receber pesos diferentes:

```sql
setweight(
    to_tsvector('portuguese', coalesce(name, '')),
    'A'
)
||
setweight(
    to_tsvector('portuguese', coalesce(description, '')),
    'B'
)
```

Os pesos são `A` (maior), `B`, `C` e `D` (menor). A expressão usada na consulta
deve corresponder à expressão indexada.

## Migration TypeORM

Quando um índice for necessário, criar uma nova migration seguindo o padrão do
projeto. Não alterar uma migration já executada:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductsFullTextIndex implements MigrationInterface {
  name = 'AddProductsFullTextIndex';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX products_fts_idx
      ON public.products
      USING gin (
        to_tsvector(
          'portuguese',
          coalesce(name, '') || ' ' || coalesce(description, '')
        )
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS public.products_fts_idx
    `);
  }
}
```

Antes de gerar a migration:

- confirmar schema, tabela, tipos e nomes reais;
- localizar migrations semelhantes;
- avaliar tamanho da tabela e tempo de criação;
- avaliar locks e impacto no deploy;
- definir rollback seguro;
- considerar `CREATE INDEX CONCURRENTLY` em tabelas grandes;
- verificar como o projeto configura transações de migrations.

`CREATE INDEX CONCURRENTLY` não pode ser executado dentro de transação. Em
TypeORM, verificar a versão e a configuração do executor e, quando suportado,
desabilitar a transação apenas para essa migration. Se isso não for seguro,
separar a operação em uma etapa controlada de deploy.

Não executar `migration:run`, `migration:revert` ou equivalente sem autorização.

## Consulta Com TypeORM QueryBuilder

A expressão deve ser idêntica à expressão coberta pelo índice:

```typescript
const term = searchTerm.trim();

const vector = `to_tsvector(
  'portuguese',
  coalesce(product.name, '') || ' ' || coalesce(product.description, '')
)`;

const query = dataSource
  .getRepository(Product)
  .createQueryBuilder('product')
  .addSelect(
    `ts_rank_cd(
      ${vector},
      websearch_to_tsquery('portuguese', :term)
    )`,
    'relevance',
  )
  .where(
    `${vector} @@ websearch_to_tsquery('portuguese', :term)`,
    { term },
  )
  .orderBy('relevance', 'DESC')
  .addOrderBy('product.id', 'ASC')
  .take(20)
  .skip(0);

const products = await query.getMany();
```

O nome `Product`, o alias e as colunas precisam corresponder à entidade real.
Não interpolar valores vindos do cliente em `vector`, nomes de coluna ou nomes de
tabela. Quando esses identificadores forem configuráveis internamente, usar
whitelist fixa.

Para obter o ranking junto com a entidade, usar `getRawAndEntities()` e mapear
o alias de forma explícita, conforme o contrato da aplicação:

```typescript
const { entities, raw } = await query.getRawAndEntities();
const products = entities.map((product, index) => ({
  ...product,
  relevance: Number(raw[index].relevance),
}));
```

Confirmar o formato real retornado pelo driver antes de expor o ranking. Não
tratar `ts_rank` como percentual.

## Query Nativa Com Bindings

Usar `repository.query` ou `dataSource.query` quando o SQL nativo for realmente
necessário. O parâmetro deve permanecer separado do SQL:

```typescript
const rows = await dataSource.query(
  `
    SELECT
      p.*,
      ts_rank_cd(
        to_tsvector(
          'portuguese',
          coalesce(p.name, '') || ' ' || coalesce(p.description, '')
        ),
        websearch_to_tsquery('portuguese', $1)
      ) AS relevance
    FROM public.products AS p
    WHERE to_tsvector(
      'portuguese',
      coalesce(p.name, '') || ' ' || coalesce(p.description, '')
    ) @@ websearch_to_tsquery('portuguese', $1)
    ORDER BY relevance DESC, p.id ASC
    LIMIT $2 OFFSET $3
  `,
  [term, limit, offset],
);
```

Validar e limitar `limit` e `offset` antes da consulta. Não concatenar nenhum
desses valores no SQL.

## Termo Vazio

Definir o comportamento antes de executar FTS com entrada vazia. Possibilidades:

- não aplicar filtro, se esse for o contrato;
- retornar lista vazia;
- rejeitar com erro de validação;
- exigir tamanho mínimo.

O service deve tratar `trim()`, limite máximo, espaços e caracteres especiais de
acordo com a validação já existente. Não deixar uma query vazia retornar todos
os registros por acidente.

## Prefixos E `to_tsquery`

Prefixos usam `:*` dentro da sintaxe de `tsquery`:

```sql
to_tsquery('portuguese', 'telefon:*')
```

Quando prefixos forem necessários:

1. normalizar o termo;
2. validar os caracteres permitidos;
3. limitar quantidade e tamanho dos termos;
4. construir a expressão em código controlado;
5. passar a expressão como binding;
6. testar acentos, stemming e termos inválidos.

Não enviar o texto livre do usuário diretamente para `to_tsquery`. Para uma
busca livre, preferir `websearch_to_tsquery` ou `plainto_tsquery`.

## Ranking

As funções mais comuns são `ts_rank` e `ts_rank_cd`. A escolha depende do
comportamento desejado, dos pesos, da frequência dos termos, da cobertura,
proximidade, tamanho do documento e normalização.

O ranking é relativo à consulta e não deve ser exposto como significado
absoluto. Usar ordenação secundária determinística:

```sql
ORDER BY relevance DESC, p.id ASC
```

Não prometer que uma função de ranking é universalmente superior sem medir com
dados representativos.

## Filtros, Joins E Dados Sensíveis

FTS normalmente é apenas uma parte da consulta. Avaliar o efeito de joins,
filtros de tenant, soft delete, status, autorização e ordenação final.

Em um backend financeiro e de saúde:

- não pesquisar campos criptografados como se fossem texto puro;
- não incluir CPF, dados bancários, tokens ou documentos sensíveis no vetor sem
  requisito explícito e avaliação de privacidade;
- aplicar autorização antes de retornar resultados;
- manter isolamento de dados entre hospitais, médicos, contractors e usuários;
- não registrar termos sensíveis em logs.

## Performance E Plano De Execução

Usar `EXPLAIN` para inspeção sem executar a consulta:

```sql
EXPLAIN
SELECT ...;
```

Usar `EXPLAIN ANALYZE` somente quando a execução real for segura e autorizada,
pois ela executa a consulta. Avaliar:

- uso do índice GIN;
- bitmap index scan e bitmap heap scan;
- linhas estimadas e reais;
- custo e tempo total;
- sort e filtros adicionais;
- quantidade de resultados;
- impacto de joins e paginação.

`Sequential Scan` não é automaticamente um erro. Pode ser escolhido quando a
tabela é pequena, a seletividade é baixa, muitos registros serão retornados,
as estatísticas estão desatualizadas ou a expressão não corresponde ao índice.

Não executar `ANALYZE`, `VACUUM` ou manutenção automaticamente em produção.

## Paginação

- Aplicar limite máximo validado no service.
- Não retornar todos os resultados.
- Preservar o ranking.
- Usar ordenação secundária estável.
- Não paginar uma coleção inteira em memória.
- Avaliar o custo de offsets altos.
- Considerar keyset pagination quando o contrato e a ordenação permitirem.
- Não mudar o contrato HTTP sem necessidade e autorização.

Com TypeORM, preferir `take` e `skip` no `QueryBuilder` ou a estratégia de
paginação já adotada pelo projeto. Validar o SQL gerado e o comportamento com
joins antes de usar `getManyAndCount()` em consultas complexas.

## Segurança

- Usar parâmetros do TypeORM ou bindings `$1`, `$2`, `$3`.
- Nunca concatenar entrada do usuário no SQL.
- Nunca permitir nomes de coluna, tabela ou configuração linguística arbitrários.
- Usar whitelist para configurações e campos selecionáveis.
- Limitar tamanho e quantidade de termos.
- Tratar termo vazio e expressão inválida.
- Não expor SQL, plano de execução ou erro interno do PostgreSQL ao cliente.
- Não registrar termos sensíveis sem necessidade.
- Usar validação existente de Express antes de chegar ao service.

## Testes Com Jest

Testar a regra de negócio e o contrato do endpoint. Quando a semântica de FTS
for relevante, usar PostgreSQL real ou container de teste compatível, não SQLite.

Casos recomendados:

- termo simples e múltiplos termos;
- frase e `OR` com `websearch_to_tsquery`;
- acentos, singular, plural e configuração linguística;
- prefixo validado;
- termo inexistente e resultado vazio;
- campo `NULL` tratado com `coalesce`;
- ranking e desempate por identificador;
- paginação e limite máximo;
- autorização e isolamento de dados;
- entrada vazia e expressão inválida;
- diferenças entre FTS, `ILIKE` e substring;
- compatibilidade com a versão real do PostgreSQL.

Mockar o repository apenas em testes unitários da regra de orquestração. Usar
testes de integração para confirmar SQL, índice, ranking e comportamento do
driver TypeORM.

## Fluxo De Implementação

1. Confirmar requisito e semântica da busca.
2. Confirmar PostgreSQL e versão.
3. Identificar entidade, tabela, schema e colunas.
4. Localizar service, repository, controller, rota e validators envolvidos.
5. Escolher FTS, `ILIKE`, `pg_trgm` ou estratégia híbrida.
6. Definir configuração linguística e tratamento de `NULL`.
7. Implementar query segura com TypeORM e bindings.
8. Aplicar filtros de autorização, paginação e ranking.
9. Avaliar ou gerar migration do índice, sem executá-la automaticamente.
10. Criar testes unitários e de integração.
11. Inspecionar plano e medir antes/depois quando a tarefa for de performance.
12. Revisar logs, exposição de dados e compatibilidade do contrato HTTP.

## Checklist

- PostgreSQL e versão confirmados.
- Entidade, tabela, schema e colunas confirmados.
- Requisito de substring versus busca linguística compreendido.
- Configuração linguística avaliada.
- Expressão do índice e da consulta idênticas.
- Valores `NULL` tratados.
- Query parametrizada.
- Identificadores dinâmicos protegidos por whitelist.
- Ranking e desempate determinístico avaliados.
- Paginação com limite máximo aplicada.
- Autorização e isolamento de dados preservados.
- Migration TypeORM criada apenas quando necessária.
- Migration, extensão e índice não executados automaticamente.
- Transação avaliada para `CREATE INDEX CONCURRENTLY`.
- Plano de execução avaliado quando seguro.
- Testes executados em PostgreSQL compatível.
- Diferenças entre FTS e `ILIKE` documentadas.
- Termos sensíveis não expostos em logs.

## Entrega

Informar schema, tabela e colunas afetadas, estratégia escolhida, configuração
linguística, entidade/service/repository alterados, query e bindings, migration
criada, índice, ranking, paginação, testes e métricas. Registrar também impacto,
riscos, limitações e operações não executadas.
