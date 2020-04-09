import React from 'react';
// 组件 keep-alive
const KeepAlive = ({ key, Component, maxLength = 5, store = window, }) => {
    var _a;
    const cacheName = `__keep_alive_cache__`;
    const getCache = () => {
        if (!store[cacheName])
            store[cacheName] = [];
        const item = store[cacheName].find((i) => i.key === key);
        return (item === null || item === void 0 ? void 0 : item.cache) || null;
    };
    // 新增/更新缓存
    const updateCache = (newCache, scrollTop, state) => {
        let index = store[cacheName].findIndex((i) => i.key === key);
        if (index !== -1) {
            store[cacheName].splice(index, 1, {
                key,
                cache: newCache,
                scrollTop,
                state,
            });
        }
        else {
            store[cacheName].unshift({ key, cache: newCache, scrollTop, state });
        }
        // 最大缓存 maxLength，默认5条
        if (store[cacheName].length > maxLength)
            store[cacheName].pop();
    };
    // 组件在路由变化前调用
    const beforeRouteLeave = (scrollTop = 0, state) => {
        updateCache(React.cloneElement(React.createElement(Component, null), cacheProps), scrollTop, state);
    };
    const getItem = () => {
        if (!store[cacheName])
            store[cacheName] = [];
        const item = store[cacheName].find((i) => i.key === key);
        return item || null;
    };
    // 返回滚动位置
    const scrollRestore = () => {
        const item = getItem();
        return (item === null || item === void 0 ? void 0 : item.scrollTop) || null;
    };
    // 返回组件的state
    const stateRestore = () => {
        const item = getItem();
        return (item === null || item === void 0 ? void 0 : item.state) || null;
    };
    const deleteCache = () => {
        console.log('deleteCache');
        let index = store[cacheName].findIndex((i) => i.key === key);
        if (index !== -1)
            store[cacheName].splice(index, 1);
    };
    const cacheProps = {
        beforeRouteLeave,
        scrollRestore,
        stateRestore,
        deleteCache,
    };
    return (_a = getCache()) !== null && _a !== void 0 ? _a : React.createElement(Component, Object.assign({}, cacheProps));
};
export default KeepAlive;
