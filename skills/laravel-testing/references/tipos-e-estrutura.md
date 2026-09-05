# Tipos De Teste E Estrutura

## Testes Feature

Usar para:

- endpoints HTTP;
- autenticação e autorização;
- validação;
- banco de dados;
- contratos de API;
- fluxos envolvendo múltiplas camadas;
- filas, eventos e notificações;
- integrações simuladas;
- middlewares e Policies.

## Testes Unit

Usar para:

- regras isoladas;
- cálculos;
- transformações;
- objetos de domínio;
- classes sem dependência relevante do framework;
- comportamentos com dependências facilmente substituíveis.

Não transformar todo teste em Unit apenas para evitar dependências reais importantes do comportamento.

## Estrutura Dos Testes

- Seguir a organização existente em `tests/Feature`, `tests/Unit` ou estrutura equivalente.
- Manter nomes orientados ao comportamento esperado.
- Preferir um cenário principal por teste.
- Evitar testes excessivamente longos.
- Usar `setUp()` somente para preparação realmente compartilhada.
- Extrair helpers apenas quando houver reutilização ou ganho real de leitura.
- Não esconder toda a preparação em abstrações difíceis de entender.
- Não depender da ordem de execução dos testes.
- Não compartilhar estado mutável entre testes.
- Preservar o estilo já adotado pelo projeto.
