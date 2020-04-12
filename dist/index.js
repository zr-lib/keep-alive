import { useEffect } from 'react';
// 组件 keep-alive
const KeepAlive = ({ name, maxLength = 5, store = window, children, }) => {
    var _a;
    const cacheName = `__keep_alive_cache__`;
    const isChildrenFunction = typeof children === 'function';
    useEffect(() => {
        if (!isChildrenFunction) {
            console.warn('children传递函数，如:\n <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>');
        }
    }, []);
    const getKeepAlive = () => {
        return getItem();
    };
    const getCache = () => {
        if (!store[cacheName])
            store[cacheName] = [];
        const item = store[cacheName].find((i) => i.name === name);
        return (item === null || item === void 0 ? void 0 : item.cache()) || null;
    };
    // 新增/更新缓存
    const updateCache = (newCache, scrollTop, state) => {
        let index = store[cacheName].findIndex((i) => i.name === name);
        if (index !== -1) {
            store[cacheName].splice(index, 1, {
                name,
                cache: newCache,
                scrollTop,
                state,
            });
        }
        else {
            store[cacheName].unshift({ name, cache: newCache, scrollTop, state });
        }
        // 最大缓存 maxLength，默认5条
        if (store[cacheName].length > maxLength)
            store[cacheName].pop();
    };
    // 组件在路由变化前调用
    const beforeRouteLeave = (scrollTop = 0, state) => {
        updateCache(() => children(cacheProps), scrollTop, state);
    };
    const getItem = () => {
        if (!store[cacheName])
            store[cacheName] = [];
        const item = store[cacheName].find((i) => i.name === name);
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
        let index = store[cacheName].findIndex((i) => i.name === name);
        if (index !== -1) {
            store[cacheName].splice(index, 1);
            console.log(`deleteCache-name: ${name}`);
        }
    };
    const cacheProps = {
        beforeRouteLeave,
        scrollRestore,
        stateRestore,
        deleteCache,
        getKeepAlive,
    };
    return (_a = getCache()) !== null && _a !== void 0 ? _a : (isChildrenFunction && children(cacheProps));
};
export default KeepAlive;
