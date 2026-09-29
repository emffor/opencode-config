# Sinais De Alerta Em Node.js

Analisar com atenção durante investigações de lentidão ou sobrecarga:

- `repository.find()` sem cláusula `take` / `limit` em tabelas dinâmicas;
- Queries de banco executadas dentro de laços (`for`, `map`, `forEach`);
- Múltiplas leituras do mesmo registro na mesma requisição por falta de compartilhamento de contexto;
- `.filter()` ou `.reduce()` em arrays com dezenas de milhares de itens após `SELECT *`;
- Carregamento de arquivos ou relatórios inteiros em `Buffer` na memória RAM;
- Funções síncronas do módulo `fs` (`readFileSync`, `writeFileSync`) em handlers HTTP;
- Chamadas HTTP para serviços externos em série dentro de loops;
- Cache Redis configurado sem TTL (`SET` sem expiração);
- Comandos `KEYS *` sendo executados em instâncias de cache compartilhado;
- Transações de banco de dados abertas enquanto aguardam requisições de rede ou filas;
- Event listeners adicionados repetidamente dentro de funções chamadas por requisição;
- Promises criadas sem controle de concorrência (`Promise.all(milharesDeTarefas)`);
- Regexes complexas com múltiplos quantificadores aninhados avaliando entradas do usuário;
- Payloads de jobs de fila contendo objetos serializados gigantescos em vez de identificadores.

Um sinal de alerta não é automaticamente um gargalo. Confirmar frequência, volume e impacto real antes de concluir que determinado trecho é a causa do problema.
