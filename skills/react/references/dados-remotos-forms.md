# Dados Remotos, APIs, Forms E Validação

## Dados Remotos E APIs

- Respeitar estratégia de requests existente; não misturar libs de fetching sem necessidade.
- Tratar loading, erro, ausência de dados e sucesso; evitar race conditions e chamadas duplicadas.
- Não expor tokens/dados sensíveis no frontend; não logar payloads sensíveis.
- Respeitar interceptors/clients existentes; não criar instância HTTP paralela sem justificativa.
- Encapsular chamadas no service/camada HTTP adotada pelo projeto; componentes não devem conhecer detalhes de URL, headers ou transformação de resposta sem necessidade.

## React Query/SWR/Equivalentes (se já usados ou autorizados)

- Preservar query keys existentes; padronizar novas conforme o projeto.
- Definir invalidação explícita; evitar refetch excessivo e invalidação ampla quando update específico resolver.
- Tratar mutations, erros e rollback; verificar concorrência e optimistic updates.
- Não adotar essas libs automaticamente em projetos que não as usam.

## Formulários

- Respeitar solução existente (RHF, Formik, estado local); não introduzir nova lib sem necessidade.
- Preservar formato do payload; tratar envio/sucesso/erro; evitar envio duplicado.
- Manter campos controlados/não controlados de forma consistente; tratar arrays com keys estáveis.
- Preservar valores quando ocorrer erro de validação do servidor.

## Validação

- Respeitar a lib já usada; não introduzir Zod/Yup automaticamente.
- Manter validação coerente com o contrato do backend; nunca considerar validação do frontend como barreira de segurança.
- Quando o projeto separar DTOs e schemas, usar DTOs para contratos da API e schemas para os valores/validações do formulário, preservando os formatos reais de request e response.
