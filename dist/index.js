import { useEffect } from 'react';
import useKeepAliveCache from './useKeepAliveCache';
/**
 * 组件 keep-alive
 * @param {*} name
 * @param {*} children
 */
const KeepAlive = ({ name, children }) => {
    const isChildrenFunction = typeof children === 'function';
    // const { cacheName, store } = configKeepAlive();
    const { getItem, updateCache, deleteCache } = useKeepAliveCache();
    useEffect(() => {
        if (!isChildrenFunction) {
            console.warn('children传递函数，如:\n <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>');
        }
    }, []);
    const getKeepAlive = () => {
        return getItem(name);
    };
    // 组件在路由变化前调用
    const beforeRouteLeave = (scrollTop = 0, state) => {
        updateCache({
            name,
            state,
            scrollTop,
        });
    };
    // 返回滚动位置
    const scrollRestore = () => {
        const item = getItem(name);
        return (item === null || item === void 0 ? void 0 : item.scrollTop) || null;
    };
    // 返回组件的state
    const stateRestore = () => {
        const item = getItem(name);
        return (item === null || item === void 0 ? void 0 : item.state) || null;
    };
    const cacheProps = {
        beforeRouteLeave,
        scrollRestore,
        stateRestore,
        deleteCache: () => deleteCache(name),
        getKeepAlive,
    };
    return isChildrenFunction ? children(cacheProps) : null;
};
export default KeepAlive;
