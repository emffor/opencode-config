// Antigravity 2.1.2 includes undefined optional quota fields in its RPC output.
// OpenCode 2.2.5 requires a JSON value before serializing that output.
export function withJsonAccountList(plugin) {
  return {
    ...plugin,
    setup(ctx) {
      const rpc = new Proxy(ctx.rpc, {
        get(target, key, receiver) {
          if (key !== 'register') return Reflect.get(target, key, receiver);
          return (definition, handlers, ...options) => {
            if (definition.id !== 'antigravity.accounts') {
              return target.register(definition, handlers, ...options);
            }
            return target.register(definition, {
              ...handlers,
              async list(...args) {
                const accounts = await handlers.list(...args);
                return JSON.parse(JSON.stringify(accounts));
              },
            }, ...options);
          };
        },
      });
      return plugin.setup(new Proxy(ctx, {
        get(target, key, receiver) {
          return key === 'rpc' ? rpc : Reflect.get(target, key, receiver);
        },
      }));
    },
  };
}
