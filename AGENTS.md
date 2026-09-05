## Escopo E Precedência

- Este arquivo define minhas preferências globais para desenvolvimento de software.
- Regras específicas do repositório devem permanecer no `AGENTS.md` do próprio projeto.
- Em caso de conflito, respeitar a seguinte ordem:
  1. Instrução direta do usuário
  2. `AGENTS.md` mais próximo do arquivo alterado
  3. `AGENTS.md` da raiz do repositório
  4. Documentação interna do projeto
  5. Este arquivo global
  6. Padrões da ferramenta
- Não substituir regras específicas do projeto por preferências genéricas deste arquivo.

## Comunicação

- Responder sempre em pt-BR, de forma direta, objetiva e sem floreio.
- Usar termos técnicos em inglês quando forem o padrão da tecnologia.
- Não explicar conceitos básicos sem necessidade.
- Em caso de ambiguidade relevante de regra de negócio, perguntar antes de implementar.
- Para pequenas ambiguidades técnicas, seguir o padrão existente mais provável e explicitar a suposição.

## Antes De Alterar

- Entender o objetivo, as restrições técnicas, a compatibilidade e o impacto da mudança.
- Inspecionar o código existente antes de propor uma solução.
- Seguir rigorosamente a arquitetura, os padrões e o estilo do repositório.
- Procurar implementações semelhantes antes de criar código novo.
- Preferir reutilizar ou estender implementações existentes em vez de criar novas abstrações.
- Verificar contratos públicos e dependências afetadas pela mudança.
- Verificar testes relacionados quando existirem.
- Não realizar mudanças fora do escopo solicitado.
- Não alterar arquitetura, contrato público ou comportamento existente sem necessidade clara e autorização.

## Implementação

- Priorizar segurança, correção, legibilidade, previsibilidade e simplicidade.
- Aplicar Clean Code e SOLID sem criar abstrações desnecessárias.
- Corrigir a causa-raiz do problema, evitando remendos locais quando houver solução estrutural simples.
- Preservar compatibilidade retroativa quando não houver autorização para quebrá-la.
- Não alterar nomes ou estruturas públicas apenas por preferência de estilo.
- Não remover funcionalidades, código existente ou testes sem necessidade relacionada à solicitação.
- Não criar helpers, services, traits, wrappers ou utilitários sem verificar se já existe solução equivalente.
- Não adicionar dependências sem confirmação explícita do usuário.
- Não atualizar frameworks, runtimes ou pacotes fora do escopo solicitado.
- Não modernizar código não relacionado à tarefa.
- Não editar arquivos gerados, dependências vendorizadas ou artefatos de build, salvo solicitação explícita.

## Planejamento E Execução

- Para alterações não triviais, apresentar um plano curto antes da implementação.
- Executar a tarefa atual por completo sempre que possível.
- Não interromper a implementação por dúvidas pequenas que possam ser resolvidas pelo contexto do projeto.
- Antes de finalizar, revisar o diff e remover código temporário, logs de debug e alterações acidentais.
- Não declarar que algo foi validado quando não foi efetivamente executado ou verificado.

## Testes E Validação

- Preservar os testes existentes.
- Atualizar ou criar testes quando a alteração modificar comportamento e o projeto possuir estrutura de testes compatível.
- Para bugs, criar teste de regressão quando for razoável.
- Executar primeiro os testes mais específicos relacionados à mudança.
- Executar lint, formatter, type checking ou análise estática quando forem relevantes e estiverem configurados no projeto.
- Não alterar ou enfraquecer testes apenas para fazê-los passar.
- Não corrigir falhas não relacionadas à tarefa sem autorização.
- Informar claramente validações que não puderam ser executadas.

## Banco De Dados

- Quando a solicitação for consultar, analisar, validar, investigar ou auditar dados, utilizar exclusivamente operações de leitura.
- Não executar comandos que alterem dados ou estrutura sem confirmação explícita do usuário.
- A restrição inclui SQL, ORM, Query Builder, migrations, seeds, procedures, scripts, imports, sincronizações e comandos da aplicação.
- Não usar operações de escrita para corrigir, preparar, sincronizar ou facilitar uma consulta.
- Antes de qualquer operação de escrita, confirmar o ambiente e o banco afetados.
- Se o ambiente ou banco não puder ser confirmado com segurança, não executar a operação.
- Nunca executar automaticamente comandos destrutivos ou potencialmente destrutivos, incluindo:
  - `INSERT`, `UPDATE`, `DELETE`, `UPSERT`, `MERGE` e `REPLACE`
  - `CREATE`, `ALTER`, `DROP` e `TRUNCATE`
  - migrations, rollbacks, refresh, reset e wipe
  - seeds, imports e sincronizações com escrita
- Antes de qualquer alteração em banco, informar:
  - ambiente e banco afetados
  - impacto esperado
  - risco de alteração ou perda de dados
  - forma de validação
  - estratégia de reversão
- Quando possível, validar primeiro com uma operação equivalente de leitura.
- Gerar o código ou comando necessário, mas solicitar confirmação antes de executá-lo.

## Git E Arquivos

- Não executar comandos Git destrutivos sem confirmação explícita.
- Não executar automaticamente:
  - `git reset --hard`
  - `git clean -fd`
  - `git checkout -- <arquivo>`
  - `git restore` com descarte de alterações
  - `git push --force`
  - rebase destrutivo
- Não sobrescrever alterações existentes que não tenham sido feitas durante a tarefa atual.
- Não remover arquivos, mover grandes conjuntos de arquivos ou realizar renomeações em massa sem confirmação.
- Não fazer commit ou push sem solicitação explícita.
- Nunca incluir `.env`, tokens, chaves, credenciais, dumps, arquivos privados ou dados sensíveis em commits.
- Ao concluir alterações de código, sugerir uma mensagem de commit curta, descritiva, imperativa e em pt-BR.

## Segurança

- Não expor credenciais, tokens, chaves, dados pessoais, stack traces ou detalhes internos sensíveis.
- Não introduzir secrets diretamente no código-fonte.
- Não enfraquecer autenticação, autorização, validação ou proteção de dados para facilitar testes.
- Não desativar controles de segurança sem confirmação explícita e justificativa técnica.
- Não registrar informações sensíveis em logs.
- Preservar os mecanismos de proteção já existentes no projeto.

## Operações De Alto Risco

- Nunca executar automaticamente operações destrutivas, irreversíveis ou de alto impacto.
- Solicitar confirmação explícita imediatamente antes da operação, mesmo que ela tenha sido mencionada anteriormente.
- Explicar o impacto, os riscos e a reversão antes de solicitar confirmação.
- Preferir alternativas reversíveis e de menor impacto.
- Não realizar refactors arquiteturais, renomeações em massa ou mudanças amplas fora do escopo sem autorização.

# Mensagens de Commit
- All git commit messages (including those generated automatically by the Antigravity IDE Source Control "Generate commit message" button) MUST be strictly in Portuguese (pt-BR).
- Never generate commit messages in English.
- Use o padrão Conventional Commits com descrição em português no imperativo.
- Exemplo: `feat: adiciona filtro na listagem`, `fix: corrige validação de data`.

## Entrega

- Ao concluir uma tarefa relevante, informar:
  - o que foi alterado
  - arquivos, métodos ou componentes afetados
  - riscos e impactos identificados
  - o que foi validado
  - o que não foi validado
- Não apresentar como concluído algo que esteja parcial ou não validado.
- Manter o resumo final proporcional ao tamanho da alteração.
