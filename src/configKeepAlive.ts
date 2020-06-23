export interface ConfigProps {
  store: any;
  maxLength: number;
  useStorage?: 'sessionStorage' | 'localStorage';
}

const CACHE_NAME = `__keep_alive_cache__`;
let DEFAULT_CONFIG: ConfigProps = {
  store: window,
  maxLength: 5,
  useStorage: undefined,
};

// 配置
const configKeepAlive = (props: Partial<ConfigProps> = {}) => {
  const init = () => {
    DEFAULT_CONFIG = { ...DEFAULT_CONFIG, ...props };
    const { store, maxLength, useStorage } = DEFAULT_CONFIG;
    store[CACHE_NAME] = {
      maxLength,
      useStorage,
      cacheList: store[CACHE_NAME]?.cacheList || [],
    };
  };

  init();

  return {
    cacheName: CACHE_NAME,
    ...DEFAULT_CONFIG,
  };
};

export default configKeepAlive;
