import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

// Preserve strings while removing JSONC comments and trailing commas.
export function parseJsonc(text) {
  const withoutComments = text.replace(
    /"(?:\\.|[^"\\])*"|\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g,
    (token) => token.startsWith('"') ? token : ' ',
  );
  return JSON.parse(withoutComments.replace(
    /"(?:\\.|[^"\\])*"|,\s*(?=[}\]])/g,
    (token) => token.startsWith('"') ? token : '',
  ));
}

export async function applyMcps(root, platform) {
  if (!['macos', 'ubuntu'].includes(platform)) {
    throw new Error('Ambiente inválido. Use macos ou ubuntu.');
  }
  const config = parseJsonc(await readFile(resolve(root, `configs/${platform}.jsonc`), 'utf8'));
  const switches = parseJsonc(await readFile(resolve(root, `configs/mcps-${platform}.jsonc`), 'utf8'));
  const servers = config.mcp?.servers;
  if (!servers || !switches || typeof switches !== 'object' || Array.isArray(switches)) {
    throw new Error('Perfil ou arquivo de controles inválido.');
  }
  for (const name of Object.keys(switches)) {
    if (!Object.hasOwn(servers, name)) throw new Error(`MCP desconhecido: ${name}`);
  }
  for (const [name, server] of Object.entries(servers)) {
    if (!Object.hasOwn(switches, name) || typeof switches[name] !== 'boolean') {
      throw new Error(`Defina true ou false para o MCP: ${name}`);
    }
    server.disabled = !switches[name];
  }
  // Atomic replacement also replaces the old symlink, without writing to its target.
  const output = resolve(root, 'opencode.jsonc');
  const temporary = `${output}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporary, `// Gerado por apply-mcps.mjs. Não edite manualmente.\n${JSON.stringify(config, null, 2)}\n`, { flag: 'wx', mode: 0o600 });
    await rename(temporary, output);
  } finally {
    await rm(temporary, { force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const platform = process.argv[2] ?? ({ darwin: 'macos', linux: 'ubuntu' })[process.platform];
  try {
    await applyMcps(dirname(fileURLToPath(import.meta.url)), platform);
    console.log(`MCPs aplicados: configs/mcps-${platform}.jsonc → opencode.jsonc`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
