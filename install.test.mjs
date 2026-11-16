import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readlink, rm, symlink } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { install } from './install.mjs';

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'opencode-install-test-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const root = join(dir, 'repo');
  const target = join(dir, 'config', 'opencode');
  await mkdir(join(root, 'configs'), { recursive: true });
  for (const platform of ['ubuntu', 'macos']) {
    await writeFile(join(root, 'configs', `${platform}.jsonc`), JSON.stringify({ mcp: { servers: { example: { type: 'local', command: [platform] } } } }));
    await writeFile(join(root, 'configs', `mcps-${platform}.jsonc`), '{"example":true}');
  }
  for (const name of ['AGENTS.md', 'cli.json', 'node-with-nvm.sh', 'pentest-http-bridge.mjs']) await writeFile(join(root, name), '');
  for (const name of ['agents', 'commands', 'skills', 'plugins']) await mkdir(join(root, name));
  return { root, target };
}

for (const platform of ['ubuntu', 'macos']) {
  test(`instala ${platform} e repete sem alterar arquivos`, async t => {
    const { root, target } = await fixture(t);
    await install(root, target, platform);
    await install(root, target, platform);
    assert.equal(await readlink(join(target, 'opencode.jsonc')), join(root, 'opencode.jsonc'));
    assert.equal(await readlink(join(target, 'cli.json')), join(root, 'cli.json'));
    assert.match(await readFile(join(root, 'opencode.jsonc'), 'utf8'), new RegExp(platform));
  });
}

test('recusa conflito sem gerar configuração ou sobrescrever arquivo', async t => {
  const { root, target } = await fixture(t);
  await mkdir(target, { recursive: true });
  await writeFile(join(target, 'cli.json'), 'configuração pessoal');
  await assert.rejects(install(root, target, 'ubuntu'), /não será substituído/);
  assert.equal(await readFile(join(target, 'cli.json'), 'utf8'), 'configuração pessoal');
  await assert.rejects(readFile(join(root, 'opencode.jsonc')), { code: 'ENOENT' });
});

test('recusa configuração gerada diferente e preserva o conteúdo', async t => {
  const { root, target } = await fixture(t);
  await writeFile(join(root, 'opencode.jsonc'), 'configuração pessoal');
  await assert.rejects(install(root, target, 'ubuntu'), /existente diferente/);
  assert.equal(await readFile(join(root, 'opencode.jsonc'), 'utf8'), 'configuração pessoal');
});

test('aceita link existente para configuração ainda não gerada', async t => {
  const { root, target } = await fixture(t);
  await mkdir(target, { recursive: true });
  await symlink(join(root, 'opencode.jsonc'), join(target, 'opencode.jsonc'));
  await install(root, target, 'ubuntu');
  assert.match(await readFile(join(target, 'opencode.jsonc'), 'utf8'), /ubuntu/);
});

test('instala quando o repositório é a própria pasta de configuração', async t => {
  const { root } = await fixture(t);
  await install(root, root, 'macos');
  assert.match(await readFile(join(root, 'opencode.jsonc'), 'utf8'), /macos/);
});
