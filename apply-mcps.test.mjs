import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, symlink, lstat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applyMcps, parseJsonc } from './apply-mcps.mjs';

test('JSONC preserva strings, URLs e vírgulas dentro de strings', () => {
  assert.deepEqual(parseJsonc('{/* comentário */"url":"https://example.com", "text":",}", // comentário\n}'), {
    url: 'https://example.com', text: ',}',
  });
});

test('Bitbucket Ubuntu e Mac usam o mesmo launcher VPN e configuração privada só no Ubuntu', async () => {
  const ubuntu = parseJsonc(await readFile(new URL('./configs/ubuntu.jsonc', import.meta.url), 'utf8'));
  const macos = parseJsonc(await readFile(new URL('./configs/macos.jsonc', import.meta.url), 'utf8'));
  const launcher = '/home/administrador/xxx/mcp-suite/packages/network-gateway/dist/launcher.js';
  const privateConfig = '/home/administrador/.config/mcp-suite/launchers/bitbucket.json';
  for (const entry of [ubuntu.mcp.servers['bitbucket-review'], macos.mcp.servers['bitbucket-review'], macos.mcp.servers['bitbucket-review-emfforserver']]) {
    assert.deepEqual(entry.command.slice(-2), [launcher, privateConfig]);
    assert.ok(!entry.command.some(value => value.includes('--env-file') || value.endsWith('/bitbucket-mcp/dist/index.js')));
  }
  assert.deepEqual(macos.mcp.servers['bitbucket-review'].command.slice(0, 3), ['ssh', '-T', 'emfforserver-local']);
});

test('REA Ubuntu executa instalação estável diretamente sem npx', async () => {
  const ubuntu = parseJsonc(await readFile(new URL('./configs/ubuntu.jsonc', import.meta.url), 'utf8'));
  assert.deepEqual(ubuntu.mcp.servers.rea.command, [
    '/home/administrador/.config/opencode/node-with-nvm.sh',
    'node',
    '/home/administrador/.local/share/opencode/mcp/rea/node_modules/rea-agents/scripts/rea.mjs',
    'mcp',
  ]);
});

async function fixture(t, switches) {
  const root = await mkdtemp(join(tmpdir(), 'opencode-mcps-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'configs'));
  await writeFile(join(root, 'configs/macos.jsonc'), '{"model":"example/model","mcp":{"servers":{"rea":{"command":["npx","rea"],"disabled":false}}}}');
  await writeFile(join(root, 'configs/mcps-macos.jsonc'), JSON.stringify(switches));
  return root;
}

test('Antigravity usa o mesmo adaptador nos dois perfis e é preservado na geração', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'opencode-antigravity-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'configs'));
  for (const platform of ['macos', 'ubuntu']) {
    for (const filename of [`${platform}.jsonc`, `mcps-${platform}.jsonc`]) {
      await writeFile(join(root, 'configs', filename), await readFile(new URL(`./configs/${filename}`, import.meta.url), 'utf8'));
    }
    const profile = parseJsonc(await readFile(join(root, 'configs', `${platform}.jsonc`), 'utf8'));
    assert.deepEqual(profile.plugins, ['./integrations/antigravity']);
    await applyMcps(root, platform);
    const active = parseJsonc(await readFile(join(root, 'opencode.jsonc'), 'utf8'));
    assert.deepEqual(active.plugins, profile.plugins);
    assert.equal(active.model, profile.model);
  }
});

test('aplica true e false, preserva perfil e substitui link sem alterá-lo', async (t) => {
  const root = await fixture(t, { rea: false });
  const profile = await readFile(join(root, 'configs/macos.jsonc'), 'utf8');
  await symlink('configs/macos.jsonc', join(root, 'opencode.jsonc'));
  await applyMcps(root, 'macos');
  assert.equal((await lstat(join(root, 'opencode.jsonc'))).isSymbolicLink(), false);
  let active = parseJsonc(await readFile(join(root, 'opencode.jsonc'), 'utf8'));
  assert.equal(active.mcp.servers.rea.disabled, true);
  assert.equal(active.model, 'example/model');
  assert.deepEqual(active.mcp.servers.rea.command, ['npx', 'rea']);
  assert.equal(await readFile(join(root, 'configs/macos.jsonc'), 'utf8'), profile);
  await writeFile(join(root, 'configs/mcps-macos.jsonc'), '{"rea":true}');
  await applyMcps(root, 'macos');
  active = parseJsonc(await readFile(join(root, 'opencode.jsonc'), 'utf8'));
  assert.equal(active.mcp.servers.rea.disabled, false);
});

test('aceita observações em comentários no arquivo de controles', async (t) => {
  const root = await fixture(t, { rea: false });
  await writeFile(join(root, 'configs/mcps-macos.jsonc'), '// Depois de salvar: node apply-mcps.mjs macos\n{"rea":false}');
  await applyMcps(root, 'macos');
  const active = parseJsonc(await readFile(join(root, 'opencode.jsonc'), 'utf8'));
  assert.equal(active.mcp.servers.rea.disabled, true);
});

test('rejeita controles incorretos sem alterar configuração ativa', async (t) => {
  const root = await fixture(t, {});
  const output = join(root, 'opencode.jsonc');
  await writeFile(output, 'configuração anterior');
  for (const switches of [{}, { rea: 'false' }, { rea: true, desconhecido: false }]) {
    await writeFile(join(root, 'configs/mcps-macos.jsonc'), JSON.stringify(switches));
    await assert.rejects(applyMcps(root, 'macos'));
    assert.equal(await readFile(output, 'utf8'), 'configuração anterior');
  }
  await assert.rejects(applyMcps(root, '../outro'));
});
