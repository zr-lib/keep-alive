import { useEffect } from 'react';
import useKeepAliveCache from './useKeepAliveCache';

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

/**
 * 组件 keep-alive
 * @param {*} name
 * @param {*} children
 */
const KeepAlive: React.FC<KeepAliveProps> = ({ name, children }) => {
  const isChildrenFunction = typeof children === 'function';
  const { getItem, updateCache, deleteCache } = useKeepAliveCache();

  useEffect(() => {
    if (!isChildrenFunction) {
      console.warn(
        'children传递函数，如:\n <KeepAlive name="list">{(props) => <List {...props} />}</KeepAlive>'
      );
    }
  }, []);

  const getKeepAlive = () => {
    return getItem(name);
  };

  // 组件在路由变化前调用
  const beforeRouteLeave = (scrollTop: number = 0, state: any) => {
    updateCache({
      name,
      state,
      scrollTop,
    });
  };

  // 返回滚动位置
  const scrollRestore = () => {
    const item = getItem(name);
    return item?.scrollTop || null;
  };

  // 返回组件的state
  const stateRestore = () => {
    const item = getItem(name);
    return item?.state || null;
  };

  const cacheProps: KeepAliveAssist = {
    beforeRouteLeave,
    scrollRestore,
    stateRestore,
    deleteCache: () => deleteCache(name),
    getKeepAlive,
  };

  return isChildrenFunction ? children(cacheProps) : null;
};

export default KeepAlive;
