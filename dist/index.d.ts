/// <reference types="react" />
export interface KeepAliveProps {
    key: string;
    Component: keyof JSX.IntrinsicElements | any;
    store?: any;
    maxLength?: number;
}
export interface KeepAliveAssist {
    beforeRouteLeave?: (scrollTop: number, state: any) => void;
    scrollRestore?: () => number;
    stateRestore?: () => any;
    deleteCache?: (key: string) => void;
}
declare const KeepAlive: ({ key, Component, maxLength, store, }: KeepAliveProps) => any;
export default KeepAlive;
