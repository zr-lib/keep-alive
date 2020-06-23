import { useEffect } from 'react';
import configKeepAlive from './configKeepAlive';
// 缓存
const useKeepAliveCache = () => {
    const { cacheName, maxLength, store, useStorage } = configKeepAlive();
    const useStorageError = 'useStorage只能为："sessionStorage","localStorage"';
    useEffect(() => {
        if (useStorage)
            restoreCache();
        else
            clearOldStoraCache();
    }, []);
    const clearOldStoraCache = () => {
        var _a, _b;
        (_a = store.sessionStorage) === null || _a === void 0 ? void 0 : _a.removeItem(cacheName);
        (_b = store.localStorage) === null || _b === void 0 ? void 0 : _b.removeItem(cacheName);
    };
    // 从storage从恢复缓存，如果有传 useStorage 的话
    const restoreCache = () => {
        const storageCache = getStorageCache();
        if (storageCache)
            store[cacheName] = storageCache;
    };
    // 无效的 useStorage
    const inValidUseStorage = () => {
        return (Boolean(useStorage) !== false &&
            useStorage !== 'sessionStorage' &&
            useStorage !== 'localStorage');
    };
    // 获取storage中缓存
    const getStorageCache = ({ _store, _cacheName } = {
        _store: store,
        _cacheName: cacheName,
    }) => {
        var _a;
        if (inValidUseStorage())
            return console.warn(useStorageError);
        let parsedCache = '';
        const cache = (_a = _store[useStorage]) === null || _a === void 0 ? void 0 : _a.getItem(_cacheName);
        if (cache) {
            try {
                parsedCache = JSON.parse(cache);
            }
            catch (err) {
                clearOldStoraCache();
                console.error('从storage中恢复缓存出错，已删除storage缓存！', err);
            }
        }
        return parsedCache;
    };
    // 更新storage中缓存
    const updateStorageCache = ({ _store, _cacheName } = {
        _store: store,
        _cacheName: cacheName,
    }) => {
        var _a;
        if (inValidUseStorage())
            return console.warn(useStorageError);
        (_a = _store[useStorage]) === null || _a === void 0 ? void 0 : _a.setItem(_cacheName, JSON.stringify(Object.assign(Object.assign({}, _store[_cacheName]), { maxLength, useStorage })));
    };
    const getCacheList = () => {
        const storeCache = store[cacheName];
        return storeCache.cacheList;
    };
    const getItem = (name) => {
        let cacheList = getCacheList();
        const item = cacheList.find((i) => i.name === name);
        return item || null;
    };
    // 新增/更新缓存
    const updateCache = ({ name, scrollTop, state }) => {
        let cacheList = getCacheList();
        let index = cacheList.findIndex((i) => i.name === name);
        if (index !== -1) {
            cacheList.splice(index, 1, {
                name,
                state,
                scrollTop,
            });
        }
        else {
            cacheList.unshift({
                name,
                state,
                scrollTop,
            });
        }
        // 最大缓存 maxLength，默认5条
        if (cacheList.length > maxLength)
            cacheList.pop();
        // 更新storage
        if (useStorage)
            updateStorageCache();
    };
    const deleteCache = (name) => {
        let cacheList = getCacheList();
        let index = cacheList.findIndex((i) => i.name === name);
        if (index !== -1) {
            cacheList.splice(index, 1);
            // 更新storage
            if (useStorage)
                updateStorageCache();
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
