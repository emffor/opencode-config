# Configuração compartilhada do OpenCode

## Onde configurar

- **Ligar/desligar MCPs no Mac:** edite `configs/mcps-macos.jsonc`.
- **Ligar/desligar MCPs no Ubuntu:** edite `configs/mcps-ubuntu.jsonc`.
- **Comandos e caminhos:** ficam nos perfis `configs/macos.jsonc` e
  `configs/ubuntu.jsonc`.
- **`opencode.jsonc`:** arquivo gerado pelo script. Não edite manualmente.

No arquivo de controles, `true` habilita e `false` desabilita. Por exemplo:

```json
{
  "bitbucket-review": true,
  "bitbucket-review-emfforserver": false,
  "pentest-mcp-emfforserver": true,
  "rea": true,
  "rea-emfforserver": false
}
```

Depois de salvar, execute `node apply-mcps.mjs` neste repositório.
O script detecta Mac/Ubuntu automaticamente e aplica as escolhas; salvar o JSON
sozinho não aplica a mudança. É necessário Node.js 20 ou superior, sem instalar pacotes.
Ao adicionar um MCP ao perfil, adicione também seu controle booleano.
Credenciais devem continuar nos arquivos `.env` externos, nunca nos perfis.

No Mac, os MCPs com sufixo `emfforserver` usam o servidor via SSH; os demais
executam no próprio Mac. No perfil Ubuntu, todos executam no servidor.

## Pentest compartilhado com o MCP Hub

`pentest` (Ubuntu) e `pentest-mcp-emfforserver` (Mac) usam o **mesmo coordenador HTTP
do Hub**, em `http://172.26.0.10:7320/mcp`. Não iniciam outro processo Pentest nem
carregam `policy.json` de laboratório. Isso compartilha preferências persistentes,
concessões e o perfil VPN `proton-free` que já estão cadastrados no coordenador.
O nome do perfil é `proton-free`, não `pronto-free`; não é criada outra VPN.

O script `pentest-http-bridge.mjs` encaminha o protocolo stdio ao HTTP existente,
preservando a identidade do servidor, sessão e metadados. No Mac, a ponte roda
**no Ubuntu pelo SSH `emfforserver-local`**; não requer Docker ou token no Mac.
O token privado é lido apenas no Ubuntu em
`/home/administrador/.config/pentest-mcp/http-token`, sem copiá-lo para este
repositório, argumentos ou outra máquina. Os perfis versionados contêm somente o
caminho. O arquivo precisa ser regular, privado (0600), sem symlink e pertencer
ao usuário do processo ou root. Não alterar credenciais existentes para aplicar.

Pré-requisitos: Node 24.22.1 no caminho dos perfis, coordenador provisionado e
acessível pelo Ubuntu e, no Mac, alias/chave SSH existentes. Não abre portas,
reinicia serviços, cria autorização nem executa scan. Sem reconexão/retry de calls
ou fallback para outra instância/Direct. Fechar a ponte encerra só a sessão HTTP,
não cancela análises do manager compartilhado. Concorrência/capacidade também são
compartilhadas com o Hub, e suas permissões da web não participam do acesso MCP
direto: a credencial HTTP dá acesso às tools sujeitas à política do coordenador.

Após atualizar este repositório no Mac, execute `node apply-mcps.mjs macos`.
No Ubuntu, execute `node apply-mcps.mjs ubuntu`. O OpenCode recarrega a configuração;
se a sessão conservar a conexão antiga, use `/reload` e confira `/mcps`. Não é
necessário reiniciar o serviço OpenCode para aplicar o perfil.
Consulte `pentest_get_settings` e `pentest_get_capabilities`: devem anunciar
`proton-free` e as mesmas preferências do Hub. `pentest_check_network` verifica
saúde/identidade/guards, não mede IP público nem garante conectividade futura.
Perfil cadastrado não significa túnel saudável; gateway indisponível bloqueia os
testes igualmente nos dois clientes, sem fallback.

Validação local: `node --test apply-mcps.test.mjs pentest-http-bridge.test.mjs`.
Testes cobrem HTTP loopback, autenticação, sessão/metadados, limites, falhas sem
retry/vazamento e equivalência dos dois perfis. Não validam acesso SSH real pelo Mac.

Em 30/10/2026, a ponte foi aplicada no Ubuntu após conferir que a configuração ativa
não tinha diferenças exclusivas fora do Pentest; backup privado preservado fora do
Git. Consulta real pela própria tool do OpenCode confirmou a revisão 80, preferência
VPN e perfil `proton-free` do coordenador compartilhado. Leituras HTTP confirmaram
concessão válida para a página de teste. Nenhum cadastro ou preferência foi alterado.
`pentest_check_network` retornou `unavailable`: o container pinado existe e sua imagem
corresponde, mas o health está `unhealthy`. Isso é um problema operacional do gateway,
não ausência do perfil. Nenhum túnel/container/serviço foi reiniciado nem scan iniciado.
O perfil Mac foi preparado e testado estruturalmente; aplicação/SSH real no Mac pendentes.

Ativação/reversão: preservar ajustes exclusivos da configuração ativa antes de
aplicar; para reverter, restaurar o perfil versionado anterior e executar novamente
o script. Não substituir políticas/settings/token do Pentest nem reiniciar o gateway.

## Estrutura por ambiente

Este repositório (`emffor/opencode-config`) é usado pelo OpenCode tanto no
servidor Ubuntu quanto no Mac:

| Ambiente | Diretório do repositório e da configuração | Perfil versionado |
| --- | --- | --- |
| Ubuntu — servidor `emfforserver`, usuário `administrador` | `/home/administrador/.config/opencode` | `configs/ubuntu.jsonc` |
| macOS — usuário `emffor` | `/Users/emffor/.config/opencode` | `configs/macos.jsonc` |

As alterações neste repositório devem preservar a compatibilidade dos dois
ambientes. Caminhos, comandos e MCPs específicos de um sistema devem ficar no
perfil correspondente, não na configuração compartilhada.

Agents, commands, skills, plugins e preferências comuns são compartilhados pelo Git.
Os MCPs e caminhos específicos de cada sistema ficam em perfis versionados:

- `configs/macos.jsonc`: configuração do Mac.
- `configs/ubuntu.jsonc`: configuração do Ubuntu, incluindo o MCP pentest.

O OpenCode lê `~/.config/opencode/opencode.jsonc`, gerado a partir do perfil e
dos controles booleanos desta máquina. O script converte `true` em `disabled: false`
e `false` em `disabled: true`. O arquivo gerado é local e ignorado pelo Git.
O `service.json` também é local e não versionado: cada máquina mantém sua própria
configuração privada do serviço, sem sincronizá-la pelo Git.

## Selecionar ou atualizar o perfil ativo

No Mac:

```bash
cd ~/.config/opencode
node apply-mcps.mjs macos
```

No Ubuntu:

```bash
cd ~/.config/opencode
node apply-mcps.mjs ubuntu
```

O script substitui o arquivo ativo (ou o link simbólico antigo) sem alterar o
perfil original. Preserve antes qualquer ajuste feito somente no arquivo ativo.
Ele valida os nomes e exige `true` ou `false` para todos os MCPs antes de gravar.

Depois de receber alterações nos perfis ou controles pelo Git, execute novamente
o script para atualizar a configuração ativa. Os controles são versionados;
credenciais continuam fora do repositório.

Para testar o script: `node --test apply-mcps.test.mjs`.

## Primeiro pull no Mac após esta organização

Como `opencode.jsonc` e `service.json` eram versionados, a remoção do rastreamento
pode remover suas cópias locais durante o pull. Antes dele, preserve ambos em
uma pasta privada fora do repositório:

```bash
backup_dir=$(mktemp -d "$HOME/opencode-config-backup.XXXXXX")
cp -p ~/.config/opencode/opencode.jsonc "$backup_dir/"
if [ -f ~/.config/opencode/service.json ]; then
  cp -p ~/.config/opencode/service.json "$backup_dir/"
fi
echo "Backup local: $backup_dir"
```

Após o pull, selecione `configs/macos.jsonc` conforme acima e restaure
`service.json` do backup se ele tiver sido removido. Se o Git recusar o pull por
alterações locais, não force nem descarte arquivos: preserve e revise as diferenças.

## Arquivos privados e gerados

Não versione `service.json`, arquivos `.env`, credenciais, backups ou
`node_modules`. As credenciais referenciadas pelos perfis continuam fora deste
repositório. Ignorar arquivos não remove cópias presentes no histórico do Git.
