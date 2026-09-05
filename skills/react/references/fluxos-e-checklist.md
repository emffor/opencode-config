# Fluxos, Checklist E Formato De Entrega

## Fluxo Para Implementação

1. Ler `AGENTS.md`. 2. Identificar versões/stack/package manager. 3. Classificar o projeto (legado/novo/módulo). 4. Localizar implementação semelhante. 5. Identificar componentes/hooks/contratos afetados. 6. Elaborar a menor solução compatível. 7. Implementar seguindo padrões existentes. 8. Criar/atualizar testes. 9. Executar validações configuradas. 10. Revisar o diff. 11. Remover logs/código temporário. 12. Resumir alterações, riscos e limitações.

## Fluxo Para Correção De Bug

1. Reproduzir. 2. Achar causa-raiz. 3. Verificar impacto em fluxos relacionados. 4. Criar teste de regressão. 5. Aplicar a menor correção segura. 6. Validar loading/erro/vazio/sucesso. 7. Preservar contratos. 8. Executar testes relacionados. 9. Revisar diff. 10. Informar cenários não testados.

## Fluxo Para Criar Componente

1. Localizar componente semelhante. 2. Identificar design system/padrões de estilo. 3. Definir responsabilidade e contrato de props. 4. Avaliar a11y. 5. Implementar sem abstração excessiva. 6. Tratar estados relevantes. 7. Criar testes. 8. Verificar responsividade. 9. Revisar integração com consumidores.

## Fluxo Para Consumir API

1. Identificar client/camada HTTP existente. 2. Confirmar contrato da API. 3. Definir loading/erro/vazio/sucesso. 4. Tratar autenticação. 5. Evitar requests duplicadas e race conditions. 6. Preservar payload/formato de resposta. 7. Simular integração nos testes.

## Fluxo Para Otimização

1. Identificar comportamento lento. 2. Coletar evidências/medir. 3. Identificar maior custo. 4. Formular hipótese. 5. Aplicar a menor otimização compatível. 6. Medir de novo. 7. Verificar regressões. 8. Documentar ganho e limitações.

## Checklist

`AGENTS.md` lido • versões e package manager identificados • projeto classificado • recursos confirmados como compatíveis • padrões e contratos preservados • estado/hooks/deps de effects revisados • loading/erro/vazio/sucesso tratados • concorrência de requests avaliada • a11y e segurança verificadas • performance avaliada sem otimização prematura • testes criados/atualizados • dependências não adicionadas sem autorização • diff revisado • logs e código temporário removidos.

## Entrega

Ao concluir, informar:

- componentes/hooks/páginas/rotas alterados
- comportamento alterado; contratos preservados ou modificados
- dependências adicionadas/alteradas
- riscos e impactos; validações executadas e resultados
- o que não foi validado; limitações
- mensagem de commit sugerida em pt-BR, curta e imperativa
