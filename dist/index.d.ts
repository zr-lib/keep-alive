import React from 'react';
export interface KeepAliveProps {
    name: string;
    store?: any;
    maxLength?: number;
    children: (cacheProps: KeepAliveAssist) => React.ReactElement;
}
export interface KeepAliveAssist {
    beforeRouteLeave?: (scrollTop: number, state: any) => void;
    scrollRestore?: () => number | null;
    stateRestore?: () => any;
    deleteCache?: () => void;
    getKeepAlive?: () => void;
}
declare const KeepAlive: React.FC<KeepAliveProps>;
export default KeepAlive;
