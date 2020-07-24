import { renderHook } from '@testing-library/react-hooks';
import useKeepAliveCache from '../src/useKeepAliveCache';
import configKeepAlive from '../src/configKeepAlive';

function useKeepAliveCacheTest(name) {
  it('--- useStorage: undefined 测试 ---', () => {
    const useStorageValue = undefined;
    const configKeepAliveProps = renderHook(() =>
      configKeepAlive({ store: global, useStorage: useStorageValue })
    ).result.current;
    const useKeepAliveCacheProps = renderHook(() => useKeepAliveCache()).result
      .current;

    testHandler({
      name,
      ...configKeepAliveProps,
      ...useKeepAliveCacheProps,
      useStorageValue,
    });
  });

  it('-- useStorage: "sessionStorage" 测试 --', () => {
    const useStorageValue = 'sessionStorage';
    const configKeepAliveProps = renderHook(() =>
      configKeepAlive({ store: global, useStorage: useStorageValue })
    ).result.current;
    const useKeepAliveCacheProps = renderHook(() => useKeepAliveCache()).result
      .current;

    testHandler({
      name,
      ...configKeepAliveProps,
      ...useKeepAliveCacheProps,
      useStorageValue,
    });
  });
}

function testHandler({
  name,
  cacheName,
  store,
  useStorage,
  getItem,
  updateCache,
  deleteCache,
  getStorageCache,
  useStorageValue,
}) {
  expect(useStorage).toBe(useStorageValue);

  expect(getItem(name)).toBe(null);

  const cache1 = { name, scrollTop: 10, state: { a: 'aa' } };
  updateCache(cache1);
  expect(getItem(name)).toEqual(cache1);

  if (useStorageValue) {
    const cache1 = getStorageCache({ _store: store, _cacheName: cacheName });
    expect(Boolean(cache1)).not.toBeFalsy();

    // 非 JSON 格式数据
    store[useStorageValue].setItem(cacheName, 'dd');
    const cache2 = getStorageCache({ _store: store, _cacheName: cacheName });
    expect(cache2).toBe('');

    const storeCache = store[useStorageValue].getItem(cacheName);
    expect(storeCache).toBe(null);

    // useStorage 不按要求传递
  } else {
    const cache = getStorageCache();
    expect(Boolean(cache)).toBeFalsy();
  }

  const cache2 = {
    name,
    scrollTop: 100,
    state: { a1: 'aa1' },
  };
  updateCache(cache2);
  expect(getItem(name)).toEqual(cache2);

  deleteCache(name);

  expect(getItem(name)).toBe(null);
}

export default useKeepAliveCacheTest;
