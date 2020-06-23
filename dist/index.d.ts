/// <reference types="react" />
export interface KeepAliveProps {
    name: string;
    children: (cacheProps: KeepAliveAssist) => React.ReactElement;
}
export interface KeepAliveAssist {
    beforeRouteLeave?: (scrollTop: number, state: any) => void;
    scrollRestore?: () => number | null;
    stateRestore?: () => any;
    deleteCache?: () => void;
    getKeepAlive?: () => void;
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
declare const KeepAlive: React.FC<KeepAliveProps>;
export default KeepAlive;
