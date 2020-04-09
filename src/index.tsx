import React from 'react';

export interface KeepAliveProps {
  key: string;
  Component: keyof JSX.IntrinsicElements | any;
  store?: any;
  maxLength?: number;
}

// 辅助函数
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number;
  stateRestore?: () => any;
  deleteCache?: (key: string) => void;
}

interface CacheItem {
  key: string;
  cache: any;
  scrollTop?: number;
  state?: any;
}

// 组件 keep-alive
const KeepAlive = ({
  key,
  Component,
  maxLength = 5,
  store = window,
}: KeepAliveProps) => {
  const cacheName = `__keep_alive_cache__`;

  const getCache = () => {
    if (!store[cacheName]) store[cacheName] = [];
    const item = store[cacheName].find((i: CacheItem) => i.key === key);
    return item?.cache || null;
  };

  // 新增/更新缓存
  const updateCache = (newCache: any, scrollTop: number, state: any) => {
    let index = store[cacheName].findIndex((i: CacheItem) => i.key === key);
    if (index !== -1) {
      store[cacheName].splice(index, 1, {
        key,
        cache: newCache,
        scrollTop,
        state,
      });
    } else {
      store[cacheName].unshift({ key, cache: newCache, scrollTop, state });
    }

    // 最大缓存 maxLength，默认5条
    if (store[cacheName].length > maxLength) store[cacheName].pop();
  };

  // 组件在路由变化前调用
  const beforeRouteLeave = (scrollTop: number = 0, state: any) => {
    updateCache(
      React.cloneElement(<Component />, cacheProps),
      scrollTop,
      state
    );
  };

  const getItem = (): CacheItem => {
    if (!store[cacheName]) store[cacheName] = [];
    const item = store[cacheName].find((i: CacheItem) => i.key === key);
    return item || null;
  };

  // 返回滚动位置
  const scrollRestore = () => {
    const item = getItem();
    return item?.scrollTop || null;
  };

  // 返回组件的state
  const stateRestore = () => {
    const item = getItem();
    return item?.state || null;
  };

  const deleteCache = () => {
    console.log('deleteCache');
    let index = store[cacheName].findIndex((i: CacheItem) => i.key === key);
    if (index !== -1) store[cacheName].splice(index, 1);
  };

  const cacheProps = {
    beforeRouteLeave,
    scrollRestore,
    stateRestore,
    deleteCache,
  };

  return getCache() ?? <Component {...cacheProps} />;
};

export default KeepAlive;
