import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { withJsonAccountList } from './integrations/antigravity/rpc-json.mjs';

test('adaptador fixa a versão original e mantém dependência e lockfile consistentes', async () => {
  const manifest = JSON.parse(await readFile(new URL('./integrations/antigravity/package.json', import.meta.url), 'utf8'));
  const lock = JSON.parse(await readFile(new URL('./integrations/antigravity/package-lock.json', import.meta.url), 'utf8'));
  assert.equal(manifest.dependencies['opencode-antigravity-auth'], '2.1.2');
  assert.deepEqual(lock.packages[''].dependencies, manifest.dependencies);
  assert.equal(lock.packages['node_modules/opencode-antigravity-auth'].version, '2.1.2');
  assert.deepEqual(manifest.exports, { '.': './index.mjs', './tui': './tui.mjs' });
});

async function fixture(list) {
  const registrations = [];
  const registration = { dispose: async () => {} };
  const cleanup = () => {};
  const other = () => ({ message: 'unchanged' });
  const definition = { id: 'antigravity.accounts' };
  const handlers = { list, update: other };
  const rpc = Object.assign((...args) => args, {
    register(...args) {
      registrations.push(args);
      return registration;
    },
  });
  const storage = {};
  const plugin = withJsonAccountList({
    id: 'opencode-antigravity-auth',
    async setup(ctx) {
      assert.equal(ctx.storage, storage);
      assert.deepEqual(ctx.rpc('unchanged'), ['unchanged']);
      assert.equal(await ctx.rpc.register(definition, handlers, 'options'), registration);
      const unrelated = { id: 'other.rpc' };
      await ctx.rpc.register(unrelated, handlers);
      return cleanup;
    },
  });
  assert.equal(plugin.id, 'opencode-antigravity-auth');
  assert.equal(await plugin.setup({ rpc, storage }), cleanup);
  assert.equal(registrations[0][0], definition);
  assert.equal(registrations[0][1].update, other);
  assert.equal(registrations[0][2], 'options');
  assert.equal(registrations[1][1], handlers);
  return registrations[0][1].list;
}

test('remove quota undefined sem alterar contas originais nem argumentos do método', async () => {
  const accounts = [{ id: 'synthetic', quota: undefined }];
  const input = {};
  const context = { signal: new AbortController().signal };
  const list = await fixture(async (...args) => {
    assert.deepEqual(args, [input, context]);
    return accounts;
  });
  assert.deepEqual(await list(input, context), [{ id: 'synthetic' }]);
  assert.ok(Object.hasOwn(accounts[0], 'quota'));
});

test('remove opcionais undefined de cotas em cache e preserva valores válidos', async () => {
  const list = await fixture(async () => [{
    id: 'synthetic', enabled: false, lastUsed: 0,
    quota: { remainingFraction: 0, resetTime: undefined, updatedAt: undefined },
  }]);
  assert.deepEqual(await list(), [{
    id: 'synthetic', enabled: false, lastUsed: 0, quota: { remainingFraction: 0 },
  }]);
});

test('preserva lista vazia e cotas completas', async () => {
  assert.deepEqual(await (await fixture(async () => []))(), []);
  const accounts = [{ quota: { remainingFraction: 1, resetTime: '2026-11-05T00:00:00Z', updatedAt: 1 } }];
  assert.deepEqual(await (await fixture(async () => accounts))(), accounts);
});

test('propaga falhas originais sem mascarar erro nem repetir listagem', async () => {
  const error = new Error('synthetic failure');
  let calls = 0;
  const list = await fixture(async () => { calls++; throw error; });
  await assert.rejects(list(), (actual) => actual === error);
  assert.equal(calls, 1);
});
