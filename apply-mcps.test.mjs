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

async function fixture(t, switches) {
  const root = await mkdtemp(join(tmpdir(), 'opencode-mcps-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'configs'));
  await writeFile(join(root, 'configs/macos.jsonc'), '{"model":"example/model","mcp":{"servers":{"rea":{"command":["npx","rea"],"disabled":false}}}}');
  await writeFile(join(root, 'configs/mcps-macos.jsonc'), JSON.stringify(switches));
  return root;
}

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
