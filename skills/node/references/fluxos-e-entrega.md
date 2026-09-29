# Fluxos E Entrega

## Fluxo De Implementação

1. Ler o `AGENTS.md` e instruções do repositório.
2. Identificar versões de Node.js, TypeScript e dependências no `package.json`.
3. Inspecionar implementações semelhantes no projeto.
4. Identificar arquivos, rotas, contratos e entidades afetados.
5. Elaborar a menor solução segura e compatível com a arquitetura existente.
6. Implementar seguindo os padrões do repositório.
7. Criar ou atualizar testes pertinentes (unitários e/ou integração).
8. Executar validações seguras e específicas (lint, typecheck, testes direcionados).
9. Revisar o diff.
10. Remover logs de debug, comentários descartáveis e arquivos temporários.
11. Resumir alterações, riscos, validações executadas e pendências.

## Fluxo De Correção De Bug

1. Reproduzir o problema ou localizar evidência concreta através de logs ou testes.
2. Identificar a causa-raiz (não aplicar remendos que apenas silenciem o sintoma).
3. Verificar impacto em fluxos e consumidores relacionados.
4. Implementar a menor correção segura.
5. Criar teste de regressão automatizado demonstrando a falha antes da correção e o sucesso após.
6. Validar que contratos públicos e comportamentos existentes foram preservados.
7. Informar cenários não testados ou limitações remanescentes.

## Entrega

Ao concluir uma tarefa relevante, informar:

- O que foi alterado.
- Arquivos, módulos, rotas ou entidades afetados.
- Riscos e impactos identificados.
- O que foi validado com comandos reais.
- O que não foi validado (ex: cenários com dependências externas indisponíveis).
- Mensagem de commit sugerida em pt-BR, curta, imperativa e no padrão Conventional Commits (ex: `fix: corrige validação de payload no cadastro`).
