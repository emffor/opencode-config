# Full Text Search No PostgreSQL Com Laravel

## Conceitos Centrais

### `to_tsvector`

Transforma um texto em um vetor de lexemas.

O processamento pode incluir:

- normalização;
- remoção de stop words;
- stemming;
- classificação por posição;
- pesos por campo.

A configuração linguística deve ser explícita quando a busca depender de idioma.

Exemplo:

```sql
to_tsvector(
    'portuguese',
    coalesce(name, '') || ' ' || coalesce(description, '')
)
```

### `plainto_tsquery`

Transforma texto simples em uma consulta na qual os termos são combinados, normalmente, com `AND`.

Utilizar quando o usuário fornece texto comum sem operadores.

```sql
plainto_tsquery('portuguese', 'telefone sem fio')
```

### `phraseto_tsquery`

Transforma texto simples em uma consulta que considera ordem e proximidade dos lexemas.

Utilizar quando o requisito envolver frase ou sequência de termos.

```sql
phraseto_tsquery('portuguese', 'telefone sem fio')
```

### `websearch_to_tsquery`

Aceita uma sintaxe semelhante a mecanismos de busca, incluindo frases entre aspas, `OR` e exclusão.

Utilizar somente quando a versão instalada do PostgreSQL oferecer suporte.

```sql
websearch_to_tsquery(
    'portuguese',
    '"telefone sem fio" OR headset -usado'
)
```

### `to_tsquery`

Aceita operadores e sintaxe interna de `tsquery`.

Exemplos de operadores:

- `&`: AND;
- `|`: OR;
- `!`: NOT;
- `<->`: proximidade;
- `:*`: prefixo.

Utilizar apenas quando a sintaxe for controlada ou validada pela aplicação.

Não enviar diretamente texto livre do usuário para `to_tsquery`.

## FTS, LIKE E pg_trgm

Full Text Search é adequado quando o requisito envolve:

- palavras;
- lexemas;
- stemming;
- frases;
- proximidade;
- operadores linguísticos;
- ranking de relevância.

FTS não é substituto direto para:

- busca por fragmento arbitrário;
- parte interna de uma palavra;
- códigos;
- placas;
- documentos;
- números parciais;
- erros de digitação;
- similaridade aproximada.

Para esses casos, avaliar:

- `LIKE`;
- `ILIKE`;
- extensão `pg_trgm`;
- índice trigram GIN ou GiST;
- normalização específica;
- busca híbrida.

Não adicionar `pg_trgm` sem confirmação explícita.

## Configuração Linguística

Antes de escolher `'portuguese'`:

1. Confirmar o idioma predominante dos dados.
2. Verificar se a configuração está disponível.
3. Avaliar palavras técnicas, nomes próprios e conteúdo multilíngue.
4. Testar stemming e stop words com dados representativos.
5. Não assumir que `'portuguese'` é sempre melhor que `'simple'`.

A configuração `'simple'` pode ser mais adequada quando:

- stemming não é desejado;
- há muitos nomes próprios;
- o conteúdo mistura idiomas;
- os termos precisam ser preservados;
- a busca é mais técnica que linguística.

## Estratégias De Indexação

### Índice funcional GIN

Adequado quando a expressão de busca é estável e não há necessidade de expor uma coluna `tsvector`.

Exemplo:

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

A consulta deve utilizar a mesma expressão:

```sql
to_tsvector(
    'portuguese',
    coalesce(name, '') || ' ' || coalesce(description, '')
)
```

Alterações na expressão podem impedir que o índice seja utilizado.

### Coluna `tsvector`

Pode ser utilizada quando:

- a expressão é complexa;
- várias consultas reutilizam o vetor;
- pesos por campo são relevantes;
- existe benefício de manutenção ou legibilidade;
- a versão do PostgreSQL e a arquitetura do projeto suportam a estratégia.

A coluna pode ser:

- gerada e armazenada;
- mantida por trigger;
- atualizada pela aplicação.

Não escolher uma estratégia sem avaliar compatibilidade, consistência e custo de escrita.

## Pesos Por Campo

Campos podem ter pesos diferentes.

Exemplo:

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

Pesos possíveis:

- `A`: maior relevância;
- `B`;
- `C`;
- `D`: menor relevância.

A expressão de consulta deve corresponder à expressão indexada.

## Migration Com Índice GIN

Adaptar nome da classe, schema, tabela, colunas e configuração linguística ao projeto.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class AddProductsFullTextIndex extends Migration
{
    public function up(): void
    {
        DB::statement(<<<'SQL'
            CREATE INDEX products_fts_idx
            ON public.products
            USING gin (
                to_tsvector(
                    'portuguese',
                    coalesce(name, '') || ' ' || coalesce(description, '')
                )
            )
        SQL);
    }

    public function down(): void
    {
        DB::statement(
            'DROP INDEX IF EXISTS public.products_fts_idx'
        );
    }
}
```

## Regras Para A Migration

- Confirmar o schema real.
- Confirmar o nome do índice.
- Confirmar colunas e tipos.
- Confirmar configuração linguística.
- Localizar migrations semelhantes.
- Não alterar migration antiga já executada.
- Criar uma nova migration.
- Não executar a migration automaticamente.
- Avaliar tamanho da tabela.
- Avaliar locks e tempo de criação.
- Definir rollback seguro.
- Não utilizar `CREATE INDEX CONCURRENTLY` dentro de transação.
- Em tabelas grandes de produção, avaliar criação concorrente em implantação controlada.
- Não assumir que `down()` é seguro em qualquer ambiente.

## Consulta Laravel Com Ranking

A expressão deve ser idêntica à utilizada pelo índice.

```php
<?php

use App\Models\Product;

$term = trim($searchTerm);

$vector = <<<'SQL'
    to_tsvector(
        'portuguese',
        coalesce(name, '') || ' ' || coalesce(description, '')
    )
SQL;

$query = Product::query()
    ->select('products.*')
    ->selectRaw(
        "ts_rank_cd(
            {$vector},
            websearch_to_tsquery('portuguese', ?)
        ) AS relevance",
        [$term]
    )
    ->whereRaw(
        "{$vector} @@ websearch_to_tsquery('portuguese', ?)",
        [$term]
    )
    ->orderByDesc('relevance');
```

Aplicar paginação:

```php
$products = $query->paginate(20);
```

Em versões sem `websearch_to_tsquery`, utilizar uma função compatível, como:

```php
plainto_tsquery('portuguese', ?)
```

Não escolher a função apenas por preferência. Escolher conforme o contrato da busca.

## Scope No Model

Criar scope apenas quando esse for o padrão do projeto e houver reutilização real.

```php
<?php

use Illuminate\Database\Eloquent\Builder;

public function scopeFullTextSearch(
    Builder $query,
    string $term
): Builder {
    $term = trim($term);

    if ($term === '') {
        return $query;
    }

    $vector = <<<'SQL'
        to_tsvector(
            'portuguese',
            coalesce(name, '') || ' ' || coalesce(description, '')
        )
    SQL;

    return $query
        ->select('products.*')
        ->selectRaw(
            "ts_rank_cd(
                {$vector},
                websearch_to_tsquery('portuguese', ?)
            ) AS relevance",
            [$term]
        )
        ->whereRaw(
            "{$vector} @@ websearch_to_tsquery('portuguese', ?)",
            [$term]
        )
        ->orderByDesc('relevance');
}
```

Antes de utilizar esse exemplo:

- confirmar compatibilidade de versão;
- confirmar padrão de scopes;
- confirmar tabela e alias;
- confirmar que a expressão corresponde ao índice;
- confirmar se o Model utiliza schema;
- testar paginação e ordenação.

## Ranking

Funções comuns:

- `ts_rank`;
- `ts_rank_cd`.

A escolha depende do comportamento esperado.

Não afirmar que uma delas é sempre melhor.

Avaliar:

- pesos;
- frequência;
- cobertura;
- proximidade;
- tamanho do documento;
- normalização;
- distribuição real dos termos.

Quando houver empate de relevância, utilizar ordenação secundária determinística.

Exemplo:

```php
->orderByDesc('relevance')
->orderBy('products.id');
```

## Prefixos

`to_tsquery` pode trabalhar com prefixos:

```sql
to_tsquery('portuguese', 'telefon:*')
```

Não concatenar texto livre do usuário diretamente nessa expressão.

Quando prefixos forem necessários:

1. normalizar a entrada;
2. validar caracteres;
3. construir a sintaxe de forma controlada;
4. utilizar binding;
5. limitar quantidade e tamanho dos termos;
6. testar comportamento com acentos e stemming.

## Normalização

Avaliar:

- lowercase;
- acentos;
- espaços;
- pontuação;
- caracteres especiais;
- termos vazios;
- stop words;
- conteúdo multilíngue.

Não duplicar na aplicação uma normalização já realizada pelo PostgreSQL sem necessidade.

## Performance E Plano De Execução

Analisar com:

```sql
EXPLAIN
SELECT ...
```

Quando seguro e necessário:

```sql
EXPLAIN ANALYZE
SELECT ...
```

Verificar:

- tipo de scan;
- uso do índice GIN;
- linhas estimadas;
- linhas reais;
- custo estimado;
- tempo total;
- sort;
- bitmap index scan;
- bitmap heap scan;
- filtros adicionais;
- volume retornado.

Não considerar `Sequential Scan` automaticamente um erro.

O PostgreSQL pode escolher `Sequential Scan` quando:

- a tabela é pequena;
- a consulta retorna grande parte da tabela;
- a seletividade é baixa;
- estatísticas estão desatualizadas;
- o custo estimado favorece leitura sequencial;
- a expressão não corresponde ao índice.

## Estatísticas

Quando houver divergência relevante entre estimativas e resultados:

- avaliar estatísticas;
- verificar manutenção do banco;
- verificar distribuição dos dados;
- verificar se a expressão é indexável;
- não executar `ANALYZE`, `VACUUM` ou manutenção automaticamente em produção.

## Paginação

- Aplicar limite máximo.
- Não retornar todos os resultados.
- Preservar relevância.
- Utilizar ordenação secundária estável.
- Avaliar custo de offsets muito altos.
- Não mudar o contrato de paginação sem confirmação.
- Não paginar Collection em memória.

## Segurança

- Utilizar bindings.
- Não concatenar entrada do usuário no SQL.
- Limitar tamanho do termo.
- Tratar termo vazio.
- Não expor SQL ou plano de execução ao cliente.
- Não registrar termos sensíveis sem necessidade.
- Não permitir que o usuário selecione configuração linguística arbitrária.
- Utilizar whitelist quando houver mais de uma configuração permitida.
- Não permitir nomes de coluna controlados pelo cliente.

## Testes

Testar:

- termo simples;
- múltiplos termos;
- frase;
- acentos;
- plural e singular;
- termo inexistente;
- campo `NULL`;
- resultado vazio;
- ranking;
- paginação;
- autorização;
- contrato da resposta;
- configuração linguística;
- comportamento em versão legada;
- diferenças entre FTS e busca por fragmento.

Não utilizar SQLite para validar comportamento específico de PostgreSQL FTS.

Aplicar também as regras da skill `laravel-testing`.

## Fluxo De Implementação

1. Confirmar requisito da busca.
2. Confirmar PostgreSQL e versão.
3. Identificar schema, tabela e colunas.
4. Escolher FTS, `pg_trgm`, `LIKE` ou estratégia híbrida.
5. Definir configuração linguística.
6. Criar consulta inicial segura.
7. Medir comportamento atual.
8. Avaliar índice.
9. Gerar migration quando necessário.
10. Não executar a migration.
11. Implementar query com bindings.
12. Aplicar ranking e paginação.
13. Criar testes.
14. Comparar resultados e performance.
15. Revisar contrato e compatibilidade.

## Checklist

- Driver PostgreSQL confirmado.
- Versão identificada.
- Requisito de busca compreendido.
- FTS confirmado como solução adequada.
- Configuração linguística avaliada.
- Schema e tabela confirmados.
- Expressão do índice e consulta idênticas.
- Valores `NULL` tratados.
- Bindings utilizados.
- Ranking avaliado.
- Paginação aplicada.
- Índice avaliado com plano de execução.
- Migration gerada, mas não executada.
- Impacto em produção avaliado.
- Compatibilidade com projeto legado verificada.
- Testes específicos de PostgreSQL criados.
- Métricas antes e depois registradas quando disponíveis.

## Entrega

Ao concluir, informar:

- schema, tabela e colunas afetadas;
- estratégia de busca escolhida;
- configuração linguística;
- índice ou migration criada;
- consulta implementada;
- ranking e paginação aplicados;
- métricas disponíveis;
- impacto esperado;
- riscos e limitações;
- operações não executadas;
- mensagem de commit sugerida em pt-BR, curta e imperativa.
