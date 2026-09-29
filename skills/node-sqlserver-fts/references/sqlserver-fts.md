# Full-Text Search No SQL Server Com Node.js E TypeScript

## Conceitos Centrais

### Full-Text Catalog

Recipiente lógico no SQL Server que agrupa índices Full-Text.

- Um catálogo pode ser compartilhado por várias tabelas do mesmo banco de dados.
- Não remover ou recriar um catálogo automaticamente sem confirmar que ele não é utilizado por outros índices.
- Criação segura:
  ```sql
  IF NOT EXISTS (SELECT 1 FROM sys.fulltext_catalogs WHERE name = 'ft_catalog_default')
  BEGIN
      CREATE FULLTEXT CATALOG ft_catalog_default AS DEFAULT;
  END
  ```

### Full-Text Index

Estrutura de indexação textual associada a uma tabela e vinculada a um índice exclusivo existente (`KEY INDEX`).

O índice definido em `KEY INDEX` deve:
- ser único (`UNIQUE`);
- conter apenas uma coluna como chave;
- não permitir valores `NULL`;
- ser estável e determinístico (preferencialmente a Primary Key);
- existir previamente à criação do Full-Text Index.

### `FREETEXT`

Realiza buscas em linguagem natural, considerando lematização, formas gramaticais e variações da palavra conforme o idioma configurado.

Exemplo conceitual:
```sql
SELECT id, title, description
FROM products
WHERE FREETEXT((title, description), @searchTerm);
```

### `CONTAINS`

Permite buscas avançadas e controladas com operadores específicos:
- Palavra exata: `'termo'`
- Prefixo: `'"termo*"'`
- Operadores booleanos: `'termo1 AND termo2'`, `'termo1 OR termo2'`, `'termo1 AND NOT termo2'`
- Proximidade: `'NEAR((termo1, termo2), 5)'`
- Formas flexionais: `'FORMSOF(INFLECTIONAL, termo)'`

Atenção: A entrada do usuário deve ser previamente sanitizada e formatada. Aspas duplas na entrada não tratada quebram a sintaxe do `CONTAINS` e causam erro no SQL Server.

### `FREETEXTTABLE` E `CONTAINSTABLE`

Funções de tabela que retornam o identificador (`[KEY]`) e o peso de relevância calculado (`[RANK]`). São essenciais para ordenação determinística por relevância:

```sql
SELECT p.id, p.title, ft.[RANK]
FROM products p
INNER JOIN CONTAINSTABLE(products, (title, description), @searchExpression) AS ft
    ON p.id = ft.[KEY]
ORDER BY ft.[RANK] DESC, p.id ASC;
```

## Sanitização E Preparação De Termos Em Node.js

Nunca concatenar a entrada do usuário diretamente na expressão FTS:

```typescript
export function sanitizeFtsQuery(input: string): string {
  // Remove aspas, caracteres de controle e operadores pontuais que quebram a sintaxe do CONTAINS
  const clean = input
    .replace(/["'*()[\]{}~]/g, ' ')
    .trim();

  const words = clean
    .split(/\s+/)
    .filter(word => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  // Gera consulta prefixada para cada termo com operador AND
  return words.map(w => `"${w}*"`).join(' AND ');
}
```

## Integração Com TypeORM Em Node.js

Utilizar `SelectQueryBuilder` com parâmetros nomeados seguros:

```typescript
import { DataSource } from 'typeorm';
import { Product } from './product.entity';
import { sanitizeFtsQuery } from './fts-utils';

export async function searchProducts(
  dataSource: DataSource,
  term: string,
  limit = 20,
  offset = 0
) {
  const ftsExpression = sanitizeFtsQuery(term);

  if (!ftsExpression) {
    return { data: [], total: 0 };
  }

  const queryBuilder = dataSource
    .getRepository(Product)
    .createQueryBuilder('p')
    .innerJoin(
      'CONTAINSTABLE(products, (title, description), :ftsExpression)',
      'ft',
      'p.id = ft.[KEY]',
      { ftsExpression }
    )
    .select(['p.id', 'p.title', 'p.price', 'ft.[RANK] AS rank'])
    .orderBy('ft.[RANK]', 'DESC')
    .addOrderBy('p.id', 'ASC')
    .skip(offset)
    .take(limit);

  const [data, total] = await Promise.all([
    queryBuilder.getMany(),
    queryBuilder.getCount()
  ]);

  return { data, total };
}
```

## Migrations TypeORM Para SQL Server FTS

Exemplo de migration segura para criação e reversão de catálogo e índice:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFullTextSearchToProducts1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Garante a existência do catálogo
    await queryRunner.query(`
      IF NOT EXISTS (SELECT 1 FROM sys.fulltext_catalogs WHERE name = 'ft_catalog_products')
      BEGIN
          CREATE FULLTEXT CATALOG ft_catalog_products;
      END
    `);

    // 2. Cria o Full-Text Index na tabela vinculando ao KEY INDEX (Primary Key)
    await queryRunner.query(`
      IF NOT EXISTS (
          SELECT 1
          FROM sys.fulltext_indexes fi
          JOIN sys.objects o ON fi.object_id = o.object_id
          WHERE o.name = 'products'
      )
      BEGIN
          CREATE FULLTEXT INDEX ON products(
              title LANGUAGE 1046, -- 1046 = Português do Brasil
              description LANGUAGE 1046
          )
          KEY INDEX PK_products_id
          ON ft_catalog_products
          WITH CHANGE_TRACKING AUTO;
      END
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      IF EXISTS (
          SELECT 1
          FROM sys.fulltext_indexes fi
          JOIN sys.objects o ON fi.object_id = o.object_id
          WHERE o.name = 'products'
      )
      BEGIN
          DROP FULLTEXT INDEX ON products;
      END
    `);

    await queryRunner.query(`
      IF EXISTS (SELECT 1 FROM sys.fulltext_catalogs WHERE name = 'ft_catalog_products')
      BEGIN
          DROP FULLTEXT CATALOG ft_catalog_products;
      END
    `);
  }
}
```

## Checklist De Implementação

- [ ] A funcionalidade Full-Text Search está confirmada como instalada no SQL Server.
- [ ] O `KEY INDEX` referenciado é único, estável e não permite `NULL`.
- [ ] O código de idioma (LCID) correto foi selecionado (ex: 1046 para Português do Brasil, 1033 para Inglês).
- [ ] A entrada do usuário passa por sanitização antes de ser submetida a `CONTAINS` ou `CONTAINSTABLE`.
- [ ] Todos os valores dinâmicos utilizam bindings preparados.
- [ ] A ordenação das consultas inclui coluna de desempate determinística além de `[RANK]`.
- [ ] A migration possui método de rollback `down` validado.
- [ ] Nenhuma alteração estrutural foi executada sem prévia autorização.
