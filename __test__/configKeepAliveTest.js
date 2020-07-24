import configKeepAlive from '../src/configKeepAlive';

function configKeepAliveTest(config) {
  const { cacheName, store, maxLength, useStorage } = configKeepAlive(config);

  it('--- configKeepAlive 测试 ---', () => {
    expect(cacheName).toBe('__keep_alive_cache__');
    expect(store).toBe(global);
    expect(maxLength).toBe(config.maxLength);
    expect(useStorage).toBe(config.useStorage);
  });
}

export default configKeepAliveTest;
