# Autenticação, Validação, Contratos De API E Banco De Dados

## Autenticação E Autorização

- Testar usuário não autenticado quando aplicável.
- Testar usuário autenticado sem permissão.
- Testar usuário autorizado.
- Validar pertencimento de registros.
- Verificar isolamento entre usuários, tenants ou organizações.
- Não testar apenas o caminho de sucesso.
- Preservar guards, middleware, Policies e Gates do projeto.
- Não desativar autenticação ou autorização para simplificar o teste.
- Verificar que recursos protegidos não sejam enumeráveis indevidamente.

## Validação E Contratos De API

- Testar campos obrigatórios.
- Testar tipos e formatos inválidos relevantes.
- Testar regras condicionais.
- Testar enums, datas, arrays, IDs e arquivos quando aplicável.
- Testar estrutura de erro conforme o contrato existente.
- Testar status HTTP.
- Testar estrutura e tipos da resposta.
- Testar que campos sensíveis não sejam retornados.
- Testar paginação, filtros e ordenação quando aplicável.
- Não criar assertions frágeis para campos não relacionados ao cenário.
- Preservar nomes e estrutura dos campos existentes.

## Banco De Dados

- Verificar o estado persistido quando ele fizer parte do comportamento.
- Usar assertions de banco compatíveis com o projeto.
- Não depender apenas da resposta HTTP quando a persistência for relevante.
- Verificar ausência de registros quando a operação não deveria persistir.
- Validar vínculos e integridade relacional quando aplicável.
- Não testar banco real de desenvolvimento, homologação ou produção.
- Não criar dados fora do controle da suíte.
- Não deixar dados persistidos após a execução quando o isolamento exigir limpeza.
