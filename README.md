# Configuração compartilhada do OpenCode

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

O OpenCode lê `~/.config/opencode/opencode.jsonc`. Esse arquivo é local e ignorado
pelo Git; os perfis não são selecionados automaticamente pelo sistema operacional.
O `service.json` também é local e não versionado: cada máquina mantém sua própria
configuração privada do serviço, sem sincronizá-la pelo Git.

## Selecionar ou atualizar o perfil ativo

No Mac:

```bash
cd ~/.config/opencode
cp configs/macos.jsonc opencode.jsonc
```

No Ubuntu:

```bash
cd ~/.config/opencode
cp configs/ubuntu.jsonc opencode.jsonc
```

A cópia substitui o arquivo ativo. Preserve ajustes locais antes de executá-la.
Ao alterar configurações compartilháveis de MCP, edite o perfil correspondente
e copie-o para o arquivo ativo para aplicar a mudança nesta máquina.

`git pull` atualiza os perfis, mas não altera o arquivo ativo ignorado. Repita a
cópia caso queira aplicar mudanças recebidas no perfil do seu sistema.

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
