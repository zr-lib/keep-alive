/// <reference types="react" />
import React from 'react';

// ================================
// ====== configKeepAlive.ts ======
// ================================
declare const configKeepAlive: React.FC<ConfigProps>;
export { configKeepAlive };

export interface ConfigProps {
  store?: any;
  maxLength: number;
  useStorage?: 'sessionStorage' | 'localStorage';
}

// ==========================
// ====== keepAlive.ts ======
// ==========================
declare const KeepAlive: React.FC<KeepAliveProps>;
export default KeepAlive;

export interface KeepAliveProps {
  name: string;
  children: (cacheProps: KeepAliveAssist) => React.ReactElement;
}

// 辅助函数
export interface KeepAliveAssist {
  beforeRouteLeave?: (scrollTop: number, state: any) => void;
  scrollRestore?: () => number | null;
  stateRestore?: () => any;
  deleteCache?: () => void;
  getKeepAlive?: () => CacheItem | null;
}

export interface CacheItem {
  name: string;
  state?: any;
  scrollTop?: number;
}

// ==================================
// ====== useKeepAliveCache.ts ======
// ==================================
export interface UpdateStorageCache {
  _store: any;
  _cacheName: string;
}

export interface UpdateCache {
  name: string;
  state: any;
  scrollTop: number;
}
