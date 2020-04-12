import React, { useEffect } from 'react';

export interface KeepAliveProps {
  name: string;
  store?: any;
  maxLength?: number;
  children: (cacheProps: KeepAliveAssist) => React.ReactElement;
}

// 辅助函数
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number | null;
  stateRestore?: () => any;
  deleteCache?: () => void;
  getKeepAlive?: () => void;
}

interface CacheItem {
  name: string;
  cache: any;
  scrollTop?: number;
  state?: any;
}

// 组件 keep-alive
const KeepAlive: React.FC<KeepAliveProps> = ({
  name,
  maxLength = 5,
  store = window,
  children,
}) => {
  const cacheName = `__keep_alive_cache__`;
  const isChildrenFunction = typeof children === 'function';

  useEffect(() => {
    if (!isChildrenFunction) {
      console.warn(
        'children传递函数，如:\n <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>'
      );
    }
  }, []);

  const getKeepAlive = () => {
    return getItem();
  };

  const getCache = () => {
    if (!store[cacheName]) store[cacheName] = [];
    const item = store[cacheName].find((i: CacheItem) => i.name === name);
    return item?.cache() || null;
  };

  // 新增/更新缓存
  const updateCache = (newCache: any, scrollTop: number, state: any) => {
    let index = store[cacheName].findIndex((i: CacheItem) => i.name === name);
    if (index !== -1) {
      store[cacheName].splice(index, 1, {
        name,
        cache: newCache,
        scrollTop,
        state,
      });
    } else {
      store[cacheName].unshift({ name, cache: newCache, scrollTop, state });
    }

    // 最大缓存 maxLength，默认5条
    if (store[cacheName].length > maxLength) store[cacheName].pop();
  };

  // 组件在路由变化前调用
  const beforeRouteLeave = (scrollTop: number = 0, state: any) => {
    updateCache(() => children(cacheProps), scrollTop, state);
  };

  const getItem = (): CacheItem => {
    if (!store[cacheName]) store[cacheName] = [];
    const item = store[cacheName].find((i: CacheItem) => i.name === name);
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
    let index = store[cacheName].findIndex((i: CacheItem) => i.name === name);
    if (index !== -1) {
      store[cacheName].splice(index, 1);
      console.log(`deleteCache-name: ${name}`);
    }
  };

  const cacheProps: KeepAliveAssist = {
    beforeRouteLeave,
    scrollRestore,
    stateRestore,
    deleteCache,
    getKeepAlive,
  };

  return getCache() ?? (isChildrenFunction && children(cacheProps));
};

export default KeepAlive;
