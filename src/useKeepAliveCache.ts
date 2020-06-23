import { useEffect } from 'react';
import { CacheItem } from '.';
import configKeepAlive from './configKeepAlive';

type UpdateStorageCache = {
  _store: any;
  _cacheName: string;
};

export type UpdateCache = {
  name: string;
  state: any;
  scrollTop: number;
};

// 缓存
const useKeepAliveCache = () => {
  const { cacheName, maxLength, store, useStorage } = configKeepAlive();
  const useStorageError = 'useStorage只能为："sessionStorage","localStorage"';

  useEffect(() => {
    if (useStorage) restoreCache();
    else clearOldStoraCache();
  }, []);

  const clearOldStoraCache = () => {
    store.sessionStorage?.removeItem(cacheName);
    store.localStorage?.removeItem(cacheName);
  };

  // 从storage从恢复缓存，如果有传 useStorage 的话
  const restoreCache = () => {
    const storageCache = getStorageCache();
    if (storageCache) store[cacheName] = storageCache;
  };

  // 无效的 useStorage
  const inValidUseStorage = (): boolean => {
    return (
      Boolean(useStorage) !== false &&
      useStorage !== 'sessionStorage' &&
      useStorage !== 'localStorage'
    );
  };

  // 获取storage中缓存
  const getStorageCache = (
    { _store, _cacheName }: UpdateStorageCache = {
      _store: store,
      _cacheName: cacheName,
    }
  ) => {
    if (inValidUseStorage()) return console.warn(useStorageError);
    let parsedCache: any = '';
    const cache = _store[useStorage!]?.getItem(_cacheName);

    if (cache) {
      try {
        parsedCache = JSON.parse(cache);
      } catch (err) {
        clearOldStoraCache();
        console.error('从storage中恢复缓存出错，已删除storage缓存！', err);
      }
    }

    return parsedCache;
  };

  // 更新storage中缓存
  const updateStorageCache = (
    { _store, _cacheName }: UpdateStorageCache = {
      _store: store,
      _cacheName: cacheName,
    }
  ) => {
    if (inValidUseStorage()) return console.warn(useStorageError);
    _store[useStorage!]?.setItem(
      _cacheName,
      JSON.stringify({ ..._store[_cacheName], maxLength, useStorage })
    );
  };

  const getCacheList = (): CacheItem[] => {
    const storeCache = store[cacheName];
    return storeCache.cacheList;
  };

  const getItem = (name: string) => {
    let cacheList = getCacheList();
    const item = cacheList.find((i: CacheItem) => i.name === name);
    return item || null;
  };

  // 新增/更新缓存
  const updateCache = ({ name, scrollTop, state }: UpdateCache) => {
    let cacheList = getCacheList();
    let index = cacheList.findIndex((i: CacheItem) => i.name === name);
    if (index !== -1) {
      cacheList.splice(index, 1, {
        name,
        state,
        scrollTop,
      });
    } else {
      cacheList.unshift({
        name,
        state,
        scrollTop,
      });
    }

    // 最大缓存 maxLength，默认5条
    if (cacheList.length > maxLength) cacheList.pop();
    // 更新storage
    if (useStorage) updateStorageCache();
  };

  const deleteCache = (name: string) => {
    let cacheList = getCacheList();
    let index = cacheList.findIndex((i: CacheItem) => i.name === name);
    if (index !== -1) {
      cacheList.splice(index, 1);
      // 更新storage
      if (useStorage) updateStorageCache();
    }
  };

  return {
    getItem,
    updateCache,
    deleteCache,
    getStorageCache,
  };
};

export default useKeepAliveCache;
