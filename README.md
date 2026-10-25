# Configuração compartilhada do OpenCode

## Onde configurar

- **Ligar/desligar MCPs no Mac:** edite `configs/mcps-macos.json`.
- **Ligar/desligar MCPs no Ubuntu:** edite `configs/mcps-ubuntu.json`.
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

Depois de salvar, execute `node scripts/apply-mcps.mjs` neste repositório.
O script detecta Mac/Ubuntu automaticamente e aplica as escolhas; salvar o JSON
sozinho não aplica a mudança. É necessário Node.js 20 ou superior, sem instalar pacotes.
Ao adicionar um MCP ao perfil, adicione também seu controle booleano.
Credenciais devem continuar nos arquivos `.env` externos, nunca nos perfis.

No Mac, os MCPs com sufixo `emfforserver` executam no servidor via SSH; os demais
executam no próprio Mac. No perfil Ubuntu, todos executam no servidor.

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
node scripts/apply-mcps.mjs macos
```

No Ubuntu:

```bash
cd ~/.config/opencode
node scripts/apply-mcps.mjs ubuntu
```

O script substitui o arquivo ativo (ou o link simbólico antigo) sem alterar o
perfil original. Preserve antes qualquer ajuste feito somente no arquivo ativo.
Ele valida os nomes e exige `true` ou `false` para todos os MCPs antes de gravar.

Depois de receber alterações nos perfis ou controles pelo Git, execute novamente
o script para atualizar a configuração ativa. Os controles são versionados;
credenciais continuam fora do repositório.

Para testar o script: `node --test scripts/apply-mcps.test.mjs`.

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
