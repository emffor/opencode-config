#!/usr/bin/env bash
set -euo pipefail

if (($# == 0)); then
  echo 'Informe o executável e os argumentos.' >&2
  exit 2
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo 'Não foi possível carregar o nvm do usuário.' >&2
  exit 127
fi

# The OpenCode MCP process may not be an interactive/login shell.
# shellcheck source=/dev/null
source "$NVM_DIR/nvm.sh"
nvm use default >/dev/null
exec "$@"
