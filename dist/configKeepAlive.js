const CACHE_NAME = `__keep_alive_cache__`;
let DEFAULT_CONFIG = {
    store: window,
    maxLength: 5,
    useStorage: undefined,
};
// 配置
const configKeepAlive = (props = {}) => {
    const init = () => {
        var _a;
        DEFAULT_CONFIG = Object.assign(Object.assign({}, DEFAULT_CONFIG), props);
        const { store, maxLength, useStorage } = DEFAULT_CONFIG;
        store[CACHE_NAME] = {
            maxLength,
            useStorage,
            cacheList: ((_a = store[CACHE_NAME]) === null || _a === void 0 ? void 0 : _a.cacheList) || [],
        };
    };
    init();
    return Object.assign({ cacheName: CACHE_NAME }, DEFAULT_CONFIG);
};
export default configKeepAlive;
