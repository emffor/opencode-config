# Full-Text Search No SQL Server Com Laravel

## Conceitos Centrais

### Full-Text Catalog

Recipiente lógico que agrupa índices Full-Text.

Um catálogo pode ser compartilhado entre várias tabelas.

Não remover um catálogo automaticamente sem confirmar que ele não é utilizado por outros índices.

### Full-Text Index

Estrutura de indexação textual associada a uma tabela e a um índice único existente.

O índice definido em `KEY INDEX` deve:

- ser único;
- utilizar apenas uma coluna como chave;
- não permitir `NULL`;
- ser estável;
- existir antes da criação do Full-Text Index.

Não assumir que deve ser necessariamente a Primary Key.

### `FREETEXT`

Realiza busca em linguagem natural.

Pode considerar:

- flexões;
- formas gramaticais;
- significado linguístico;
- variações dos termos.

Adequado para entrada livre quando não houver necessidade de operadores avançados.

### `CONTAINS`

Permite consultas controladas com:

- palavra;
- prefixo;
- expressão booleana;
- proximidade;
- formas flexionais;
- pesos.

A sintaxe deve ser controlada ou validada.

Não enviar texto livre diretamente para uma expressão avançada.

### `FREETEXTTABLE`

Retorna uma tabela com:

- `KEY`;
- `RANK`.

Adequado para busca em linguagem natural com ordenação por relevância.

### `CONTAINSTABLE`

Retorna uma tabela com:

- `KEY`;
- `RANK`.

Adequado para prefixos, operadores e expressões controladas com ranking.

## FTS E LIKE

Full-Text Search é adequado quando o requisito envolve:

- palavras;
- flexões;
- termos linguísticos;
- prefixos de palavras;
- proximidade;
- operadores booleanos;
- ranking.

FTS não é equivalente a uma busca por substring arbitrária.

Exemplo que FTS pode não substituir diretamente:

```sql
LIKE '%fone%'
```

Quando o requisito for encontrar qualquer fragmento interno, avaliar:

- preservar `LIKE`;
- normalizar o dado;
- criar coluna auxiliar;
- utilizar outro mecanismo de busca;
- alterar o requisito com autorização.

Não substituir comportamento existente sem comparar resultados.

## Verificar Instalação

Executar somente como consulta de leitura:

```sql
SELECT FULLTEXTSERVICEPROPERTY('IsFullTextInstalled')
    AS is_full_text_installed;
```

Resultado esperado quando instalado:

```text
1
```

Outros resultados devem ser tratados conforme a versão e a infraestrutura.

Em ambientes autogerenciados, pode ser necessário verificar também o serviço Full-Text Filter Daemon Launcher.

Em serviços gerenciados, não presumir acesso ao serviço do sistema operacional.

## Verificar Idiomas Disponíveis

```sql
SELECT
    lcid,
    name
FROM sys.fulltext_languages
ORDER BY name;
```

Para verificar Português do Brasil:

```sql
SELECT
    lcid,
    name
FROM sys.fulltext_languages
WHERE lcid = 1046;
```

Utilizar `1046` apenas quando estiver disponível na instância.

Não assumir que o nome textual do idioma é igual em todas as instalações.

## Verificar Catálogos

```sql
SELECT
    fulltext_catalog_id,
    name,
    is_default,
    is_accent_sensitivity_on
FROM sys.fulltext_catalogs;
```

## Verificar Índices Full-Text

```sql
SELECT
    OBJECT_SCHEMA_NAME(object_id) AS schema_name,
    OBJECT_NAME(object_id) AS table_name,
    fulltext_catalog_id,
    is_enabled,
    change_tracking_state_desc,
    has_crawl_completed
FROM sys.fulltext_indexes;
```

## Identificar Índice Único

Antes de criar o Full-Text Index, identificar um índice único apropriado.

```sql
SELECT
    i.name AS index_name,
    c.name AS column_name,
    i.is_primary_key,
    i.is_unique,
    c.is_nullable
FROM sys.indexes AS i
INNER JOIN sys.index_columns AS ic
    ON ic.object_id = i.object_id
   AND ic.index_id = i.index_id
INNER JOIN sys.columns AS c
    ON c.object_id = ic.object_id
   AND c.column_id = ic.column_id
WHERE i.object_id = OBJECT_ID(N'dbo.products')
  AND i.is_unique = 1
  AND ic.key_ordinal > 0
ORDER BY i.name, ic.key_ordinal;
```

Confirmar manualmente:

- que existe somente uma coluna-chave;
- que a coluna não permite `NULL`;
- que o índice não será removido;
- que o nome real será utilizado em `KEY INDEX`.

## Migration Para Catálogo E Índice

Adaptar:

- schema;
- tabela;
- colunas;
- catálogo;
- idioma;
- nome do índice único;
- estratégia de atualização.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddProductsFullTextIndex extends Migration
{
    public function up(): void
    {
        DB::statement(<<<'SQL'
            IF NOT EXISTS (
                SELECT 1
                FROM sys.fulltext_catalogs
                WHERE name = N'ftCatalog'
            )
            BEGIN
                CREATE FULLTEXT CATALOG [ftCatalog] AS DEFAULT;
            END
        SQL);

        DB::statement(<<<'SQL'
            IF NOT EXISTS (
                SELECT 1
                FROM sys.fulltext_indexes
                WHERE object_id = OBJECT_ID(N'dbo.products')
            )
            BEGIN
                CREATE FULLTEXT INDEX
                ON dbo.products
                (
                    name LANGUAGE 1046,
                    description LANGUAGE 1046
                )
                KEY INDEX [PK_products]
                ON [ftCatalog]
                WITH
                (
                    CHANGE_TRACKING = AUTO,
                    STOPLIST = SYSTEM
                );
            END
        SQL);
    }

    public function down(): void
    {
        DB::statement(<<<'SQL'
            IF EXISTS (
                SELECT 1
                FROM sys.fulltext_indexes
                WHERE object_id = OBJECT_ID(N'dbo.products')
            )
            BEGIN
                DROP FULLTEXT INDEX ON dbo.products;
            END
        SQL);
    }
}
```

## Atenção Ao `KEY INDEX`

Como está no exemplo:

```sql
KEY INDEX [PK_products]
```

Esse nome é apenas ilustrativo.

Antes de criar a migration:

1. consultar os índices existentes;
2. confirmar o nome real;
3. confirmar que ele é único;
4. confirmar que possui uma única coluna-chave;
5. confirmar que a coluna não permite `NULL`;
6. substituir o nome no SQL.

Não copiar um nome de índice gerado automaticamente de outro banco.

## Transações E Migration

`CREATE FULLTEXT INDEX` não deve ser executado dentro de transação explícita.

Regras:

- não usar `DB::transaction(...)`;
- verificar se o mecanismo de migrations do projeto envolve a execução em transação;
- verificar compatibilidade da versão do Laravel;
- quando necessário, marcar a migration como não transacional conforme o padrão suportado pelo projeto;
- quando isso não for seguro, separar a criação em etapa controlada de deploy;
- gerar o código, mas não executar automaticamente;
- não executar na branch `production`;
- não executar com `APP_ENV=production`.

## Catálogo Compartilhado

O `down()` do exemplo remove somente o índice da tabela.

Não remover automaticamente:

```sql
DROP FULLTEXT CATALOG [ftCatalog];
```

Um catálogo pode ser utilizado por outras tabelas.

Remover catálogo somente após confirmar:

- que foi criado exclusivamente para essa funcionalidade;
- que não possui outros índices;
- que a remoção foi autorizada;
- que há estratégia de rollback.

## Consulta Com `FREETEXTTABLE`

Adequada para texto livre e ranking.

```php
<?php

use Illuminate\Support\Facades\DB;

$sql = <<<'SQL'
    SELECT
        p.*,
        ft.[RANK] AS relevance
    FROM dbo.products AS p
    INNER JOIN FREETEXTTABLE(
        dbo.products,
        (name, description),
        ?
    ) AS ft
        ON ft.[KEY] = p.id
    ORDER BY
        ft.[RANK] DESC,
        p.id ASC
SQL;

$products = DB::select($sql, [$searchTerm]);
```

Utilizar paginação ou limite em implementação real.

Não retornar todos os resultados sem controle.

## Consulta Com `CONTAINSTABLE`

Adequada para sintaxe controlada.

```php
<?php

use Illuminate\Support\Facades\DB;

$containsExpression = '"telefone*"';

$sql = <<<'SQL'
    SELECT
        p.*,
        ft.[RANK] AS relevance
    FROM dbo.products AS p
    INNER JOIN CONTAINSTABLE(
        dbo.products,
        (name, description),
        ?
    ) AS ft
        ON ft.[KEY] = p.id
    ORDER BY
        ft.[RANK] DESC,
        p.id ASC
SQL;

$products = DB::select($sql, [$containsExpression]);
```

Não montar `$containsExpression` por concatenação direta com entrada livre.

Para prefixos:

1. normalizar o termo;
2. validar caracteres permitidos;
3. limitar tamanho;
4. escapar aspas conforme a estratégia adotada;
5. construir a expressão de forma controlada;
6. utilizar binding;
7. testar a sintaxe resultante.

## Consulta Com `FREETEXT`

Quando ranking não for necessário:

```php
$products = DB::table('dbo.products')
    ->whereRaw(
        'FREETEXT((name, description), ?)',
        [$searchTerm]
    )
    ->paginate(20);
```

## Consulta Com `CONTAINS`

Quando a sintaxe for controlada:

```php
$products = DB::table('dbo.products')
    ->whereRaw(
        'CONTAINS((name, description), ?)',
        [$containsExpression]
    )
    ->paginate(20);
```

## Ranking

`FREETEXTTABLE` e `CONTAINSTABLE` retornam `RANK`.

O ranking:

- é relativo à consulta;
- não deve ser tratado como percentual;
- pode variar conforme conteúdo e índice;
- deve ser combinado com ordenação secundária estável;
- não deve ser exposto como significado absoluto sem documentação.

Exemplo:

```sql
ORDER BY
    ft.[RANK] DESC,
    p.id ASC
```

## Linguagem Natural E Sintaxe Controlada

Usar `FREETEXT` ou `FREETEXTTABLE` quando:

- o usuário fornece texto livre;
- flexões devem ser consideradas;
- não há necessidade de operadores manuais;
- ranking é desejado.

Usar `CONTAINS` ou `CONTAINSTABLE` quando:

- prefixos são necessários;
- operadores booleanos são controlados;
- proximidade é relevante;
- pesos ou formas flexionais são definidos;
- a aplicação constrói a expressão.

## Formas Flexionais

Uma expressão controlada pode utilizar:

```sql
FORMSOF(INFLECTIONAL, "comprar")
```

Não permitir que o usuário forneça toda a sintaxe sem validação.

## Prefixos

Exemplo de prefixo:

```sql
"telefon*"
```

O asterisco deve estar dentro das aspas da expressão Full-Text.

FTS trabalha com prefixo de palavra, não com substring arbitrária.

## Proximidade

Consultas com `NEAR` devem ser utilizadas somente quando o requisito exigir proximidade entre termos.

Não adicionar complexidade sem evidência de benefício.

Testar comportamento com dados reais e idioma configurado.

## População Inicial

A criação de um Full-Text Index pode iniciar população dos dados existentes.

Considerar:

- tamanho da tabela;
- quantidade de colunas;
- volume de texto;
- carga do servidor;
- horário de implantação;
- duração da população;
- impacto em disco e CPU.

Não assumir que o índice estará disponível imediatamente.

## Verificar População

Consultar informações de população quando necessário:

```sql
SELECT
    database_id,
    table_id,
    population_type_description,
    status_description,
    start_time
FROM sys.dm_fts_index_population;
```

A disponibilidade dessa visão pode depender de permissões e versão.

Não alterar permissões automaticamente.

## Change Tracking

### `AUTO`

Mudanças são acompanhadas automaticamente.

A atualização pode ocorrer em segundo plano.

Não assumir consistência instantânea após cada escrita.

### `MANUAL`

Exige controle explícito de população.

Utilizar somente quando houver processo operacional definido.

### `OFF`

Não acompanha mudanças automaticamente.

Não utilizar sem compreender o processo de atualização.

## Stoplist

O exemplo utiliza:

```sql
STOPLIST = SYSTEM
```

Avaliar:

- palavras relevantes removidas;
- idioma;
- termos técnicos;
- necessidade de stoplist customizada.

Não criar stoplist personalizada sem justificativa e autorização.

## Performance E Plano De Execução

Avaliar:

- quantidade de resultados;
- ranking;
- filtros adicionais;
- joins;
- sort;
- paginação;
- custo da consulta;
- tempo total;
- impacto da população;
- uso de memória;
- concorrência.

Não assumir que qualquer scan no plano é automaticamente um problema.

Uma consulta pode utilizar Full-Text Search e ainda possuir scans ou operações adicionais em outras partes do plano.

Medir antes e depois.

## Paginação

- Aplicar limite máximo.
- Evitar retorno ilimitado.
- Preservar ranking.
- Utilizar ordenação secundária determinística.
- Não paginar Collection em memória.
- Avaliar custo de offsets altos.
- Preservar contrato existente.
- Não alterar paginação sem confirmação.

## Segurança

- Utilizar bindings.
- Não concatenar entrada do usuário no SQL.
- Limitar tamanho do termo.
- Tratar termo vazio.
- Não expor SQL, catálogo ou planos ao cliente.
- Não permitir nomes de coluna controlados pelo usuário.
- Não registrar termos sensíveis sem necessidade.
- Não permitir sintaxe avançada de `CONTAINS` sem validação.
- Não expor erros internos do SQL Server.

## Tratamento De Termo Vazio

Não executar FTS com entrada vazia sem definir comportamento.

Possibilidades:

- retornar query sem filtro, se esse for o contrato;
- retornar resultado vazio;
- rejeitar com validação;
- exigir tamanho mínimo.

Seguir o contrato existente.

## Testes

Testar:

- termo simples;
- múltiplos termos;
- linguagem natural;
- singular e plural;
- prefixo;
- termo inexistente;
- campo `NULL`;
- resultado vazio;
- ranking;
- paginação;
- autorização;
- contrato da resposta;
- idioma configurado;
- índice ainda em população;
- diferenças entre FTS e substring;
- sintaxe inválida;
- limite de tamanho.

Não utilizar SQLite para validar comportamento específico de SQL Server Full-Text Search.

Aplicar também as regras da skill `laravel-testing`.

## Fluxo De Implementação

1. Confirmar requisito.
2. Confirmar SQL Server e versão.
3. Verificar instalação do Full-Text Search.
4. Confirmar idioma.
5. Confirmar schema, tabela e colunas.
6. Identificar índice único compatível.
7. Verificar catálogo e índice existentes.
8. Escolher `FREETEXT` ou `CONTAINS`.
9. Criar consulta segura com binding.
10. Medir comportamento atual.
11. Gerar migration quando necessário.
12. Não executar a migration.
13. Avaliar população inicial.
14. Aplicar ranking e paginação.
15. Criar testes específicos.
16. Comparar contrato e performance.
17. Documentar limitações.

## Checklist

- Driver SQL Server confirmado.
- Versão identificada.
- Full-Text Search instalado.
- Idioma confirmado.
- Schema e tabela confirmados.
- Colunas compatíveis identificadas.
- Índice único válido identificado.
- Nome real do `KEY INDEX` confirmado.
- Catálogo existente avaliado.
- `FREETEXT` ou `CONTAINS` escolhido conforme o requisito.
- Bindings utilizados.
- Entrada controlada ou validada.
- Ranking avaliado.
- Paginação aplicada.
- Migration não executada automaticamente.
- Transação explícita evitada.
- População inicial avaliada.
- Change Tracking avaliado.
- Impacto em produção analisado.
- Compatibilidade com projeto legado verificada.
- Testes específicos de SQL Server criados.
- Métricas antes e depois registradas quando disponíveis.

## Entrega

Ao concluir, informar:

- schema, tabela e colunas afetadas;
- estratégia de busca escolhida;
- idioma utilizado;
- catálogo e índice envolvidos;
- `KEY INDEX` utilizado;
- migration ou SQL criado;
- consulta implementada;
- ranking e paginação aplicados;
- população e atualização consideradas;
- métricas disponíveis;
- impacto esperado;
- riscos e limitações;
- operações não executadas;
- mensagem de commit sugerida em pt-BR, curta e imperativa.
