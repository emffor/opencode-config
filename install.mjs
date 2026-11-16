import { lstat, mkdir, mkdtemp, readFile, readlink, realpath, rm, symlink, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyMcps } from './apply-mcps.mjs';

const entries = ['AGENTS.md', 'cli.json', 'agents', 'commands', 'skills', 'plugins',
  'node-with-nvm.sh', 'pentest-http-bridge.mjs', 'opencode.jsonc'];

async function exists(path) {
  try { return await lstat(path); } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

export async function install(root, configDir, platform) {
  root = await realpath(root);
  configDir = resolve(configDir);
  if (!['ubuntu', 'macos'].includes(platform)) throw new Error('Ambiente inválido. Use macos ou ubuntu.');
  const stage = await mkdtemp(join(tmpdir(), 'opencode-install-'));
  try {
    await mkdir(join(stage, 'configs'));
    for (const name of [`${platform}.jsonc`, `mcps-${platform}.jsonc`]) {
      await copyFile(join(root, 'configs', name), join(stage, 'configs', name));
    }
    await applyMcps(stage, platform);
    const expected = await readFile(join(stage, 'opencode.jsonc'));
    const output = join(root, 'opencode.jsonc');
    const old = await exists(output);
    if (old && (!old.isFile() || !(await readFile(output)).equals(expected))) {
      throw new Error(`Configuração existente diferente: ${output}. Preserve e revise antes de aplicar o perfil.`);
    }
    const sameDir = configDir === root || (await exists(configDir) && await realpath(configDir) === root);
    if (await exists(join(configDir, 'opencode.json'))) {
      throw new Error(`Configuração adicional existente: ${join(configDir, 'opencode.json')}. Revise antes de instalar.`);
    }
    for (const name of entries) {
      const source = join(root, name);
      if (name !== 'opencode.jsonc' && !await exists(source)) throw new Error(`Arquivo ausente: ${source}`);
      if (sameDir) continue;
      const target = join(configDir, name);
      const current = await exists(target);
      if (current) {
        if (!current.isSymbolicLink() || resolve(dirname(target), await readlink(target)) !== source) {
          throw new Error(`Destino existente não será substituído: ${target}`);
        }
      }
    }
    if (!old) await copyFile(join(stage, 'opencode.jsonc'), output, 1);
    if (!sameDir) {
      await mkdir(configDir, { recursive: true });
      for (const name of entries) {
        const target = join(configDir, name);
        if (!await exists(target)) await symlink(join(root, name), target);
      }
    }
  } finally {
    await rm(stage, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const platform = process.argv[2] ?? ({ darwin: 'macos', linux: 'ubuntu' })[process.platform];
  try {
    await install(dirname(fileURLToPath(import.meta.url)), join(process.env.XDG_CONFIG_HOME || join(process.env.HOME, '.config'), 'opencode'), platform);
    console.log(`Configuração ${platform} instalada. Confira dependências e conexões no README.md.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
