import { CacheItem } from '.';
declare type UpdateStorageCache = {
    _store: any;
    _cacheName: string;
};
export declare type UpdateCache = {
    name: string;
    state: any;
    scrollTop: number;
};
declare const useKeepAliveCache: () => {
    getItem: (name: string) => CacheItem | null;
    updateCache: ({ name, scrollTop, state }: UpdateCache) => void;
    deleteCache: (name: string) => void;
    getStorageCache: ({ _store, _cacheName }?: UpdateStorageCache) => any;
};
export default useKeepAliveCache;
